import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import { errorHandler, toastMessage } from "src/helpers";
import { BACKEND_URL } from "src/constants";
import { useDispatch, useSelector } from "react-redux";
import PlaceHolder from "src/components/placeholder";
import Axios from "axios";
import ApprovePc from "./approve-pc";
const PendingPcs = () => {
  const dispatch = useDispatch();
  const { token, role, fName } = useSelector((state) => state.user);

  const mainPath = role.toLowerCase();

  const [isLoading, setIsLoading] = useState(false);
  const [pcList, setPcList] = useState([]);
  const [allPcList, setAllPcList] = useState([]);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [pcsToSend, setPcsToSend] = useState([]);

  const [keyWord, setKeyword] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    let res = allPcList;
    if (keyWord.trim() !== "") {
      res = allPcList.filter(
        (item) =>
          item.pcDetails.serialNumber
            .toLowerCase()
            .includes(keyWord.toLowerCase()) ||
          item.pcDetails.model.toLowerCase().includes(keyWord.toLowerCase())
      );
    }
    if (typeFilter !== "") {
      res = res.filter((item) => item.pcDetails.type === typeFilter);
    }
    if (statusFilter !== "") {
      res = res.filter((item) => item.isTransfered.toString() === statusFilter);
    }
    if (dateFilter !== "") {
      res = res.filter(
        (item) =>
          new Date(item.createdAt).toLocaleDateString() ===
          new Date(dateFilter).toLocaleDateString()
      );
    }
    setPcList(res);
  }, [keyWord, typeFilter, statusFilter, dateFilter, allPcList]);

  useEffect(() => {
    fetchPcs();
  }, []);

  const fetchPcs = () => {
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/" + mainPath + "/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setPcList(res.data.data);
          setAllPcList(res.data.data);
        }, 1000);
      })
      .catch((error) => {
        errorHandler(error);
        setIsLoading(false);
      });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setPcsToSend(pcList.filter((item) => item.isReceived == false));
    } else {
      setPcsToSend([]);
    }
  };

  const handleSelect = (e, item) => {
    if (e.target.checked) {
      setPcsToSend([...pcsToSend, item]);
    } else {
      setPcsToSend(pcsToSend.filter((i) => i._id !== item._id));
    }
  };

  return (
    <>
      <CRow>
        <CCol md={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <div>
                  <strong>Devices which are yet to be delivered</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={keyWord}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <div>&nbsp; &nbsp;</div>
                  <select
                    className="form-select"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="">Choose</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Printer">Printer</option>
                    <option value="Projector">Projector</option>
                    <option value="Scanner">Scanner</option>
                    <option value="Router">Router</option>
                    <option value="Switch">Switch</option>
                    <option value="WIFI Access Point">WIFI Access Point</option>
                    <option value="Phone">Phone</option>
                  </select>
                  <div>&nbsp; &nbsp;</div>
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">Choose</option>
                    <option value="true">Transfered</option>
                    <option value="false">Not Transfered</option>
                  </select>
                  <div>&nbsp; &nbsp;</div>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                  {pcsToSend.length > 0 && (
                    <>
                      <div>&nbsp; &nbsp;</div>
                      <button
                        className="btn btn-light"
                        onClick={() => setShowTransferModal(true)}
                      >
                        Approve ({pcsToSend.length})
                      </button>
                    </>
                  )}
                </div>
              </div>
            </CCardHeader>
            <CCardBody>
              {isLoading ? (
                <PlaceHolder />
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            onChange={(e) => handleSelectAll(e)}
                            className="form-check"
                          />
                        </th>
                        <th>#</th>
                        <th>Serial Number</th>
                        <th>Model</th>
                        <th>Type</th>
                        <th>Lifespan</th>
                        <th>Status</th>
                        <th>Delivered Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pcList
                        .filter((item) => !item.isReceived)
                        .map((item, index) => (
                          <tr key={index}>
                            <th>
                              <input
                                type="checkbox"
                                className="form-check"
                                disabled={item.isReceived}
                                onChange={(e) => handleSelect(e, item)}
                                checked={
                                  pcsToSend.find((i) => i._id == item._id)
                                    ? true
                                    : false
                                }
                              />
                            </th>
                            <td>{index + 1}</td>
                            <td>{item.pcDetails.serialNumber}</td>
                            <td>{item.pcDetails.model}</td>
                            <td>{item.pcDetails.type}</td>
                            <td>{item.pcDetails.lifeSpan}</td>
                            <td>
                              {item.isTransfered
                                ? "Received"
                                : "Not yet Received"}
                            </td>
                            <td>
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ApprovePc
        showModal={showTransferModal}
        setShowModal={setShowTransferModal}
        pcsToSend={pcsToSend}
        token={token}
        setPcsToSend={setPcsToSend}
        fName={fName}
        mainPath={mainPath}
      />
    </>
  );
};

export default PendingPcs;
