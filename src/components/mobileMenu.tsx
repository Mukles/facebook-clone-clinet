import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Header/Facebook-Logo.png";
import GammingSvg from "../assets/Header/GammingSvg";
import GroupSvg from "../assets/Header/GroupSvg";
import HomeSvg from "../assets/Header/homeSvg";
import MarketPlaceSvg from "../assets/Header/marketPlaceSvg";
import MessengerSvg from "../assets/Header/messagerSvg";
import NotificationSvg from "../assets/Header/notificationSvg";
import VideoSvg from "../assets/Header/videsSvg";

const MobileMenu = () => {
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
          <Link to={"/messenger"} className="messenger-icon">
            <MessengerSvg />
          </Link>
        </div>
      </div>

      {/* nav-items */}
      <ul className="nav-items pt-1 d-flex justify-content-between mobile-nav">
        <li className="nav-item">
          <NavLink
            end
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <HomeSvg />
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/videos"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <VideoSvg />
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to={"/market-place"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <MarketPlaceSvg />
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to={"/group"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <GroupSvg />
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to={"/notification"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <NotificationSvg color={"#fff"} />
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to={"/gamming"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <GammingSvg />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
