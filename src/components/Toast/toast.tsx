import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeToast } from "../../App/features/toast/toastSlice";
import { Toast as ToastTypes } from "../../types/toastTypes";

const Toast = ({ id, message, type, timeout }: ToastTypes) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const autoclosed = setTimeout(() => {
      dispatch(removeToast(id));
    }, timeout);

    return () => {
      clearTimeout(autoclosed);
    };
  }, [dispatch, id, timeout]);
  return (
    <div className={`toast ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
