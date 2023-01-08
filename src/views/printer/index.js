import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import Axios from "axios";
import { BACKEND_URL } from "src/constants";
import { errorHandler } from "src/helpers";
function Printer() {
  const { route } = useParams();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { token, role } = useSelector((state) => state.user);

  const fetchData = () => {
    const rt = role === "school" ? route : "report/" + route;
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/" + role + "/" + rt + "?token=" + token)
      .then((res) => {
        setIsLoading(false);
        handleFilter(res.data.data);
      })
      .catch((error) => {
        errorHandler(error);
        setIsLoading(false);
      });
  };

  const handleFilter = (data) => {
    let res = data;
    for (const entry of searchParams.entries()) {
      const [param, value] = entry;
      if (param.toLowerCase().includes("date") || param.includes("createdAt")) {
        if (value.trim() !== "") {
          res = res.filter(
            (item) =>
              new Date(item[param])?.toLocaleDateString() ===
              new Date(value)?.toLocaleDateString()
          );
        }
      } else {
        if (value.trim() !== "") {
          if (param.includes("__")) {
            const splt = param.split("__");
            const filt = res.filter((item) =>
              item[splt[0]]?.[splt[1]]
                ?.toLowerCase()
                .includes(value.toLowerCase())
            );
            if (filt.length > 0) {
              res = filt;
            }
          } else {
            const filt = res.filter((item) =>
              item[param]?.toLowerCase().includes(value.toLowerCase())
            );
            if (filt.length > 0) {
              res = filt;
            }
          }
        }
      }
    }
    setData(res);
    // setTimeout(() => {
    //   window.print();
    // }, 500);
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="text-center">
        <h1 style={{ display: "inline-block", borderBottom: "2px solid #000" }}>
          Computer Labaratory Management System
          <br />-{route.includes("damaged") && "Damaged Devices"}
          {route.includes("repaire") && "Repaired Devices"} Report-
        </h1>
      </div>

      <table className="table table-bordered">
        <thead>
          {route.includes("damaged") && (
            <tr>
              <th>#</th>
              <th>Address</th>
              <th>Device Details</th>
              <th>School Name</th>
              <th>Description</th>
              <th>Damaged Date</th>
            </tr>
          )}
          {route.includes("repaired") && (
            <tr>
              <th>#</th>
              <th>Address</th>
              <th>Device Details</th>
              <th>Technician Details</th>
              <th>School Name</th>
              <th>Description</th>
              <th>Repaired Date</th>
            </tr>
          )}
        </thead>
        <tbody>
          {route.includes("damaged") &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <p className="m-0">
                    <b>Institution:</b> {item.institution.toUpperCase()}
                  </p>
                  <p className="m-0">
                    <b>Province:</b> {item.province.toUpperCase()}
                  </p>
                  <p className="m-0">
                    <b>District:</b> {item.district.toUpperCase()}
                  </p>
                  <p className="m-0">
                    <b>Sector:</b> {item.sector.toUpperCase()}
                  </p>
                </td>
                <td>
                  <p className="m-0">
                    <b>SN:</b> {item.pcDetails.serialNumber}
                  </p>
                  <p className="m-0">
                    <b>Model:</b> {item.pcDetails.model}
                  </p>
                  <p className="m-0">
                    <b>Type:</b> {item.pcDetails.type}
                  </p>
                  <p className="m-0">
                    <b>Description:</b> {item.pcDetails?.description}
                  </p>
                </td>
                <td>{item.school.toUpperCase()}</td>
                <td>{item.description}</td>
                <td>{new Date(item.damagedDate).toLocaleDateString()}</td>
              </tr>
            ))}
          {route.includes("repaired") &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <p className="m-0">
                    <b>Institution:</b> {item.institution.toUpperCase()}
                  </p>
                  <p className="m-0">
                    <b>Province:</b> {item.province.toUpperCase()}
                  </p>
                  <p className="m-0">
                    <b>District:</b> {item.district.toUpperCase()}
                  </p>
                  <p className="m-0">
                    <b>Sector:</b> {item.sector.toUpperCase()}
                  </p>
                </td>
                <td>
                  <p className="m-0">
                    <b>SN:</b> {item.pcDetails.serialNumber}
                  </p>
                  <p className="m-0">
                    <b>Model:</b> {item.pcDetails.model}
                  </p>
                  <p className="m-0">
                    <b>Type:</b> {item.pcDetails.type}
                  </p>
                  <p className="m-0">
                    <b>Description:</b> {item.pcDetails?.description}
                  </p>
                </td>
                <td>
                  <p className="m-0">
                    <b>Names:</b> {item?.technician?.techNames}
                  </p>
                  <p className="m-0">
                    <b>Email:</b> {item?.technician?.techEmail}
                  </p>
                  <p className="m-0">
                    <b>Phone:</b> {item?.technician?.techPhone}
                  </p>
                </td>
                <td>{item.school.toUpperCase()}</td>
                <td>{item.description}</td>
                <td>{new Date(item.repairedDate).toLocaleDateString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Printer;
