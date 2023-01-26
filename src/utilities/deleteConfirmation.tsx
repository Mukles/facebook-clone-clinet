import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeltePostMutation } from "../App/features/post/postApi";
import { RootState } from "../App/store";
import { toastRise } from "../hooks/toastRise";
import { IUser } from "../types/userTypes";

interface Props {
  setDeleteReq: any;
  id?: string;
  setOpen: any;
}

const DeleteConfirmation = ({ setDeleteReq, id, setOpen }: Props) => {
  const dispatch = useDispatch();
  const [deletePost, { isSuccess, isLoading, isError, error }] =
    useDeltePostMutation();

  const { _id: userId, email } = useSelector<RootState, IUser>(
    (state) => state.auth.user
  );

  useEffect(() => {
    if (isSuccess || isError) {
      setDeleteReq(false);
      setOpen(false);
    }

    toastRise(
      isSuccess,
      isError,
      (error as any)?.message,
      "Post deleted successfully.!",
      dispatch
    );
  }, [isSuccess, isError, setDeleteReq, setOpen, dispatch, error]);

  return (
    <motion.div
      aria-disabled={isLoading}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overlay"
      onClick={() => setDeleteReq(false)}
    >
      <motion.div
        initial={{ y: -window.innerHeight }}
        animate={{ y: 0 }}
        exit={{ y: -window.innerHeight }}
        className="delete shadow rounded"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="">
          <h2>Move to your trash?</h2>
          <button
            className="close"
            disabled={isLoading}
            onClick={() => setDeleteReq(false)}
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="delete-body">
          Items in your trash will be automatically deleted after 30 days. You
          can delete them earlier from your Trash by going to Activity Log in
          Settings.
        </p>
        <div className="delete-fotter">
          <button
            className="rounded"
            disabled={isLoading}
            onClick={() => setDeleteReq(false)}
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={() => deletePost({ id, userId, email })}
            className="rounded"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteConfirmation;
