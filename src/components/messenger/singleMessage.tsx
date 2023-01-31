import { motion } from "framer-motion";
import { format } from "timeago.js";

interface justify {
  justify: "start" | "end";
  info: any;
}

const SingleMessage = ({ justify, info }: justify) => {
  const { message, createdAt } = info;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`d-flex justify-content-${justify} single-message`}
    >
      <div className={justify === "end" ? "bg-blue" : "bg-gray"}>
        <p className="mb-1">{message}</p>
        <span className="ms-end d-block">{format(createdAt)}</span>
      </div>
    </motion.li>
  );
};

export default SingleMessage;
