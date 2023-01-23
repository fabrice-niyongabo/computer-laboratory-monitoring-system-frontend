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
import { useDispatch, useSelector } from "react-redux";
import PlaceHolder from "src/components/placeholder";
import Axios from "axios";
import CIcon from "@coreui/icons-react";
import { cilPen, cilTrash } from "@coreui/icons";
import EditPc from "./edit-pc";
import { setShowFullPageLoader } from "src/actions/app";
import TransferPc from "./transfer-pc";
import { Districts } from "rwanda";
const Stock = () => {
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [pcList, setPcList] = useState([]);
  const [allPcList, setAllPcList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedPc, setSelectedPc] = useState(null);
  const [pcsToSend, setPcsToSend] = useState([]);

  const [keyWord, setKeyword] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");

  useEffect(() => {
    let res = allPcList;
    if (keyWord.trim() !== "") {
      res = allPcList.filter(
        (item) =>
          item.serialNumber.toLowerCase().includes(keyWord.toLowerCase()) ||
          item.model.toLowerCase().includes(keyWord.toLowerCase())
      );
    }
    if (typeFilter !== "") {
      res = res.filter((item) => item.type === typeFilter);
    }
    if (statusFilter !== "") {
      res = res.filter((item) => item.isTransfered.toString() === statusFilter);
    }
    if (districtFilter !== "") {
      res = res.filter(
        (item) =>
          item?.transferedTo?.district?.toLowerCase() ===
          districtFilter.toLowerCase()
      );
    }
    if (dateFilter !== "") {
      res = res.filter(
        (item) =>
          new Date(item.createdAt).toLocaleDateString() ===
          new Date(dateFilter).toLocaleDateString()
      );
    }
    setPcList(res);
  }, [
    keyWord,
    typeFilter,
    statusFilter,
    dateFilter,
    allPcList,
    districtFilter,
  ]);

  useEffect(() => {
    fetchPcs();
  }, []);

  const fetchPcs = () => {
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/" + role + "/?token=" + token)
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

  const handleDelete = (item) => {
    dispatch(setShowFullPageLoader(true));
    Axios.delete(BACKEND_URL + "/" + role + "/" + item._id + "?token=" + token)
      .then((res) => {
        setTimeout(() => {
          toastMessage("success", "Device deleted successfull");
          dispatch(setShowFullPageLoader(false));
          setPcList(pcList.filter((i) => i._id != item._id));
        }, 1000);
      })
      .catch((error) => {
        errorHandler(error);
        dispatch(setShowFullPageLoader(false));
      });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setPcsToSend(pcList.filter((item) => item.isTransfered == false));
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
                  <select
                    className="form-select"
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                  >
                    <option value="">Choose</option>
                    {Districts().map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
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
                        Transfer ({pcsToSend.length})
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
                        <th>Description</th>
                        <th>Status</th>
                        <th>Registered Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pcList.map((item, index) => (
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
                          <td>{item.serialNumber}</td>
                          <td>{item.model}</td>
                          <td>{item.type}</td>
                          <td>{item.lifeSpan}</td>
                          <td>{item.description}</td>
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
                                      <p>
                                        <b>District:</b>{" "}
                                        {item?.transferedTo?.district}
                                      </p>
                                      <span>RECEIVED BY</span>
                                      <p className="m-0 p-0">
                                        <b>Names:</b>{" "}
                                        {item?.transferedTo?.receivedBy?.names}
                                      </p>
                                      <p>
                                        <b>Email:</b>{" "}
                                        {item?.transferedTo?.receivedBy?.email}
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
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setSelectedPc(item);
                                setShowModal(true);
                              }}
                            >
                              <CIcon icon={cilPen} />
                            </button>{" "}
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                confirm("Do you want to delete this device?") &&
                                handleDelete(item)
                              }
                            >
                              <CIcon icon={cilTrash} />
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
        showModal={showModal}
        setShowModal={setShowModal}
        selectedPc={selectedPc}
        token={token}
        fetchPcs={fetchPcs}
        role={role}
      />
      <TransferPc
        showModal={showTransferModal}
        setShowModal={setShowTransferModal}
        pcsToSend={pcsToSend}
        fetchPcs={fetchPcs}
        token={token}
        setPcsToSend={setPcsToSend}
        role={role}
      />
    </>
  );
};

export default Stock;
