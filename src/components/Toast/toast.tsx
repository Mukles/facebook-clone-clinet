import {
  motion,
  PanInfo,
  useAnimation,
  useMotionValue,
  useTransform
} from "framer-motion";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { moveToast, removeToast } from "../../App/features/toast/toastSlice";
import { IToast, IToastIcon } from "../../types/toastTypes";

const tostIcon: IToastIcon = {
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ) as React.ReactSVGElement,
  error: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  ) as React.ReactSVGElement,
  warning: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  ) as React.ReactSVGElement,
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  ) as React.ReactSVGElement,
};

const LEFT_OFFSET = -50;

interface IToastProps extends IToast {
  top: number;
  scale: number;
  zIndex: number;
  display: string;
  canDrag: boolean;
}

const Toast = ({
  id,
  message,
  type,
  timeout,
  top,
  scale,
  display,
  zIndex,
  canDrag,
}: IToastProps) => {
  const dispatch = useDispatch();
  const controls = useAnimation();
  const offset = useMotionValue(0);
  const opacity = useTransform(offset, [0, LEFT_OFFSET], [1, 0]);

  const handlePan = (event: any, info: PanInfo) => {
    const x = info.offset.x;
    if (canDrag) {
      if (x < 0) {
        controls.set({
          x: x > LEFT_OFFSET ? x : LEFT_OFFSET,
        });
      }
    }
  };

  const handlePanEnd = async (event: any, info: PanInfo) => {
    const x = info.offset.x;
    if (canDrag) {
      if (x < LEFT_OFFSET && x < 0) {
        dispatch(removeToast(id));
      } else {
        await controls.start({ x: 0 });
      }
    }
  };

  const moveToEnd = (event: any, info: PanInfo) => {
    console.log("y:", info.offset.y);
    const y = info.offset.y;
    if (y >= 20 || y <= -100) {
      dispatch(moveToast());
    }
  };

  useEffect(() => {
    const autoclosed = setTimeout(() => {
      dispatch(removeToast(id));
    }, timeout);

    return () => {
      clearTimeout(autoclosed);
    };
  }, [dispatch, id, timeout]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{
        opacity: 1,
        y: 0,
        scale,
        top,
        zIndex,
      }}
      style={{ display, scale }}
      transition={{ type: "tween", duration: 0.3 }}
      exit={{ opacity: 0, x: -200 }}
    >
      <motion.div
        drag={canDrag ? "x" : false}
        dragConstraints={{ right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={moveToEnd}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        animate={controls}
        className={`toast ${type}`}
        style={{ x: offset, opacity, cursor: canDrag ? "grab" : "auto" }}
      >
        <div className="icon">{tostIcon[type]}</div>
        <div>
          <p className="m-0">{message}</p>
        </div>
        <button className="close" onClick={() => dispatch(removeToast(id))}>
          <i className="fa fa-times"></i>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Toast;
