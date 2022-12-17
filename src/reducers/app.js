import {
  SET_SHOW_SIDE_BAR,
  SET_UNFOLDABLE_SIDE_BAR,
  SET_SHOW_FULL_PAGE_LOADER,
  SET_RESET_APP,
} from "src/actions/app";

const initialState = {
  sidebarShow: true,
  unfoldable: false,
  isLoading: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_SIDE_BAR:
      return { ...state, sidebarShow: action.payload };
    case SET_UNFOLDABLE_SIDE_BAR:
      return { ...state, unfoldable: action.payload };
    case SET_SHOW_FULL_PAGE_LOADER:
      return { ...state, isLoading: action.payload };
    case SET_RESET_APP:
      return initialState;
    default:
      return state;
  }
};

export default user;
