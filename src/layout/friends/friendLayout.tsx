import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import BarSvg from "../../assets/Header/barSvg";
import SideBar from "../../components/friends/sidebar";
import useWidth from "../../hooks/useWidth";

const FriendLayout = () => {
  const [open, setOpen] = useState<boolean>();
  const width = useWidth();

  if (width && open === undefined) {
    setOpen(width >= 1024);
  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="container-fluid nav-top d-flex">
      <div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              variants={{
                open: width >= 1024 ? { width: "350px" } : { x: "0%" },
                closed: width >= 1024 ? { width: 0 } : { x: "-100%" },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="sidebar-container"
            >
              <SideBar setOpen={setOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`friend-right-side flex-fill position-relative`}>
        <button className="bars menu-close" type="button" onClick={handleClick}>
          <BarSvg />
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default FriendLayout;
