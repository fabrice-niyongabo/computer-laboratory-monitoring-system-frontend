import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import Axios from "axios";
import { errorHandler, toastMessage } from "src/helpers";
import { BACKEND_URL } from "src/constants";
import { useDispatch, useSelector } from "react-redux";
import { setShowFullPageLoader } from "src/actions/app";
import PlaceHolder from "src/components/placeholder";

const Users = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [userRole, setUserRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [village, setVillage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      userRole.trim() === "" ||
      province.trim() === ""
    ) {
      toastMessage("error", "All fields on the form are required");
    } else {
      dispatch(setShowFullPageLoader(true));
      let companyName = "";
      const roleId = `${province}-${district}${
        sector.trim() !== "" ? "-" + sector : ""
      }${cell.trim() !== "" ? "-" + cell : ""}${
        village.trim() !== "" ? "-" + village : ""
      }`;
      const rr = roleId.split("-");
      companyName = rr[rr.length - 1];
      Axios.post(BACKEND_URL + "/users/register/", {
        fullName,
        email,
        password: "12345",
        phone,
        role: userRole,
        roleId: roleId.trim().toLowerCase(),
        companyName: companyName.toUpperCase(),
        token,
      })
        .then((res) => {
          dispatch(setShowFullPageLoader(false));
          setFullName("");
          setEmail("");
          setPhone("");
          setUserRole("");
          toastMessage("success", res.data.msg);
          setUsersList([...usersList, res.data.user]);
        })
        .catch((error) => {
          errorHandler(error);
          dispatch(setShowFullPageLoader(false));
        });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/users/?token=" + token)
      .then((res) => {
        setIsLoading(false);
        setUsersList(res.data.users);
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  }, []);

  return (
    <>
      <CRow>
        <CCol md={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>System Users</strong>
            </CCardHeader>
            <CCardBody>
              {isLoading ? (
                <PlaceHolder />
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Names</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.fullName}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{item.role}</td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4}>
          <form onSubmit={handleSubmit}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Register New User</strong>
              </CCardHeader>
              <CCardBody>
                <div className="mb-3">
                  <label>Full Names</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User's full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="User's Email address"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="07..........."
                    pattern="07[8,2,3,9]{1}[0-9]{7}"
                    title="Invalid Phone (MTN or Airtel-tigo phone number)"
                    required
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>User Role</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setUserRole(e.target.value);
                      setProvince("");
                      setDistrict("");
                      setSector("");
                      setCell("");
                      setVillage("");
                    }}
                    value={userRole}
                    required
                  >
                    <option value="">Choose</option>
                    <option value="district">District</option>
                    <option value="sector">Sector</option>
                    <option value="cell">Cell</option>
                    <option value="village">Village</option>
                  </select>
                </div>
                {userRole === "district" && (
                  <>
                    <div className="mb-3">
                      <label>Province</label>
                      <select
                        className="form-control"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        required
                      >
                        <option value="">Choose</option>
                        <option value="east">East</option>
                        <option value="west">West</option>
                        <option value="north">North</option>
                        <option value="south">South</option>
                        <option value="kigali">Kigali</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>District</label>
                      <input
                        className="form-control"
                        placeholder="District name"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {userRole === "sector" && (
                  <>
                    <div className="mb-3">
                      <label>Province</label>
                      <select
                        className="form-control"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        required
                      >
                        <option value="">Choose</option>
                        <option value="east">East</option>
                        <option value="west">West</option>
                        <option value="north">North</option>
                        <option value="south">South</option>
                        <option value="kigali">Kigali</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>District</label>
                      <input
                        className="form-control"
                        placeholder="District name"
                        required
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Sector</label>
                      <input
                        className="form-control"
                        placeholder="Sector name"
                        required
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {userRole === "cell" && (
                  <>
                    <div className="mb-3">
                      <label>Province</label>
                      <select
                        className="form-control"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        required
                      >
                        <option value="">Choose</option>
                        <option value="east">East</option>
                        <option value="west">West</option>
                        <option value="north">North</option>
                        <option value="south">South</option>
                        <option value="kigali">Kigali</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>District</label>
                      <input
                        className="form-control"
                        placeholder="District name"
                        required
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Sector</label>
                      <input
                        className="form-control"
                        placeholder="Sector name"
                        required
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Cell</label>
                      <input
                        className="form-control"
                        placeholder="Cell name"
                        required
                        value={cell}
                        onChange={(e) => setCell(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {userRole === "village" && (
                  <>
                    <div className="mb-3">
                      <label>Province</label>
                      <select
                        className="form-control"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        required
                      >
                        <option value="">Choose</option>
                        <option value="east">East</option>
                        <option value="west">West</option>
                        <option value="north">North</option>
                        <option value="south">South</option>
                        <option value="kigali">Kigali</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>District</label>
                      <input
                        className="form-control"
                        placeholder="District name"
                        required
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Sector</label>
                      <input
                        className="form-control"
                        placeholder="Sector name"
                        required
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Cell</label>
                      <input
                        className="form-control"
                        placeholder="Cell name"
                        required
                        value={cell}
                        onChange={(e) => setCell(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Village</label>
                      <input
                        className="form-control"
                        placeholder="Village name"
                        required
                        value={village}
                        onChange={(e) => setVillage(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <small>
                  <i>
                    <b>
                      NB: Default password for each new user is 12345. New users
                      are advised to change their password immediately.
                    </b>
                  </i>
                </small>
              </CCardBody>
              <CCardFooter>
                <button type="submit" className="btn btn-primary">
                  Save user
                </button>
              </CCardFooter>
            </CCard>
          </form>
        </CCol>
      </CRow>
    </>
  );
};

export default Users;
