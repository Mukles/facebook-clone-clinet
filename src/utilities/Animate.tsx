import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../App/store";

interface Props {
  children: React.ReactElement;
}

const containerVarient = {
  hidden: (direction: number) => {
    return {
      x: direction === -1 ? window.innerWidth : -window.innerWidth,
    };
  },
  animate: (direction: number) => {
    return {
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        restDelta: 0.001,
      },
    };
  },
  exit: (direction: number) => {
    return {
      x: direction * window.innerWidth,
      transition: { ease: "easeInOut" },
    };
  },
};

const Animated = ({ children }: Props) => {
  const direction: number = useSelector<RootState, any>(
    (state) => state.auth.direction
  );

  return (
    <motion.div
      custom={direction}
      variants={containerVarient}
      initial={"hidden"}
      animate={"animate"}
      exit={"exit"}
    >
      {children}
    </motion.div>
  );
};

export default Animated;
