import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import BarSvg from "../assets/Header/barSvg";
import LogoSvg from "../assets/Header/logoSvg";
import MenuSvg from "../assets/Header/MenuSvg";
import MessengerSvg from "../assets/Header/messagerSvg";
import NotificationSvg from "../assets/Header/notificationSvg";
import profile from "../assets/story/311888806_797128861505186_6075576457730166756_n.jpg";
import { header } from "../data/settings/header";
import CustomeNav from "../utilities/navLink";

interface Props {
  setOpen: any;
}

const LaptopMenu = ({ setOpen }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="nav-bar align-items-center justify-content-between d-none d-sm-flex">
      <div className="logo d-flex align-items-center flex-fill gap-2">
        {/* logo */}
        <Link to={"/"}>
          <LogoSvg />
        </Link>
        <div className="flex-lg-fill">
          <div className="d-lg-block d-none input-search">
            <input type={"text"} placeholder="Search facebook" />
          </div>
          <div className="search-icon ms-1 d-flex d-lg-none">
            <svg
              onClick={() => setShow(true)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

        {/* search-overlay */}
        <div className={`search-overlay ${show ? "d-block" : "d-none"}`}>
          <div className="d-flex align-items-center">
            <div onClick={() => setShow(false)} className="arrow-icon">
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
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </div>
            <input type={"text"} placeholder="Search facebook" />
          </div>
        </div>
        <div className="ms-2 d-block d-md-none">
          <BarSvg />
        </div>
      </div>

      {/* menu-bar */}
      <div className="d-flex justify-content-between nav-items-wrapper">
        <ul className="nav-itmes d-md-flex align-items-center justify-center d-none">
          {header.large.map((data) => {
            return <CustomeNav key={data.id} {...data} />;
          })}
        </ul>

        {/* acount-control */}
        <ul className="account-control d-flex align-items-center justify-center gap-3 ms-auto">
          <li className="nav-item">
            <Link to={"/bar"}>
              <MenuSvg />
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/messenger"}>
              <MessengerSvg />
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/"}>
              <NotificationSvg />
            </Link>
          </li>
          <li className="nav-item">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen(true)}
            >
              <img
                className="rounded-circle"
                src={profile}
                width={40}
                height={40}
                alt={"profile"}
              />
            </motion.button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LaptopMenu;
