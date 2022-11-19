import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../App/store";
import LaptopMenu from "./laptopMenu";
import MobileMenu from "./mobileMenu";
//import MobileMenu from "./mobileMenu";

const Header = () => {
  const { loading } = useSelector<RootState, any>((state) => state.auth);
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
  }, [pathname]);

  const shadow = pathname === "/messenger" ? "shadow-bottom" : "";
  const display =
    pathname === "/account/login" ||
    pathname === "/messenger/mobile/conversation/[id]" ||
    pathname === "/messenger/mobile/conversation"
      ? "mobile-nav"
      : "";

  return (
    <>
      {!loading && (
        <header ref={ref} className={`py-2 fixed-top ${shadow} ${display}`}>
          <div className="container-fluid">
            <LaptopMenu />
            <MobileMenu />
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
