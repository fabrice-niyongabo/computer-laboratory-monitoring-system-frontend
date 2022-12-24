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
import PlaceHolder from "src/components/placeholder";

function TransferPc({
  showModal,
  setShowModal,
  pcsToSend,
  fetchPcs,
  token,
  role,
  setPcsToSend,
  mainPath,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [sentPcs, setSentPcs] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [institution, setInstitution] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      for (let i = 0; i < pcsToSend.length; i++) {
        const res = await Axios.post(
          BACKEND_URL + "/" + mainPath + "/sendDevice/",
          {
            pcId: pcsToSend[i].pcId,
            district: institution,
            token,
          }
        );
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
    setDistricts([]);
    if (showModal) {
      setSentPcs([]);
      fetchusers();
    }
  }, [showModal]);

  const fetchusers = async () => {
    try {
      setLoadingUsers(true);
      const res = await Axios.get(BACKEND_URL + "/auth/users/?token=" + token);
      for (let i = 0; i < res.data.users.length; i++) {
        const dest = res.data.users[i].destination.split("-");
        if (dest.length === 2) {
          if (dest[0].toUpperCase() === role.toUpperCase()) {
            setDistricts([...districts, dest[1]]);
          }
        }
      }
      setTimeout(() => {
        setLoadingUsers(false);
      }, 1000);
    } catch (error) {
      setLoadingUsers(false);
      errorHandler(error);
    }
  };

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
            {loadingUsers ? (
              <PlaceHolder />
            ) : (
              <>
                <small>
                  You are going to transfer {pcsToSend.length} computer(s),
                  please choose destination
                </small>
                <div className="mb-3">
                  <label>District</label>
                  <select
                    className="form-select"
                    onChange={(e) => setInstitution(e.target.value)}
                    required
                  >
                    <option value="">Choose</option>
                    {districts.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
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
