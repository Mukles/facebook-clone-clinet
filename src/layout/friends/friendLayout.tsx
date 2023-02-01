import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import BarSvg from "../../assets/Header/barSvg";
import SideBar from "../../components/friends/sidebar";
import useScrollChange from "../../hooks/useScrollChange";
import useWidth from "../../hooks/useWidth";

const FriendLayout = () => {
  const [open, setOpen] = useState<boolean>();
  const width = useWidth();
  const isScrolling = useScrollChange();
  const top = isScrolling ? "119px" : "52px";
  const height = isScrolling ? "calc(100vh - 119px)" : "calc(100vh - 52px)";

  if (width && open === undefined) {
    setOpen(width >= 1024);
  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="container-fluid nav-top d-flex p-0">
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
              style={width < 576 ? { top, height } : {}}
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
