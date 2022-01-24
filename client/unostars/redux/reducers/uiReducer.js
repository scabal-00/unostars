import { UiTypes } from "../types";

const initialState = {
  isLoading: false,
};

export default function UiReducer(state = initialState, action) {
  switch (action.type) {
    case UiTypes.UPDATE_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
