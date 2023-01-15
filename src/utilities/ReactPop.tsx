import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const container = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    y: -20,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { scale: 0, y: 57 },
  show: {
    scale: 1,
    y: 0,
  },
};

interface Props {
  isLoading: boolean;
  children?: any;
  setSelectedReact?: any;
  selectReact?: string;
  postId: string;
  toggleReact: any;
  userId: string;
}

const ReactsPopup = ({
  children,
  setSelectedReact,
  userId,
  postId,
  toggleReact,
}: Props) => {
  const reactions = ["like", "love", "wow", "haha", "sad", "angry"];
  const [isHover, setIsHovered] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const ClickHanlder = (reacts: string) => {
    setOpen(false);
    setSelectedReact(reacts);
    toggleReact({ postId, react: reacts, userId });
  };

  return (
    <motion.button
      className="like-btn"
      onHoverStart={() => {
        setOpen(true);
        setIsHovered(true);
      }}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHover && isOpen && (
          <motion.div
            variants={container}
            initial={"hidden"}
            animate={"show"}
            exit={"hidden"}
            className="reaction-box"
          >
            {reactions.map((reacts) => (
              <motion.div
                onClick={() => ClickHanlder(reacts)}
                variants={item}
                key={reacts}
                className={`reaction-icon ${reacts}`}
              >
                <label>{reacts}</label>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ReactsPopup;
