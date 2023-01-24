import React from "react";
import { CRow, CCol, CWidgetStatsA } from "@coreui/react";
import { useSelector } from "react-redux";

const WidgetsDropdown = () => {
  const { stock, damaged, repaired, stolen, archieved, working } = useSelector(
    (state) => state.app
  );
  const { role } = useSelector((state) => state.user);
  return (
    <CRow>
      <CCol sm={6} lg={2}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          style={{ backgroundColor: "#2596be", color: "#fff" }}
          value={
            role === "reb" || role === "rtb" ? (
              <>{stock.length}</>
            ) : (
              <>{stock.filter((item) => item.isReceived).length}</>
            )
          }
          title="Stock Devices"
        />
      </CCol>
      {role !== "school" && (
        <CCol sm={6} lg={2}>
          <CWidgetStatsA
            className="mb-4 pb-4"
            color="info"
            value={<>{stock.filter((item) => item.isTransfered).length}</>}
            title="Transfered"
          />
        </CCol>
      )}

      {role !== "reb" && role !== "rtb" && (
        <CCol sm={6} lg={2}>
          <CWidgetStatsA
            className="mb-4 pb-4"
            color="warning"
            value={<>{stock.filter((item) => !item.isReceived).length}</>}
            title="Waiting List"
          />
        </CCol>
      )}

      <CCol sm={6} lg={2}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          color="danger"
          value={<>{damaged.length}</>}
          title="Damaged "
        />
      </CCol>
      <CCol sm={6} lg={2}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          style={{ backgroundColor: "#41B883", color: "#fff" }}
          value={<>{repaired.length}</>}
          title="repaired"
        />
      </CCol>
      <CCol sm={6} lg={2}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          style={{ backgroundColor: "#E46651", color: "#fff" }}
          value={<>{stolen.length}</>}
          title="Stolen"
        />
      </CCol>
      <CCol sm={6} lg={2}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          style={{ backgroundColor: "#00D8FF", color: "#fff" }}
          value={<>{archieved.length}</>}
          title="Archieved"
        />
      </CCol>
      <CCol sm={6} lg={2}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          style={{ backgroundColor: "#0000FF", color: "#fff" }}
          value={<>{working.length}</>}
          title="Working"
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
