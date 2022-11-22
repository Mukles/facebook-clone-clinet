import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { setIndex } from "../App/features/auth/authSlice";
import logo from "../assets/Header/Facebook-Logo.png";
import MessengerSvg from "../assets/Header/messagerSvg";
import { header } from "../data/settings/header";

const MobileMenu = () => {
  const dispatch = useDispatch();

  return (
    <div className={`d-block d-sm-none mobile-nav pb-1`}>
      {/* top-header */}
      <div className="d-flex align-items-center justify-content-between">
        {/* logo */}
        <div className="logo">
          <Link to={"/"}>
            <img width={150} height={70} src={logo} alt="facebook" />
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <Link
            to={"/messenger"}
            className="messenger-icon"
            onClick={() => dispatch(setIndex(7))}
          >
            <MessengerSvg />
          </Link>
        </div>
      </div>

      {/* nav-items */}
      <ul className="nav-items pt-1 d-flex justify-content-between mobile-nav">
        {header.small.map((item) => {
          return (
            <li
              className="nav-item"
              key={item.id}
              onClick={() => dispatch(setIndex(item.id))}
            >
              <NavLink
                end
                to={item.url}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.icon}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileMenu;
