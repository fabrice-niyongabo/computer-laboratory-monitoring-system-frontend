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
import { useSelector } from "react-redux";
import PlaceHolder from "src/components/placeholder";
import Axios from "axios";
import EditPc from "./edit-pc";
const Stock = () => {
  const user = useSelector((state) => state.user);
  const { token, role } = user;
  const mainPath = role.toLowerCase();

  const [isLoading, setIsLoading] = useState(false);
  const [pcList, setPcList] = useState([]);
  const [allPcList, setAllPcList] = useState([]);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [pcsToSend, setPcsToSend] = useState([]);

  const [selectedPc, setSelectedPc] = useState({});

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
      res = res.filter((item) => item.status === statusFilter);
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
                    <option value="repaired">Repaired</option>
                    <option value="working">Working</option>
                    <option value="stolen">Stolen</option>
                    <option value="archieved">Archieved</option>
                    <option value="damaged">Damaged</option>
                  </select>
                  <div>&nbsp; &nbsp;</div>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
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
                        <th>#</th>
                        <th>Serial Number</th>
                        <th>Model</th>
                        <th>Type</th>
                        <th>Lifespan</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pcList
                        .filter((item) => item.isReceived)
                        .map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.pcDetails.serialNumber}</td>
                            <td>{item.pcDetails.model}</td>
                            <td>{item.pcDetails.type}</td>
                            <td>{item.pcDetails.lifeSpan}</td>
                            <td>{item.status}</td>
                            <td>
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  setShowTransferModal(true);
                                  setSelectedPc(item);
                                }}
                              >
                                Edit
                              </button>
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
      <EditPc
        showModal={showTransferModal}
        setShowModal={setShowTransferModal}
        selectedPc={selectedPc}
        token={token}
        mainPath={mainPath}
        fetchPcs={fetchPcs}
      />
    </>
  );
};

export default Stock;
