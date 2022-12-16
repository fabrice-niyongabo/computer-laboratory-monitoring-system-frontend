import React from "react";
import { CRow, CCol, CWidgetStatsA } from "@coreui/react";

const WidgetsDropdown = () => {
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          color="primary"
          value={<>26</>}
          title="PCs in the system"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          color="info"
          value={<>62</>}
          title="Served Pcs"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          color="warning"
          value={<>24</>}
          title="Waiting List"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          color="danger"
          value={<>44</>}
          title="Damaged PCs"
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
