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
import { Districts, Provinces, Sectors } from "rwanda";

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
  const [schoolName, setSchoolName] = useState("");
  const [village, setVillage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);

  const [provincesList, setProvincesList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  const [sectorsList, setSectorsList] = useState([]);

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
        userRole == "RTB" || userRole == "REB"
          ? userRole
          : `${institution}${province.trim() !== "" ? "-" + province : ""}${
              district.trim() !== "" ? "-" + district : ""
            }${sector.trim() !== "" ? "-" + sector : ""}${
              schoolName.trim() !== "" ? "-" + schoolName : ""
            }`;
      Axios.post(BACKEND_URL + "/auth/register/", {
        firstname,
        lastname,
        email,
        password: "123456",
        phone,
        role: userRole,
        destination: destination.trim(),
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
    setProvincesList(Provinces());
  }, []);

  const handleDelete = (id) => {
    dispatch(setShowFullPageLoader(true));
    Axios.delete(BACKEND_URL + "/auth/users/" + id + "/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          dispatch(setShowFullPageLoader(false));
          toastMessage("success", "User deleted!");
          fetchUsers();
        }, 1000);
      })
      .catch((error) => {
        dispatch(setShowFullPageLoader(false));
        errorHandler(error);
      });
  };

  const fetchUsers = () => {
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/auth/users/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setUsersList(res.data.users);
        }, 1000);
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
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(item._id)}
                            >
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
                    <option value="school">School</option>
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
                        onChange={(e) => {
                          setProvince(e.target.value);
                          setDistrictsList(Districts(e.target.value));
                        }}
                        required
                      >
                        <option value="">Choose</option>
                        {provincesList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>District</label>
                      <select
                        className="form-control"
                        value={district}
                        required
                        onChange={(e) => {
                          setDistrict(e.target.value);
                          setSectorsList(Sectors(province, e.target.value));
                        }}
                      >
                        <option value="">Choose</option>
                        {districtsList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
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
                        onChange={(e) => {
                          setProvince(e.target.value);
                          setDistrictsList(Districts(e.target.value));
                        }}
                        required
                      >
                        <option value="">Choose</option>
                        {provincesList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>District</label>
                      <select
                        className="form-control"
                        value={district}
                        required
                        onChange={(e) => {
                          setDistrict(e.target.value);
                          setSectorsList(Sectors(province, e.target.value));
                        }}
                      >
                        <option value="">Choose</option>
                        {districtsList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Sector</label>
                      <select
                        className="form-control"
                        value={sector}
                        required
                        onChange={(e) => {
                          setSector(e.target.value);
                        }}
                      >
                        <option value="">Choose</option>
                        {sectorsList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                {userRole === "school" && (
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
                        onChange={(e) => {
                          setProvince(e.target.value);
                          setDistrictsList(Districts(e.target.value));
                        }}
                        required
                      >
                        <option value="">Choose</option>
                        {provincesList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>District</label>
                      <select
                        className="form-control"
                        value={district}
                        required
                        onChange={(e) => {
                          setDistrict(e.target.value);
                          setSectorsList(Sectors(province, e.target.value));
                        }}
                      >
                        <option value="">Choose</option>
                        {districtsList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Sector</label>
                      <select
                        className="form-control"
                        value={sector}
                        required
                        onChange={(e) => {
                          setSector(e.target.value);
                          setCellsList(
                            Cells(province, district, e.target.value)
                          );
                        }}
                      >
                        <option value="">Choose</option>
                        {sectorsList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>School name</label>
                      <input
                        className="form-control"
                        placeholder="School name"
                        required
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
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
