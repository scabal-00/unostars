import { UiTypes } from "../types";

const initialState = {
  darkMode: false,
};

export default function UiReducer(state = initialState, action) {
  switch (action.type) {
    case UiTypes.UPDATE_DARK_MODE:
      return {
        ...state,
        darkMode: action.payload,
      };
    default:
      return state;
  }
}
