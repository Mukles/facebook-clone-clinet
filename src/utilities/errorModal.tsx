import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../App/features/auth/authSlice";
import { RootState } from "../App/store";

const ErrorModal = ({ Error }: { Error: any }) => {
  const dispatch = useDispatch();
  const error = useSelector<RootState>((state) => state.auth.error);

  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="error-container rounded"
      >
        <button
          className="close"
          onClick={() => {
            dispatch(userLogin({ error: null }));
          }}
        >
          <i className="fa fa-times"></i>
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <p className="error-message">{Error.message}</p>
      </motion.div>
    </motion.div>
  );
};

export default ErrorModal;
