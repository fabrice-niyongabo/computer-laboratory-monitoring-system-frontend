import { BACKEND_URL } from "src/constants";
import { errorHandler } from "src/helpers";
import Axios from "axios";

export const SET_SHOW_SIDE_BAR = "SET_SHOW_SIDE_BAR";
export const SET_UNFOLDABLE_SIDE_BAR = "SET_UNFOLDABLE_SIDE_BAR";
export const SET_SHOW_FULL_PAGE_LOADER = "SET_SHOW_FULL_PAGE_LOADER";
export const SET_RESET_APP = "SET_RESET_APP";
export const SET_STOCK = "SET_STOCK";
export const SET_DAMAGED = "SET_DAMAGED";
export const SET_REPAIRED = "SET_REPAIRED";
export const SET_STOLEN = "SET_STOLEN";
export const SET_ARCHIEVED = "SET_ARCHIEVED";
export const SET_WORKING = "SET_WORKING";

export const setShowSideBar = (trueOrFalse) => (dispatch) => {
  dispatch({
    type: SET_SHOW_SIDE_BAR,
    payload: trueOrFalse,
  });
};

export const setUnfoldableSideBar = (trueOrFalse) => (dispatch) => {
  dispatch({
    type: SET_UNFOLDABLE_SIDE_BAR,
    payload: trueOrFalse,
  });
};

export const setShowFullPageLoader = (trueOrFalse) => (dispatch) => {
  dispatch({
    type: SET_SHOW_FULL_PAGE_LOADER,
    payload: trueOrFalse,
  });
};

export const resetApp = () => (dispatch) => {
  dispatch({
    type: SET_RESET_APP,
  });
};

export const setStock = (data) => (dispatch) => {
  dispatch({
    type: SET_STOCK,
    payload: data,
  });
};

export const setDamaged = (data) => (dispatch) => {
  dispatch({
    type: SET_DAMAGED,
    payload: data,
  });
};

export const setRepaired = (data) => (dispatch) => {
  dispatch({
    type: SET_REPAIRED,
    payload: data,
  });
};

export const setStolen = (data) => (dispatch) => {
  dispatch({
    type: SET_STOLEN,
    payload: data,
  });
};

export const setWorking = (data) => (dispatch) => {
  dispatch({
    type: SET_WORKING,
    payload: data,
  });
};

export const setArchieved = (data) => (dispatch) => {
  dispatch({
    type: SET_ARCHIEVED,
    payload: data,
  });
};

export const fetchStock = () => (dispatch, getState) => {
  const { user } = getState();
  Axios.get(
    BACKEND_URL + "/" + user.role.toLowerCase() + "/?token=" + user.token
  )
    .then((res) => {
      dispatch(setStock(res.data.data));
    })
    .catch((error) => {
      errorHandler(error);
    });
};

export const fetchDamaged = () => (dispatch, getState) => {
  const { user } = getState();
  const url =
    user.role == "school"
      ? BACKEND_URL +
        "/" +
        user.role.toLowerCase() +
        "/damagedPc?token=" +
        user.token
      : BACKEND_URL +
        "/" +
        user.role.toLowerCase() +
        "/report/damaged?token=" +
        user.token;
  Axios.get(url)
    .then((res) => {
      dispatch(setDamaged(res.data.data));
    })
    .catch((error) => {
      errorHandler(error);
    });
};

export const fetchWorking = () => (dispatch, getState) => {
  const { user } = getState();
  const url =
    user.role == "school"
      ? BACKEND_URL +
        "/" +
        user.role.toLowerCase() +
        "/workingPc?token=" +
        user.token
      : BACKEND_URL +
        "/" +
        user.role.toLowerCase() +
        "/report/working?token=" +
        user.token;
  Axios.get(url)
    .then((res) => {
      dispatch(setWorking(res.data.data));
    })
    .catch((error) => {
      errorHandler(error);
    });
};

export const fetchRepaired = () => (dispatch, getState) => {
  const { user } = getState();
  const url =
    user.role == "school"
      ? BACKEND_URL +
        "/" +
        user.role.toLowerCase() +
        "/repairedPc?token=" +
        user.token
      : BACKEND_URL +
        "/" +
        user.role.toLowerCase() +
        "/report/repaired?token=" +
        user.token;
  Axios.get(url)
    .then((res) => {
      dispatch(setRepaired(res.data.data));
    })
    .catch((error) => {
      errorHandler(error);
    });
};

export const fetchStolen = () => (dispatch, getState) => {
  const { user } = getState();
  const url =
    user.role == "school"
      ? BACKEND_URL +
        "/" +
        user.role.toLowerCase() +
        "/stolenPc?token=" +
        user.token
      : BACKEND_URL +
        "/" +
        user.role.toLowerCase() +
        "/report/stolen?token=" +
        user.token;
  Axios.get(url)
    .then((res) => {
      dispatch(setStolen(res.data.data));
    })
    .catch((error) => {
      errorHandler(error);
    });
};

export const fetchArchieved = () => (dispatch, getState) => {
  const { user } = getState();
  const url =
    user.role == "school"
      ? BACKEND_URL +
        "/" +
        user.role.toLowerCase() +
        "/archievedPc?token=" +
        user.token
      : BACKEND_URL +
        "/" +
        user.role.toLowerCase() +
        "/report/archieved?token=" +
        user.token;
  Axios.get(url)
    .then((res) => {
      dispatch(setArchieved(res.data.data));
    })
    .catch((error) => {
      errorHandler(error);
    });
};
