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

interface Props {
  isLoading: boolean;
  children?: any;
  setSelectedReact?: any;
  selectReact?: string;
  postId: string;
  toggleReact: any;
  userId: string;
}

const item = {
  hidden: { scale: 0, y: 57 },
  show: {
    scale: 1,
    y: 0,
  },
};

const ReactsPopup = ({
  children,
  setSelectedReact,
  userId,
  postId,
  toggleReact,
}: Props) => {
  const timeRef = useRef<null | NodeJS.Timeout>(null);
  const reactions = ["like", "love", "wow", "haha", "sad", "angry"];
  const [isOpen, setOpen] = useState(false);

  const clickHanlder = (reacts: string) => {
    setOpen(false);
    setSelectedReact(reacts);
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
                key={reacts}
                onClick={() => clickHanlder(reacts)}
                variants={item}
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
