import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import FullPageLoader from "src/components/full-page-loader";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { toastMessage } from "src/helpers";
import { BACKEND_URL } from "src/constants";
import {
  setFname,
  setLname,
  setuserDestination,
  setUserEmail,
  setUserPhone,
  setUserRole,
  setUserToken,
} from "src/actions/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toastMessage("error", "All fields are required");
    } else {
      setIsLoading(true);
      Axios.post(BACKEND_URL + "/auth/login/", {
        email,
        password,
      })
        .then((res) => {
          dispatch(setFname(res.data.firstname));
          dispatch(setLname(res.data.lastname));
          dispatch(setUserPhone(res.data.phone));
          dispatch(setUserEmail(res.data.email));
          dispatch(setuserDestination(res.data.destination));
          dispatch(setUserRole(res.data.userRole));
          dispatch(setUserToken(res.data.token));
          setIsLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          setIsLoading(false);
          setPassword("");
          if (error.response.data.error) {
            toastMessage("error", error.response.data.error);
          } else {
            toastMessage("error", "Something went wrong. Try again later");
          }
        });
    }
  };

  const bg = require("../../../assets/bg1.jpg");

  return (
    <div
      className="bg-light min-vh-100 d-flex flex-row align-items-center"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "100% 100%" }}
    >
      <CContainer>
        <div
          className="p-4"
          style={{
            width: "fit-content",
            borderRadius: "50%",
            margin: "auto",
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/17/Coat_of_arms_of_Rwanda.svg"
            alt=""
            style={{ height: "100px", width: "100px" }}
          />
        </div>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <div className="text-center">
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">
                        Sign In to your account
                      </p>
                    </div>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12} className="text-center">
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>CLMS</h2>
                    <p>
                      The general objective of this project is to develop a
                      reliable system that will track usability of ICT Device in
                      public secondary school. our project scope will cover
                      public secondary schools in Rwanda (REB, RTB) and we will
                      not include private schools.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <FullPageLoader isLoading={isLoading} />
    </div>
  );
};

export default Login;
