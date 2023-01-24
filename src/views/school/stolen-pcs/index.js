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
import { Link } from "react-router-dom";
const StolenPcs = () => {
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
          item?.pcDetails?.serialNumber
            ?.toLowerCase()
            .includes(keyWord.toLowerCase()) ||
          item.description.toLowerCase().includes(keyWord.toLowerCase()) ||
          item?.pcDetails?.model?.toLowerCase().includes(keyWord.toLowerCase())
      );
    }
    if (dateFilter !== "") {
      res = res.filter(
        (item) =>
          new Date(item.stolenDate).toLocaleDateString() ===
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
    Axios.get(BACKEND_URL + "/" + mainPath + "/stolenPc/?token=" + token)
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
                  <strong>Stolen Device List</strong>
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
                  <input
                    type="date"
                    className="form-control"
                    placeholder="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                  <div>&nbsp; &nbsp;</div>
                  <Link
                    to={`/printer/stolenPc/?stolenDate=${dateFilter}&pcDetails__serialNumber=${keyWord}&description=${keyWord}&pcDetails__model=${keyWord}`}
                    target="_blank"
                  >
                    <button className="btn btn-primary">Print</button>
                  </Link>
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
                        <th>Stolen Date</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pcList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.pcDetails?.serialNumber}</td>
                          <td>
                            {new Date(item.stolenDate).toLocaleDateString()}
                          </td>
                          <td>{item.description}</td>
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

export default StolenPcs;
