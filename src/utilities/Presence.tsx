import { motion, useIsPresent } from "framer-motion";

interface Props {
  children: React.ReactElement;
}

const Presence = ({ children }: Props) => {
  const isPresent = useIsPresent();
  return (
    <motion.div
      initial={{ x: window.innerWidth }}
      animate={{
        scaleX: 1,
        transition: { duration: 10, ease: "circOut" },
      }}
      exit={{
        scaleX: 0,
        transition: { duration: 10, ease: "circIn" },
      }}
      style={{ originX: isPresent ? 0 : 1 }}
    >
      {children}
    </motion.div>
  );
};

export default Presence;
