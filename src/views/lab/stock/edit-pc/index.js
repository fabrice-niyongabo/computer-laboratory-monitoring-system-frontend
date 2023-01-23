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
import { useDispatch } from "react-redux";
import { setShowFullPageLoader } from "src/actions/app";

const initialState = { serialNumber: "", model: "", type: "", lifeSpan: "" };
function EditPc({ showModal, setShowModal, selectedPc, token, fetchPcs }) {
  const [state, setState] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    Axios.put(BACKEND_URL + "/pc/" + state._id, { ...state, token })
      .then((res) => {
        setTimeout(() => {
          toastMessage("success", "Device updated!");
          setSubmitting(false);
          setShowModal(false);
          fetchPcs();
        }, 1000);
      })

      .catch((error) => {
        setSubmitting(false);
        errorHandler(error);
      });
  };

  useEffect(() => {
    if (showModal) {
      selectedPc && setState(selectedPc);
    }
  }, [showModal]);

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <>
      <CModal
        backdrop="static"
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>Edit Device</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <label>Serial number</label>
              <input
                className="form-control"
                placeholder="Enter seial number"
                name="serialNumber"
                value={state.serialNumber}
                onChange={changeHandler}
                required
                type="text"
                disabled={submitting}
              />
            </div>
            <div className="mb-3">
              <label>Model</label>
              <input
                className="form-control"
                placeholder="Enter pc model"
                name="model"
                value={state.model}
                onChange={changeHandler}
                required
                type="text"
                disabled={submitting}
              />
            </div>
            <div className="mb-3">
              <label>Type</label>
              <select
                name="type"
                value={state.type}
                onChange={changeHandler}
                className="form-control"
                required
                disabled={submitting}
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
            </div>
            <div className="mb-3">
              <label>Lifespan</label>
              <input
                className="form-control"
                placeholder="Number of years"
                name="lifeSpan"
                type="number"
                value={state.lifeSpan}
                onChange={changeHandler}
                required
                disabled={submitting}
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting && <CSpinner size="sm" />} Save changes
            </button>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
}

export default EditPc;
