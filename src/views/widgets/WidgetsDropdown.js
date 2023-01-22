import React from "react";
import { CRow, CCol, CWidgetStatsA } from "@coreui/react";
import { useSelector } from "react-redux";

const WidgetsDropdown = () => {
  const { stock, damaged } = useSelector((state) => state.app);
  const { role } = useSelector((state) => state.user);
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          color="primary"
          value={
            role === "reb" || role === "rtb" ? (
              <>{stock.length}</>
            ) : (
              <>{stock.filter((item) => item.isReceived).length}</>
            )
          }
          title="Devices in the stock"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          color="info"
          value={<>{stock.filter((item) => item.isTransfered).length}</>}
          title="Transfered Devices"
        />
      </CCol>
      {role !== "reb" && role !== "rtb" && (
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4 pb-4"
            color="warning"
            value={<>{stock.filter((item) => !item.isReceived).length}</>}
            title="Waiting List"
          />
        </CCol>
      )}

      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          color="danger"
          value={<>{damaged.length}</>}
          title="Damaged Devices"
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
