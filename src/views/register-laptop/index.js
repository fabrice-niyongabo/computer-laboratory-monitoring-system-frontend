import React, { useEffect, useState, createRef } from "react";

import { CRow, CCol, CCard, CCardHeader, CCardBody } from "@coreui/react";

const RegisterLaptop = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <CCard className="mb-4">
            <CCardHeader>
              Registered Users
              {/* <DocsLink href="#" /> */}
            </CCardHeader>
            <CCardBody></CCardBody>
          </CCard>
        </div>
        <div className="col-md-4">
          <CCard className="mb-4">
            <CCardHeader>Add user</CCardHeader>
            <CCardBody>
              <form>
                <div className="form-group">
                  <label>Names</label>
                  <input
                    type="text"
                    placeholder="Enter users full name"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter users email address"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    placeholder="Enter users email address"
                    className="form-control"
                  />
                </div>
                <div className="form-group my-3">
                  <button className="btn btn-primary">Save user</button>
                </div>
              </form>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </>
  );
};

export default RegisterLaptop;
