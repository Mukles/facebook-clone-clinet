import { motion } from "framer-motion";

const item = {
  hidden: { scale: 0, y: 57 },
  show: {
    scale: 1,
    y: 0,
  },
};

interface Props {
  reacts: string;
  clickHanlder: (reacts: string) => void;
}

const Reacts = ({ reacts, clickHanlder }: Props) => {
  return (
    <motion.div>
      <motion.div
        onClick={() => clickHanlder(reacts)}
        variants={item}
        className={`reaction-icon ${reacts}`}
      >
        <label>{reacts}</label>
      </motion.div>
    </motion.div>
  );
};

export default Reacts;
