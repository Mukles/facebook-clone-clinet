import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../App/store";
import { IToast } from "../../types/toastTypes";
import Toast from "./toast";
const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;
const limit = 30;

const ToastContainer = () => {
  const toasts = useSelector<RootState, IToast[]>((state) => state.toast);

  return (
    <motion.div layout className="toast-container">
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            {...toast}
            top={Math.min(index * -CARD_OFFSET, limit)}
            canDrag={index === 0}
            scale={1 - index * SCALE_FACTOR}
            zIndex={toasts.length - index}
            display={index > 3 ? "none" : "block"}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ToastContainer;
