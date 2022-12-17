export const SET_SHOW_SIDE_BAR = "SET_SHOW_SIDE_BAR";
export const SET_UNFOLDABLE_SIDE_BAR = "SET_UNFOLDABLE_SIDE_BAR";
export const SET_SHOW_FULL_PAGE_LOADER = "SET_SHOW_FULL_PAGE_LOADER";
export const SET_RESET_APP = "SET_RESET_APP";

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
