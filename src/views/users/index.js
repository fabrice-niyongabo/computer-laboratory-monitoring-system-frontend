import React, { useEffect, useState, createRef } from "react";

import { CRow, CCol, CCard, CCardHeader, CCardBody } from "@coreui/react";

const Users = () => {
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
            <CCardBody></CCardBody>
          </CCard>
        </div>
      </div>
    </>
  );
};

export default Users;
