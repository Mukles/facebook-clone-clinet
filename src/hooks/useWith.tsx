import { useEffect, useState } from "react";

const useWidth = () => {
  const [width, setWidth] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (width === 0) handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  return width;
};

export default useWidth;
