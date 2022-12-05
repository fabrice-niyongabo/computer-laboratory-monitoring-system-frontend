import React, { useEffect, useState, createRef } from "react";

import { CRow, CCol, CCard, CCardHeader, CCardBody } from "@coreui/react";

const RegisterLaptop = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <CCard className="mb-4">
            <CCardHeader>Registered New laptop</CCardHeader>
            <CCardBody>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="PC name"
                />
              </div>
              <div className="form-group">
                <label>Model</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="PC model"
                />
              </div>
              <div className="form-group">
                <label>Serial Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="PC Serial number"
                />
              </div>
              <div className="my-3">
                <button className="btn btn-primary">Save PC</button>
              </div>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </>
  );
};

export default RegisterLaptop;
