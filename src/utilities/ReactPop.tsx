import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

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
  const timeRef = useRef<null | NodeJS.Timeout>(null);
  const reactions = ["like", "love", "wow", "haha", "sad", "angry"];
  // const [isHover, setIsHovered] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const ClickHanlder = (reacts: string) => {
    setOpen(false);
    setSelectedReact(reacts);
    toggleReact({ postId, react: reacts, userId });
  };

  const handleTouchStart = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current as NodeJS.Timeout);
      setOpen(true);
    } else {
      startPressTimer();
    }
  };

  const handleTouchEnd = () => {
    startPressTimer();
  };

  const startPressTimer = () => {
    clearTimeout(timeRef.current as NodeJS.Timeout);
    timeRef.current = setTimeout(() => {
      setOpen((open) => !open);
    }, 500);
  };

  return (
    <motion.button
      className="like-btn"
      onTouchStart={handleTouchStart}
      onHoverStart={handleTouchStart}
      onHoverEnd={handleTouchEnd}
    >
      {children}
      <AnimatePresence>
        {isOpen && (
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
