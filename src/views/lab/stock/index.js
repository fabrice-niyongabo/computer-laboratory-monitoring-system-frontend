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
import CIcon from "@coreui/icons-react";
import { cilPen, cilSend, cilTrash } from "@coreui/icons";
import EditPc from "./edit-pc";
import { setShowFullPageLoader } from "src/actions/app";
import TransferPc from "./transfer-pc";
const Stock = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [pcList, setPcList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedPc, setSelectedPc] = useState(null);
  const [pcsToSend, setPcsToSend] = useState([]);

  useEffect(() => {
    fetchPcs();
  }, []);

  const fetchPcs = () => {
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/pc/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setPcList(res.data.data);
        }, 1000);
      })
      .catch((error) => {
        errorHandler(error);
        setIsLoading(false);
      });
  };

  const handleDelete = (item) => {
    dispatch(setShowFullPageLoader(true));
    Axios.delete(BACKEND_URL + "/pc/" + item._id + "?token=" + token)
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
                <div>
                  {pcsToSend.length > 0 && (
                    <button
                      className="btn btn-light"
                      onClick={() => setShowTransferModal(true)}
                    >
                      Transfer ({pcsToSend.length})
                    </button>
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
                          <td>
                            {item.isTransfered
                              ? "Transfered"
                              : "Not Transfered"}
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
                              onClick={() => handleDelete(item)}
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
      />
      <TransferPc
        showModal={showTransferModal}
        setShowModal={setShowTransferModal}
        pcsToSend={pcsToSend}
        fetchPcs={fetchPcs}
        token={token}
        setPcsToSend={setPcsToSend}
      />
    </>
  );
};

export default Stock;
