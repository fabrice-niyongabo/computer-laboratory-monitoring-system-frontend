import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BACKEND_URL } from "src/constants";
import { errorHandler, toastMessage } from "src/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setShowFullPageLoader } from "src/actions/app";
import {
  setFname,
  setLname,
  setUserEmail,
  setUserPhone,
} from "src/actions/user";

function Profile() {
  const dispatch = useDispatch();
  const { token, email, fName, lName, phone } = useSelector(
    (state) => state.user
  );
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword)
      toastMessage("error", "Passwords do not match.");
    dispatch(setShowFullPageLoader(true));
    Axios.put(BACKEND_URL + "/auth/updatepassword/", {
      newPassword,
      currentPassword: password,
      token,
    })
      .then((res) => {
        setPassword("");
        setNewPassword("");
        dispatch(setShowFullPageLoader(false));
        toastMessage("success", "Password updated successfull!");
      })
      .catch((error) => {
        errorHandler(error);
        dispatch(setShowFullPageLoader(false));
      });
  };

  const handleBasicInfoUpdate = (e) => {
    e.preventDefault();
    dispatch(setShowFullPageLoader(true));
    Axios.put(BACKEND_URL + "/auth/updatedetails/", { ...state, token })
      .then((res) => {
        dispatch(setShowFullPageLoader(false));
        dispatch(setFname(res.data.data.firstname));
        dispatch(setLname(res.data.data.lastname));
        dispatch(setUserEmail(res.data.data.email));
        dispatch(setUserPhone(res.data.data.phone));
        toastMessage("success", "User Info updated successfull!");
      })
      .catch((error) => {
        errorHandler(error);
        dispatch(setShowFullPageLoader(false));
      });
  };

  useEffect(() => {
    setState({ firstname: fName, lastname: lName, email, phone });
  }, []);
  return (
    <CRow>
      <CCol md={6}>
        <form onSubmit={handleBasicInfoUpdate}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Basic Info</strong>
            </CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <label>First name</label>
                <input
                  type="text"
                  name="firstname"
                  value={state.firstname}
                  onChange={(e) => changeHandler(e)}
                  className="form-control"
                  required
                  placeholder="Your firstname"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label>Last name</label>
                <input
                  type="text"
                  name="lastname"
                  value={state.lastname}
                  onChange={(e) => changeHandler(e)}
                  className="form-control"
                  required
                  placeholder="Your lastname"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={(e) => changeHandler(e)}
                  className="form-control"
                  required
                  placeholder="Your email address"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={state.phone}
                  onChange={(e) => changeHandler(e)}
                  className="form-control"
                  pattern="07[8,2,3,9]{1}[0-9]{7}"
                  title="Invalid Phone (MTN or Airtel-tigo phone number)"
                  required
                  placeholder="Your phone number ex 07"
                />
              </div>
            </CCardBody>
            <CCardFooter>
              <button type="submit" className="btn btn-primary">
                Update info
              </button>
            </CCardFooter>
          </CCard>
        </form>
      </CCol>
      <CCol md={6}>
        <form onSubmit={handleChangePassword}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Change Password</strong>
            </CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <label>Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your current password"
                  required
                />
              </div>
              <div className="mb-3">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </div>
            </CCardBody>
            <CCardFooter>
              <button type="submit" className="btn btn-primary">
                Change Password
              </button>
            </CCardFooter>
          </CCard>
        </form>
      </CCol>
    </CRow>
  );
}

export default Profile;
