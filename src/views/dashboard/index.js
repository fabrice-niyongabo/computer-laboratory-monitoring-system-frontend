import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "src/constants";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import WidgetsDropdown from "../widgets/WidgetsDropdown";
import { useLoadBasicData } from "src/helpers";
import { CChartDoughnut } from "@coreui/react-chartjs";
import { useSelector } from "react-redux";
import axios from "axios";

const Dashboard = () => {
  const { stock, damaged, stolen, archieved, repaired, working } = useSelector(
    (state) => state.app
  );
  const [stockDistrict, setStockDistrict] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token, role } = useSelector((state) => state.user);

  const mainPath = role.toLowerCase();
  const loadData = useLoadBasicData();
  useEffect(() => {
    loadData();
    fetchPcs();
  }, []);

  const fetchPcs = () => {
    setIsLoading(true);
    axios
      .get(BACKEND_URL + "/" + mainPath + "/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setStockDistrict(res.data.data);
        }, 1000);
      })
      .catch((error) => {
        errorHandler(error);
        setIsLoading(false);
      });
  };

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
                  plugins: {
                    legend: {
                      position: "right",
                    },
                  },
                }}
                data={{
                  labels: [
                    "Repaired Devices",
                    "Stolen Devices",
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
                <h3>Short details</h3>
                <div>
                  <ul>
                    <li
                      style={{
                        listStyleType: "none",
                        fontWeight: "700",
                        fontWeight: "700",
                      }}
                    >
                      {stock.filter((item) => item.type === "Laptop").length > 0
                        ? `Laptop:   ${
                            stock.filter((item) => item.type === "Laptop")
                              .length
                          } `
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter((item) => item.type === "Desktop").length >
                      0
                        ? `Desktop:${
                            stock.filter((item) => item.type === "Desktop")
                              .length
                          } `
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter((item) => item.type === "Printer").length >
                      0
                        ? `Printer:  ${
                            stock.filter((item) => item.type === "Printer")
                              .length
                          } `
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter((item) => item.type === "Projector")
                        .length > 0
                        ? `${
                            stock.filter((item) => item.type === "Projector")
                              .length
                          } ---Projector`
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter((item) => item.type === "Router").length > 0
                        ? `Router:${
                            stock.filter((item) => item.type === "Router")
                              .length
                          } `
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter((item) => item.type === "Scanner").length >
                      0
                        ? `Scanner:${
                            stock.filter((item) => item.type === "Scanner")
                              .length
                          } `
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter((item) => item.type === "Switch").length > 0
                        ? `Switch:${
                            stock.filter((item) => item.type === "Switch")
                              .length
                          }`
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter((item) => item.type === "WIFI Access Point")
                        .length > 0
                        ? `WIFI Access Point:${
                            stock.filter(
                              (item) => item.type === "WIFI Access Point"
                            ).length
                          } `
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter((item) => item.type === "Phone").length > 0
                        ? `Phone:${
                            stock.filter((item) => item.type === "Phone").length
                          }`
                        : " "}
                    </li>
                  </ul>
                </div>
              </CCardBody>
            </CCard>
          </div>
        )}
        {(role === "district" || role === "sector" || role === "school") && (
          <div className="col-md-6">
            <CCard className="mb-4">
              <CCardBody>
                <h3>Short details</h3>
                <div>
                  <ul>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stockDistrict.filter(
                        (item) => item.pcDetails.type === "Laptop"
                      ).length > 0
                        ? `Laptop:   ${
                            stock.filter(
                              (item) => item.pcDetails.type === "Laptop"
                            ).length
                          } `
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter((item) => item.pcDetails.type === "Desktop")
                        .length > 0
                        ? `Desktop:${
                            stock.filter(
                              (item) => item.pcDetails.type === "Desktop"
                            ).length
                          }`
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter((item) => item.pcDetails.type === "Printer")
                        .length > 0
                        ? `Printer: ${
                            stock.filter(
                              (item) => item.pcDetails.type === "Printer"
                            ).length
                          } `
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter(
                        (item) => item.pcDetails.type === "Projector"
                      ).length > 0
                        ? `Projector:${
                            stock.filter(
                              (item) => item.pcDetails.type === "Projector"
                            ).length
                          }`
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter((item) => item.pcDetails.type === "Router")
                        .length > 0
                        ? `Router:${
                            stock.filter(
                              (item) => item.pcDetails.type === "Router"
                            ).length
                          }`
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter((item) => item.pcDetails.type === "Scanner")
                        .length > 0
                        ? `Scanner:${
                            stock.filter(
                              (item) => item.pcDetails.type === "Scanner"
                            ).length
                          } `
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter((item) => item.pcDetails.type === "Switch")
                        .length > 0
                        ? `Switch:${
                            stock.filter(
                              (item) => item.pcDetails.type === "Switch"
                            ).length
                          }`
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter(
                        (item) => item.pcDetails.type === "WIFI Access Point"
                      ).length > 0
                        ? `WIFI Access Point:${
                            stock.filter(
                              (item) =>
                                item.pcDetails.type === "WIFI Access Point"
                            ).length
                          }`
                        : ""}
                    </li>
                    <li style={{ listStyleType: "none", fontWeight: "700" }}>
                      {stock.filter((item) => item.pcDetails.type === "Phone")
                        .length > 0
                        ? `Phone:${
                            stock.filter(
                              (item) => item.pcDetails.type === "Phone"
                            ).length
                          } `
                        : " "}
                    </li>
                  </ul>
                </div>
              </CCardBody>
            </CCard>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
