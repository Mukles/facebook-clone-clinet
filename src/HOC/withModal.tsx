import { useState } from "react";

const WithModal = (Component: any) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  return () => {
    return <Component isOpen={isOpen} setOpen={setOpen} />;
  };
};

export default WithModal;
