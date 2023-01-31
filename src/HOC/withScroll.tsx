import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const WithScroll = (Component: any) => {
  const [isScrooll, setScroll] = useState<boolean>(true);
  const { scrollY } = useScroll();

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 130) {
        setScroll(scrollY.getPrevious() < scrollY.get());
      } else {
        setScroll(true);
      }
    });
  }, []);

  return () => {
    return <Component isScrooll={isScrooll} />;
  };
};

export default WithScroll;
