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
  user,
  setPcsToSend,
  mainPath,
}) {
  const { token } = user;
  const [submitting, setSubmitting] = useState(false);
  const [sentPcs, setSentPcs] = useState(0);
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
            sector: institution,
            token,
          }
        );
        setSentPcs(i + 1);
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
      setSentPcs(0);
      fetchusers();
    }
  }, [showModal]);

  const fetchusers = async () => {
    try {
      setLoadingUsers(true);
      const dstcts = [];
      const currentUserFinalDestination = user.destination.split("-")[1];
      const res = await Axios.get(BACKEND_URL + "/auth/users/?token=" + token);
      for (let i = 0; i < res.data.users.length; i++) {
        const dest = res.data.users[i].destination.split("-");
        if (dest.length === 3) {
          if (
            dest[1].toUpperCase() === currentUserFinalDestination.toUpperCase()
          ) {
            dstcts.push(dest[2]);
          }
        }
      }
      setDistricts(dstcts);
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
                  <label>{user.destination.toUpperCase()}-Sectors</label>
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
              {submitting && `${sentPcs}/${pcsToSend.length}`}
            </button>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
}

export default TransferPc;
