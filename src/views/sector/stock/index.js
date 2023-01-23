import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CTooltip,
} from "@coreui/react";
import { errorHandler, toastMessage } from "src/helpers";
import { BACKEND_URL } from "src/constants";
import { useSelector } from "react-redux";
import PlaceHolder from "src/components/placeholder";
import Axios from "axios";
import TransferPc from "./transfer-pc";
const Stock = () => {
  const user = useSelector((state) => state.user);
  const { token, role } = user;
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
      setPcsToSend(
        pcList.filter((item) => item.isTransfered == false && item.isReceived)
      );
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
                  <strong>Stock Details</strong>
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
                        Transfer({pcsToSend.length})
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
                        <th>Received Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pcList
                        .filter((item) => item.isReceived)
                        .map((item, index) => (
                          <tr key={index}>
                            <th>
                              <input
                                type="checkbox"
                                className="form-check"
                                disabled={item.isTransfered}
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
                              {item.isTransfered ? (
                                <>
                                  <CTooltip
                                    content={
                                      <>
                                        <p>TRANSFERED TO</p>
                                        <p className="m-0 p-0">
                                          <b>Institution:</b>{" "}
                                          {item?.transferedTo?.institution}
                                        </p>
                                        <p className="m-0 p-0">
                                          <b>Province:</b>{" "}
                                          {item?.transferedTo?.province}
                                        </p>
                                        <p className="m-0 p-0">
                                          <b>District:</b>{" "}
                                          {item?.transferedTo?.district}
                                        </p>
                                        <p className="m-0 p-0">
                                          <b>Sector:</b>{" "}
                                          {item?.transferedTo?.sector}
                                        </p>
                                        <p>
                                          <b>School:</b>{" "}
                                          {item?.transferedTo?.school}
                                        </p>
                                        <span>RECEIVED BY</span>
                                        <p className="m-0 p-0">
                                          <b>Names:</b>{" "}
                                          {
                                            item?.transferedTo?.receivedBy
                                              ?.names
                                          }
                                        </p>
                                        <p>
                                          <b>Email:</b>{" "}
                                          {
                                            item?.transferedTo?.receivedBy
                                              ?.email
                                          }
                                        </p>
                                      </>
                                    }
                                  >
                                    <span
                                      style={{
                                        cursor: "pointer",
                                      }}
                                    >
                                      Transfered
                                    </span>
                                  </CTooltip>
                                </>
                              ) : (
                                "Not Transfered"
                              )}
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
      <TransferPc
        showModal={showTransferModal}
        setShowModal={setShowTransferModal}
        pcsToSend={pcsToSend}
        fetchPcs={fetchPcs}
        user={user}
        setPcsToSend={setPcsToSend}
        mainPath={mainPath}
      />
    </>
  );
};

export default Stock;
