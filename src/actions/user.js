export const SET_FNAME = "SET_FIRST_NAME";
export const SET_LNAME = "SET_LAST_NAME";
export const SET_USER_PHONE = "SET_USER_PHONE";
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_DESTINATION = "SET_USER_DESTINATION";
export const SET_USER_ROLE = "SET_USER_ROLE";
export const SET_USER_TOKEN = "SET_USER_TOKEN";
export const RESET_USER = "RESET_USER";

export const setFname = (names) => (dispatch) => {
  dispatch({
    type: SET_FNAME,
    payload: names,
  });
};

export const setLname = (names) => (dispatch) => {
  dispatch({
    type: SET_LNAME,
    payload: names,
  });
};

export const setuserDestination = (name) => (dispatch) => {
  dispatch({
    type: SET_USER_DESTINATION,
    payload: name,
  });
};

export const setUserPhone = (phone) => (dispatch) => {
  dispatch({
    type: SET_USER_PHONE,
    payload: phone,
  });
};

export const setUserRole = (role) => (dispatch) => {
  dispatch({
    type: SET_USER_ROLE,
    payload: role,
  });
};

export const setUserEmail = (email) => (dispatch) => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: email,
  });
};

export const setUserToken = (token) => (dispatch) => {
  dispatch({
    type: SET_USER_TOKEN,
    payload: token,
  });
};

export const resetUser = () => ({ type: RESET_USER });
