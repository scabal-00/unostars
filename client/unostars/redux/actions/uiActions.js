import { UiTypes } from "../types";

export function updateIsLoadingAction(isLoading) {
  return (dispatch) => {
    dispatch({
      type: UiTypes.UPDATE_IS_LOADING,
      payload: isLoading,
    });
  };
}
