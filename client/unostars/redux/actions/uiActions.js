import { UiTypes } from "../types";

export function updateIsLoadingAction(isLoading) {
  return (dispatch) => {
    dispatch({
      type: UiTypes.UPDATE_IS_LOADING,
      payload: isLoading,
    });
  };
}

export function updateDarkMode(darkMode) {
  return (dispatch) => {
    dispatch({
      type: UiTypes.UPDATE_DARK_MODE,
      payload: darkMode,
    });
  };
}
