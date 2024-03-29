import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import Axios from "axios";
import { errorHandler, toastMessage } from "src/helpers";
import { BACKEND_URL } from "src/constants";
import { useDispatch, useSelector } from "react-redux";
import { setShowFullPageLoader } from "src/actions/app";

const initialState = { serialNumber: "", model: "", type: "", lifeSpan: "" };
const Stock = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [state, setState] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.serialNumber.trim() === "") {
      toastMessage("error", "All fields on the form are required");
    } else {
      dispatch(setShowFullPageLoader(true));
      Axios.post(BACKEND_URL + "/pc/", { ...state, token })
        .then((res) => {
          setTimeout(() => {
            toastMessage("success", "Computer added to the stock!");
            dispatch(setShowFullPageLoader(false));
            setState(initialState);
          }, 1000);
        })
        .catch((error) => {
          errorHandler(error);
          dispatch(setShowFullPageLoader(false));
        });
    }
  };

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CRow>
        <CCol md={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Register new pc</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={4}>
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
                    />
                  </div>
                </CCol>
                <CCol md={4}>
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
                    />
                  </div>
                </CCol>
                <CCol md={4}>
                  <div className="mb-3">
                    <label>Type</label>
                    <select
                      name="type"
                      value={state.type}
                      onChange={changeHandler}
                      className="form-control"
                      required
                    >
                      <option value="">Choose</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Desktop">Desktop</option>
                      <option value="Printer">Printer</option>
                      <option value="Projector">Projector</option>
                      <option value="Scanner">Scanner</option>
                      <option value="Router">Router</option>
                      <option value="Switch">Switch</option>
                      <option value="WIFI Access Point">
                        WIFI Access Point
                      </option>
                      <option value="Phone">Phone</option>
                    </select>
                  </div>
                </CCol>
                <CCol md={4}>
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
                    />
                  </div>
                </CCol>
                <CCol md={4}>
                  <div className="my-3">
                    <button type="submit" className="btn btn-primary">
                      Save computer
                    </button>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </form>
  );
};

export default Stock;
