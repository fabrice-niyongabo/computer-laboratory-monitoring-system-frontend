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

function TransferPc({
  showModal,
  setShowModal,
  pcsToSend,
  fetchPcs,
  token,
  setPcsToSend,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [sentPcs, setSentPcs] = useState([]);
  const [institution, setInstitution] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      for (let i = 0; i < pcsToSend.length; i++) {
        const res = await Axios.post(BACKEND_URL + "/pc/sendDevice/", {
          pcId: pcsToSend[i],
          instutition: institution,
          token,
        });
        setSentPcs([...sentPcs, res.data]);
      }
      setTimeout(() => {
        toastMessage("success", "Computer(s) Transfered!");
        setSubmitting(false);
        setShowModal(false);
        fetchPcs();
        setPcsToSend([]);
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
            <CModalTitle>Confirm Computer(s) Transfer</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <label>Destination</label>
              <select
                className="form-select"
                onChange={(e) => setInstitution(e.target.value)}
                required
              >
                <option value="">Choose</option>
                <option value="reb">REB</option>
                <option value="rtb">RTB</option>
              </select>
            </div>
          </CModalBody>
          <CModalFooter>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting && <CSpinner size="sm" />} Transfer{" "}
              {submitting && `${sentPcs.length}/${pcsToSend.length}`}
            </button>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
}

export default TransferPc;
