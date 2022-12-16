import {
  SET_USER_FULL_NAME,
  SET_USER_COMPANY_NAME,
  SET_USER_ROLE,
  SET_USER_ROLE_ID,
  SET_USER_EMAIL,
  SET_USER_PHONE,
  SET_USER_TOKEN,
  RESET_USER,
} from "../actions/user";

const initialState = {
  fullName: "",
  companyName: "",
  phone: "",
  email: "",
  role: "",
  roleId: "",
  token: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PHONE:
      return { ...state, phone: action.payload };

    case SET_USER_EMAIL:
      return { ...state, email: action.payload };

    case SET_USER_TOKEN:
      return { ...state, token: action.payload };

    case SET_USER_ROLE:
      return { ...state, role: action.payload };
    case SET_USER_ROLE_ID:
      return { ...state, roleId: action.payload };

    case SET_USER_COMPANY_NAME:
      return { ...state, companyName: action.payload };

    case SET_USER_FULL_NAME:
      return { ...state, fullName: action.payload };

    case RESET_USER:
      return initialState;

    default:
      return state;
  }
};

export default user;
