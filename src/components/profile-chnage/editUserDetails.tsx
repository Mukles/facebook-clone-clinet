import { motion } from "framer-motion";

interface Props {
  setEditClose: any;
}

const EditUserDetails = ({ setEditClose }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ when: "beforeChildren" }}
      className="overlay"
    >
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        className="delete shadow rounded"
      >
        <div>
          <h2>Edit details</h2>
          <button className="close" onClick={() => setEditClose(false)}>
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

        <div className="modal-body">
          <h3>Customize your intro</h3>
          <p>Details you select will be public.</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditUserDetails;
