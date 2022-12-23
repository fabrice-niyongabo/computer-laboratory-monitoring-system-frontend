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
import CIcon from "@coreui/icons-react";
import { cilDelete, cilTrash } from "@coreui/icons";

const Users = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [userRole, setUserRole] = useState("");
  const [institution, setInstitution] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
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
      firstname.trim() === "" ||
      lastname.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      userRole.trim() === ""
    ) {
      toastMessage("error", "All fields on the form are required");
    } else {
      dispatch(setShowFullPageLoader(true));
      const destination =
        userRole == "rtb" || userRole == "reb"
          ? userRole
          : `${institution}-${district.trim() !== "" ? "-" + district : ""}${
              sector.trim() !== "" ? "-" + sector : ""
            }${cell.trim() !== "" ? "-" + cell : ""}${
              village.trim() !== "" ? "-" + village : ""
            }`;
      Axios.post(BACKEND_URL + "/auth/register/", {
        firstname,
        lastname,
        email,
        password: "123456",
        phone,
        role: userRole,
        destination: destination.toUpperCase(),
        token,
      })
        .then((res) => {
          dispatch(setShowFullPageLoader(false));
          setFirstname("");
          setLastname("");
          setEmail("");
          setPhone("");
          setUserRole("");
          toastMessage("success", res.data.msg);
          fetchUsers();
        })
        .catch((error) => {
          errorHandler(error);
          dispatch(setShowFullPageLoader(false));
        });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/auth/users/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setUsersList(res.data.users);
        }, 1000);
        console.log(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };

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
                          <td>
                            {item.firstname} {item.lastname}
                          </td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{item.role}</td>
                          <td>
                            <button className="btn btn-danger">
                              <CIcon icon={cilTrash} />
                            </button>
                          </td>
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
                  <label>Firstname</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User's firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Lastname</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User's lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
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
                      setInstitution("");
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
                    <option value="REB">REB</option>
                    <option value="RTB">RTB</option>
                    <option value="district">District</option>
                    <option value="sector">Sector</option>
                    <option value="school">Cell</option>
                  </select>
                </div>
                {userRole === "district" && (
                  <>
                    <div className="mb-3">
                      <label>Institution</label>
                      <select
                        className="form-control"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        required
                      >
                        <option value="">Choose</option>
                        <option value="REB">REB</option>
                        <option value="RTB">RTB</option>
                      </select>
                    </div>
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
                      <label>Institution</label>
                      <select
                        className="form-control"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        required
                      >
                        <option value="">Choose</option>
                        <option value="REB">REB</option>
                        <option value="RTB">RTB</option>
                      </select>
                    </div>
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
                      <label>Institution</label>
                      <select
                        className="form-control"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        required
                      >
                        <option value="">Choose</option>
                        <option value="REB">REB</option>
                        <option value="RTB">RTB</option>
                      </select>
                    </div>
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
                      <label>Institution</label>
                      <select
                        className="form-control"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        required
                      >
                        <option value="">Choose</option>
                        <option value="REB">REB</option>
                        <option value="RTB">RTB</option>
                      </select>
                    </div>
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
                      NB: Default password for each new user is 123456. New
                      users are advised to change their password immediately.
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
