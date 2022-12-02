import { AnimatePresence } from "framer-motion";
import { useState } from "react";
const withVideoModal = (Component: any) => {
  return () => {
    const [isOpen, setOpen] = useState(false);

    return (
      <>
        <AnimatePresence exitBeforeEnter>
          {isOpen && <h1>asfklasdjfklasj asdjfklasdjfkl </h1>}
        </AnimatePresence>

        <Component setOpen={setOpen} />
      </>
    );
  };
};

export default withVideoModal;
