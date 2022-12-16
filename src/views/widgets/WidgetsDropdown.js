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
          title="Cows in the system"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          color="info"
          value={<>62</>}
          title="Served citizens"
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
          title="Claims"
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
