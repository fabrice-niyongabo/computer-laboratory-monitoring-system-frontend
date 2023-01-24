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
  const { token, role, fName, lName } = useSelector((state) => state.user);

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
    setTimeout(() => {
      window.print();
    }, 500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="text-center">
        <h1 style={{ display: "inline-block", borderBottom: "2px solid #000" }}>
          Computer Labaratory Management System
          <br />-{route.includes("damaged") && "Damaged Devices"}
          {route.includes("repaire") && "Repaired Devices"}
          {route.includes("stolen") && "Stolen Devices"}
          {route.includes("archieve") && "Archieved Devices"}
          {route.includes("working") && "Working Devices"} Report-
        </h1>
      </div>
      <table className="table table-bordered">
        <thead>
          {route.includes("damaged") && (
            <tr>
              <th>#</th>
              <th>SN</th>
              <th>Model</th>
              <th>Type</th>
              <th>Description</th>
              <th>problem</th>
              <th>School Name</th>
              <th>Institution</th>
              <th>Province</th>
              <th>District</th>
              <th>Sector</th>
              <th>Damaged Date</th>
            </tr>
          )}
          {route.includes("repaired") && (
            <tr>
              <th>#</th>

              <th>SN</th>
              <th>Model</th>
              <th>Type</th>
              <th>Description</th>
              <th>Fixed problem</th>
              <th>School Name</th>
              <th>Institution</th>
              <th>Province</th>
              <th>District</th>
              <th>Sector</th>
              <th>Repaired Date</th>
            </tr>
          )}
          {route.includes("stolen") && (
            <tr>
              <th>#</th>
              <th>SN</th>
              <th>Model</th>
              <th>Type</th>
              <th>Description</th>
              <th>Brief</th>
              <th>School Name</th>
              <th>Institution</th>
              <th>Province</th>
              <th>District</th>
              <th>Sector</th>
              <th>Stolen Date</th>
            </tr>
          )}
          {route.includes("archieve") && (
            <tr>
              <th>#</th>
              <th>SN</th>
              <th>Model</th>
              <th>Type</th>
              <th>Description</th>
              <th>Brief</th>
              <th>School Name</th>
              <th>Institution</th>
              <th>Province</th>
              <th>District</th>
              <th>Sector</th>
              <th>Archieved Date</th>
            </tr>
          )}
          {route.includes("working") && (
            <tr>
              <th>#</th>
              <th>SN</th>
              <th>Model</th>
              <th>Type</th>
              <th>Description</th>
              <th>School Name</th>
              <th>Institution</th>
              <th>Province</th>
              <th>District</th>
              <th>Sector</th>
              <th>received Date</th>
            </tr>
          )}
        </thead>
        <tbody>
          {route.includes("damaged") &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.pcDetails.serialNumber}</td>
                <td>{item.pcDetails.model}</td>
                <td>{item.pcDetails.type}</td>
                <td>{item.pcDetails?.description}</td>
                <td>{item.description}</td>
                <td>{item.school.toUpperCase()}</td>
                <td>{item.institution.toUpperCase()}</td>
                <td>{item.province.toUpperCase()}</td>
                <td>{item.district.toUpperCase()}</td>
                <td>{item.sector.toUpperCase()}</td>
                <td>{new Date(item.damagedDate).toLocaleDateString()}</td>
              </tr>
            ))}
          {route.includes("repaired") &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.pcDetails.serialNumber}</td>
                <td>{item.pcDetails.model}</td>
                <td>{item.pcDetails.type}</td>
                <td>{item.pcDetails?.description}</td>
                <td>{item.description}</td>
                <td>{item.school.toUpperCase()}</td>
                <td>{item.institution.toUpperCase()}</td>
                <td>{item.province.toUpperCase()}</td>
                <td>{item.district.toUpperCase()}</td>
                <td>{item.sector.toUpperCase()}</td>

                <td>{new Date(item.repairedDate).toLocaleDateString()}</td>
              </tr>
            ))}
          {route.includes("stolen") &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.pcDetails.serialNumber}</td>
                <td>{item.pcDetails.model}</td>
                <td>{item.pcDetails.type}</td>
                <td>{item.pcDetails?.description}</td>
                <td>{item.description}</td>
                <td>{item.school.toUpperCase()}</td>
                <td>{item.institution.toUpperCase()}</td>
                <td>{item.province.toUpperCase()}</td>
                <td>{item.district.toUpperCase()}</td>
                <td>{item.sector.toUpperCase()}</td>

                <td>{new Date(item.stolenDate).toLocaleDateString()}</td>
              </tr>
            ))}
          {route.includes("archieved") &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.pcDetails.serialNumber}</td>
                <td>{item.pcDetails.model}</td>
                <td>{item.pcDetails.type}</td>
                <td>{item.pcDetails?.description}</td>
                <td>{item.description}</td>
                <td>{item.school.toUpperCase()}</td>
                <td>{item.institution.toUpperCase()}</td>
                <td>{item.province.toUpperCase()}</td>
                <td>{item.district.toUpperCase()}</td>
                <td>{item.sector.toUpperCase()}</td>

                <td>{new Date(item.archievedDate).toLocaleDateString()}</td>
              </tr>
            ))}
          {route.includes("working") &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.pcDetails.serialNumber}</td>
                <td>{item.pcDetails.model}</td>
                <td>{item.pcDetails.type}</td>
                <td>{item.pcDetails?.description}</td>
                <td>{item.school.toUpperCase()}</td>
                <td>{item.institution.toUpperCase()}</td>
                <td>{item.province.toUpperCase()}</td>
                <td>{item.district.toUpperCase()}</td>
                <td>{item.sector.toUpperCase()}</td>

                <td>{new Date(item.receivedDate).toLocaleDateString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <b>
        Done by: {fName} {lName}
      </b>{" "}
      <br />
      <br />
      <b>
        Signature:.............................................................
      </b>
    </div>
  );
}

export default Printer;
