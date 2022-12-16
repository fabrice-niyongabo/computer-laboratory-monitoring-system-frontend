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
  setuserCompanyName,
  setUserEmail,
  setUserFullName,
  setUserPhone,
  setUserRole,
  setUserRoleId,
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
      Axios.post(BACKEND_URL + "/users/login", {
        email,
        password,
      })
        .then((res) => {
          dispatch(setUserFullName(res.data.fullName));
          dispatch(setUserPhone(res.data.phone));
          dispatch(setUserEmail(res.data.email));
          dispatch(setuserCompanyName(res.data.companyName));
          dispatch(setUserRole(res.data.role));
          dispatch(setUserRoleId(res.data.roleId));
          dispatch(setUserToken(res.data.token));
          setIsLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          setIsLoading(false);
          setPassword("");
          if (error.response.data.msg) {
            toastMessage("error", error.response.data.msg);
          } else {
            toastMessage("error", "Something went wrong. Try again later");
          }
        });
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
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
                      reliable system that will track usability of computers in
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
