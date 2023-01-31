import { useScroll } from "framer-motion";
import { useState } from "react";

const useScrollChange = () => {
  const { scrollY } = useScroll();
  const [isScroll, setScroll] = useState<boolean>(true);

  scrollY.onChange(() => {
    if (scrollY.get() > 130) {
      setScroll(scrollY.getPrevious() < scrollY.get());
    } else {
      setScroll(true);
    }
  });

  return isScroll;
};

export default useScrollChange;
