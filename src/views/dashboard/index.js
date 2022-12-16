import React from "react";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import WidgetsDropdown from "../widgets/WidgetsDropdown";

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardHeader>Notifications</CCardHeader>
        <CCardBody></CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
