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

const initialState = {
  archievedDate: "",
  description: "",
};
function EditPc({
  showModal,
  setShowModal,
  selectedPc,
  token,
  mainPath,
  fetchPcs,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await Axios.put(
        BACKEND_URL + "/" + mainPath + "/archievedPc/" + selectedPc._id,
        {
          ...state,
          token,
        }
      );

      setTimeout(() => {
        toastMessage("success", "Device updated!");
        setSubmitting(false);
        setShowModal(false);
        fetchPcs();
      }, 1000);
    } catch (error) {
      setSubmitting(false);
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (showModal) {
      setState({
        ...selectedPc,
        archievedDate: new Date(selectedPc.archievedDate).toLocaleDateString(),
      });
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
            <CModalTitle>Update device</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <label>Description</label>
              <textarea
                className="form-control"
                value={state.description}
                onChange={(e) =>
                  setState({ ...state, description: e.target.value })
                }
                required
                placeholder="Enter full description here"
              />
            </div>
            <div className="mb-3">
              <label>Archieved date</label>
              <input
                type="date"
                className="form-control"
                value={state.archievedDate}
                onChange={(e) =>
                  setState({ ...state, archievedDate: e.target.value })
                }
                required
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting && <CSpinner size="sm" />} Submit
            </button>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
}

export default EditPc;
