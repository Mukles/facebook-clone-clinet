import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { addToast } from "../App/features/toast/toastSlice";

export const toastRise = (
  isSuccess: boolean,
  isError: boolean,
  errorMessage: string,
  custom: string,
  dispatch: Dispatch<AnyAction>,
  setShow?: any
) => {
  if (isSuccess) {
    dispatch(
      addToast({
        message: custom,
        type: "success",
      })
    );
    setShow && setShow(false);
  } else if (isError) {
    dispatch(
      addToast({
        message: errorMessage,
        type: "error",
      })
    );
  }
};
