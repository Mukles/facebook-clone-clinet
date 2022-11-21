import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../App/store";
import useWidth from "../hooks/useWidth";
import LaptopMenu from "./laptopMenu";
import MobileMenu from "./mobileMenu";
import Settings from "./settings/settings";

const Header = () => {
  const { loading } = useSelector<RootState, any>((state) => state.auth);
  const width = useWidth();
  const [isOpen, setOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", function (e) {
      if (this.window.scrollY > 100) {
        ref.current?.classList.add("shadow-bottom");
      } else {
        ref.current?.classList.remove("shadow-bottom");
      }
    });
  }, [pathname, width]);

  const shadow = pathname === "/messenger" ? "shadow-bottom" : "";
  const display =
    pathname === "/account/login" ||
    (pathname.match(/\/messenger|conversation(\/\d+)?$/gi)?.length &&
      width < 576)
      ? "mobile-nav"
      : "";

  return (
    <>
      {!loading && (
        <header ref={ref} className={`py-2 fixed-top ${shadow} ${display}`}>
          <div className="container-fluid">
            <LaptopMenu setOpen={setOpen} />
            <MobileMenu />
          </div>
          <AnimatePresence>
            {isOpen && <Settings setOpen={setOpen} />}
          </AnimatePresence>
        </header>
      )}
    </>
  );
};

export default Header;
