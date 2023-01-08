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
  techNames: "",
  techEmail: "",
  techPhone: "",
  companyName: "",
  address: "",
  description: "",
  status: "",
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
        BACKEND_URL + "/" + mainPath + "/" + selectedPc._id,
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
      setState(initialState);
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
            <CModalTitle>Update device status</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <label>Status</label>
              <select
                className="form-select"
                value={state.status}
                onChange={(e) => setState({ ...state, status: e.target.value })}
                required
              >
                <option value="">Choose</option>
                <option value="repaired">Repaired</option>
                <option value="working">Working</option>
                <option value="stolen">Stolen</option>
                <option value="archieved">Archieved</option>
                <option value="damaged">Damaged</option>
              </select>
            </div>
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
            {state.status === "repaired" && (
              <div className="border p-3">
                <small>
                  <b>Technician Information</b>
                </small>
                <div className="mb-3">
                  <label>Technician Names</label>
                  <input
                    type="text"
                    className="form-control"
                    value={state.techNames}
                    onChange={(e) =>
                      setState({ ...state, techNames: e.target.value })
                    }
                    required={state.status === "repaired"}
                    placeholder="Enter full name here"
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={state.techEmail}
                    onChange={(e) =>
                      setState({ ...state, techEmail: e.target.value })
                    }
                    required={state.status === "repaired"}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="mb-3">
                  <label>Phone number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="07..........."
                    pattern="07[8,2,3,9]{1}[0-9]{7}"
                    title="Invalid Phone (MTN or Airtel-tigo phone number)"
                    onChange={(e) =>
                      setState({ ...state, techPhone: e.target.value })
                    }
                    value={state.techPhone}
                    required={state.status === "repaired"}
                  />
                </div>
                <div className="mb-3">
                  <label>Company name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={state.companyName}
                    onChange={(e) =>
                      setState({ ...state, companyName: e.target.value })
                    }
                    required={state.status === "repaired"}
                    placeholder="................"
                  />
                </div>
                <div className="mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={state.address}
                    onChange={(e) =>
                      setState({ ...state, address: e.target.value })
                    }
                    required={state.status === "repaired"}
                    placeholder="................"
                  />
                </div>
              </div>
            )}
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
