import cn from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import create from "zustand";
import shallow from "zustand/shallow";

interface ToastType {
  type: string;
  id: string;
  message: string;
}

const useToastStore = create((set, get) => ({
  toastList: new Set<ToastType>(),
  show(toastId: string) {
    const { toastList } = get() as any;
    const newToastList = new Set(toastList);
    newToastList.add(toastId);
    set({
      toastList: newToastList,
    });
  },
  close(toastId: string) {
    const { toastList } = get() as any;

    const newToastList = new Set(toastList);
    newToastList.delete(toastId);

    set({
      toastList: newToastList,
    });
  },
  closeAll() {
    const newToastList = new Set();

    set({
      toastList: newToastList,
    });
  },
}));

interface ToastProps {
  uniqueId: string;
  type: string;
  children: string;
  config?: object;
}

export function Toast(props: ToastProps) {
  const { uniqueId, config = {}, type, children } = props;
  const { duration = 5000, role = "status" } = config as any;

  const { toastList, close } = useToastStore(
    (store: any) => ({
      toastList: store.toastList,
      close: store.close,
    }),
    shallow
  );

  const isShown = toastList.has(uniqueId);
  console.log(toastList);

  useEffect(() => {
    if (!duration || !isShown) {
      return;
    }

    const timeoutId = setTimeout(() => {
      close(uniqueId);
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [uniqueId, isShown, duration, close]);

  return createPortal(
    <AnimatePresence>
      {isShown && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ x: 20, opacity: 0 }}
          className={cn("toast", type)}
          role={role}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.querySelector("#toasts-portal") as HTMLElement
  );
}

export function useToastControls() {
  const controls = useToastStore(
    (store: any) => () => {
      return {
        show: store.show,
        close: store.close,
        closeAll: store.closeAll,
      };
    },
    shallow
  );

  return controls;
}
