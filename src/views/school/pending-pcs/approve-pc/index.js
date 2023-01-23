import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { BACKEND_URL } from "src/constants";
import { errorHandler, toastMessage } from "src/helpers";
import { useNavigate } from "react-router-dom";

function ApprovePc({
  showModal,
  setShowModal,
  pcsToSend,
  token,
  fName,
  mainPath,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [sentPcs, setSentPcs] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      for (let i = 0; i < pcsToSend.length; i++) {
        const res = await Axios.put(
          BACKEND_URL + "/" + mainPath + "/recieveDevice/" + pcsToSend[i]._id,
          {
            token,
          }
        );
        setSentPcs([...sentPcs, res.data]);
      }
      setTimeout(() => {
        toastMessage("success", "Device(s) received!");
        navigate("/stock");
      }, 1000);
    } catch (error) {
      setSubmitting(false);
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (showModal) {
      setSentPcs([]);
    }
  }, [showModal]);

  return (
    <>
      <CModal
        backdrop="static"
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleSubmit}>
          <CModalHeader closeButton={!submitting}>
            <CModalTitle>Confimation</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              Dear <b>{fName}</b>, you are going to approve that you have
              received {pcsToSend.length} device(s) in your organization. Click
              on the button bellow to approve.
            </p>
          </CModalBody>
          <CModalFooter>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting && <CSpinner size="sm" />} Approve{" "}
              {submitting && `${sentPcs.length}/${pcsToSend.length}`}
            </button>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
}

export default ApprovePc;
