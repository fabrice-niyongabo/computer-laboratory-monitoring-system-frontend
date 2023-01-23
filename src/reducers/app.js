import {
  SET_SHOW_SIDE_BAR,
  SET_UNFOLDABLE_SIDE_BAR,
  SET_SHOW_FULL_PAGE_LOADER,
  SET_RESET_APP,
  SET_ARCHIEVED,
  SET_REPAIRED,
  SET_STOCK,
  SET_STOLEN,
  SET_DAMAGED,
  SET_WORKING,
} from "src/actions/app";

const initialState = {
  sidebarShow: true,
  unfoldable: false,
  isLoading: false,
  stock: [],
  damaged: [],
  repaired: [],
  stolen: [],
  archieved: [],
  working: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_SIDE_BAR:
      return { ...state, sidebarShow: action.payload };
    case SET_UNFOLDABLE_SIDE_BAR:
      return { ...state, unfoldable: action.payload };
    case SET_SHOW_FULL_PAGE_LOADER:
      return { ...state, isLoading: action.payload };
    case SET_STOCK:
      return { ...state, stock: action.payload };
    case SET_DAMAGED:
      return { ...state, damaged: action.payload };
    case SET_REPAIRED:
      return { ...state, repaired: action.payload };
    case SET_STOLEN:
      return { ...state, stolen: action.payload };
    case SET_WORKING:
      return { ...state, working: action.payload };
    case SET_ARCHIEVED:
      return { ...state, archieved: action.payload };
    case SET_RESET_APP:
      return initialState;
    default:
      return state;
  }
};

export default user;
