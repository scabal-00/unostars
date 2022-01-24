import { UiTypes } from "../types";

const initialState = {
  darkMode: false,
  isLoading: false,
};

export default function UiReducer(state = initialState, action) {
  switch (action.type) {
    case UiTypes.UPDATE_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case UiTypes.UPDATE_DARK_MODE:
      return {
        ...state,
        darkMode: action.payload,
      };
    default:
      return state;
  }
}
