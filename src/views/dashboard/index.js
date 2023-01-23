import React, { useEffect, useState } from "react";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import WidgetsDropdown from "../widgets/WidgetsDropdown";
import { useLoadBasicData } from "src/helpers";
import { CChartDoughnut } from "@coreui/react-chartjs";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { damaged, stolen, archieved, repaired, working } = useSelector(
    (state) => state.app
  );
  const { role } = useSelector((state) => state.user);
  const loadData = useLoadBasicData();
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <WidgetsDropdown />
      <div className="row">
        <div className="col-md-6">
          <CCard className="mb-4">
            <CCardBody>
              <CChartDoughnut
                options={{
                  responsive: true,
                  legend: { position: "right" },
                }}
                data={{
                  labels: [
                    "Repaired Devices",
                    "Solen Devices",
                    "Archived Devices",
                    "Damaged Devices",
                    "Working Devices",
                  ],
                  datasets: [
                    {
                      backgroundColor: [
                        "#41B883",
                        "#E46651",
                        "#00D8FF",
                        "#DD1B16",
                        "#0000FF",
                      ],
                      data: [
                        repaired.length,
                        stolen.length,
                        archieved.length,
                        damaged.length,
                        working.length,
                      ],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </div>
        {(role === "reb" || role === "rtb") && (
          <div className="col-md-6">
            <CCard className="mb-4">
              <CCardBody>
                <img
                  alt=""
                  src={
                    role === "reb"
                      ? require("../../assets/reb.png")
                      : require("../../assets/rtb.png")
                  }
                  style={{ width: "100%" }}
                />
              </CCardBody>
            </CCard>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
