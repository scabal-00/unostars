import { UiTypes } from "../types";

export function updateDarkMode(mode) {
  return (dispatch) => {
    dispatch({
      type: UiTypes.UPDATE_DARK_MODE,
      payload: mode,
    });
  };
}
