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
import { Sectors } from "rwanda";

function TransferPc({
  showModal,
  setShowModal,
  pcsToSend,
  fetchPcs,
  user,
  setPcsToSend,
  mainPath,
}) {
  const { token, destination } = user;
  const [submitting, setSubmitting] = useState(false);
  const [sentPcs, setSentPcs] = useState(0);
  const [institution, setInstitution] = useState("");
  const dest = destination.split("-");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      for (let i = 0; i < pcsToSend.length; i++) {
        const res = await Axios.post(
          BACKEND_URL + "/" + mainPath + "/sendDevice/",
          {
            pcId: pcsToSend[i].pcId,
            sector: institution,
            token,
          }
        );
        setSentPcs(i + 1);
      }
      setTimeout(() => {
        toastMessage("success", "Device(s) Transfered!");
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
      setSentPcs(0);
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
            <CModalTitle>Confirm Device(s) Transfer</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <small>
              You are going to transfer {pcsToSend.length} device(s), please
              choose destination
            </small>
            <div className="mb-3">
              <label>{user.destination.toUpperCase()}-Sectors</label>
              <select
                className="form-select"
                onChange={(e) => setInstitution(e.target.value)}
                required
              >
                <option value="">Choose</option>
                {Sectors(dest[0], dest[1]).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
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
              {submitting && `${sentPcs}/${pcsToSend.length}`}
            </button>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
}

export default TransferPc;
