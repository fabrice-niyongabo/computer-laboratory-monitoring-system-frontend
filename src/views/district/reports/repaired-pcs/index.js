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
import { Link } from "react-router-dom";
const RepairedPcs = () => {
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
          item.sector.toLowerCase().includes(keyWord.toLowerCase()) ||
          item.school.toLowerCase().includes(keyWord.toLowerCase()) ||
          item?.pcDetails?.model
            ?.toLowerCase()
            .includes(keyWord.toLowerCase()) ||
          item?.technician?.techNames
            ?.toLowerCase()
            .includes(keyWord.toLowerCase()) ||
          item?.technician?.techEmail
            ?.toLowerCase()
            .includes(keyWord.toLowerCase()) ||
          item?.technician?.techPhone
            ?.toLowerCase()
            .includes(keyWord.toLowerCase())
      );
    }
    if (dateFilter !== "") {
      res = res.filter(
        (item) =>
          new Date(item.repairedDate).toLocaleDateString() ===
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
    Axios.get(BACKEND_URL + "/" + mainPath + "/report/repaired/?token=" + token)
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
                  <strong>Repaired Device List</strong>
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
                    to={`/printer/repaired/?repairedDate=${dateFilter}&pcDetails__serialNumber=${keyWord}&description=${keyWord}&pcDetails__model=${keyWord}&technician__techNames=${keyWord}&school=${keyWord}&sector=${keyWord}`}
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
                        <th>Sector</th>
                        <th>School</th>
                        <th>Repaired Date</th>
                        <th>Technician</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pcList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.pcDetails?.serialNumber}</td>
                          <td>{item.sector.toUpperCase()}</td>
                          <td>{item.school.toUpperCase()}</td>
                          <td>
                            {new Date(item.repairedDate).toLocaleDateString()}
                          </td>
                          <td>
                            <p className="m-0 p-0">
                              Names: {item?.technician?.techNames}
                            </p>
                            <p className="m-0 p-0">
                              Email: {item?.technician?.techEmail}
                            </p>
                            <p className="m-0 p-0">
                              Phone: {item?.technician?.techPhone}
                            </p>
                            <p className="m-0 p-0">
                              Company: {item?.technician?.companyName}
                            </p>
                          </td>
                          <td>{item.description}</td>
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
    </>
  );
};

export default RepairedPcs;
