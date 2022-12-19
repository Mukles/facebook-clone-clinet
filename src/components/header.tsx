import { AnimatePresence } from "framer-motion";
import { useState } from "react";
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

  const shadow = pathname.match(/\/messenger|profile/gi)?.length
    ? ""
    : "shadow-sm";

  const display =
    pathname === ("/account/login" || "/account/register") ||
    (pathname.match(/\/messenger|conversation(\/\d+)?$/gi)?.length &&
      width < 576)
      ? "mobile-nav"
      : "";

  return (
    <>
      {!loading && !display && (
        <header className={`py-2 fixed-top ${shadow} ${display}`}>
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
