import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../App/store";
import defaultProfile from "../assets/default/profile.png";
import { leftSide } from "../data/sidebar/leftside";
import { IUser } from "../types/userTypes";

const container = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  show: {
    height: "auto",
    opacity: 1,
  },
};

const LeftSide = () => {
  const { _id, profilePicture, userName } =
    useSelector<RootState, IUser>((state) => state.auth.user) || {};
  const [isShow, setShow] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/bar") {
      setShow(true);
    }
  }, [pathname]);

  return (
    <div className="left-side">
      {/* left-side-icons-wrapper */}
      <ul className="d-flex flex-column gap-2">
        {/* icon */}
        <li>
          <Link
            to={`/profile/${_id}`}
            className="d-flex align-items-center gap-2"
          >
            <div className="profile d-flex align-items-center">
              <img
                width={35}
                height={35}
                src={profilePicture || defaultProfile}
                alt="profile"
              />
            </div>
            <p className="m-0">{userName}</p>
          </Link>
        </li>
        {/* icon */}
        {leftSide.map((item, index) => (
          <li key={index}>
            <Link to={item.url} className="d-flex align-items-center gap-2">
              <img width={36} height={36} src={item.icon} alt={item.text} />
              <p className="mb-0">{item.text}</p>
            </Link>
          </li>
        ))}

        <AnimatePresence initial={false} exitBeforeEnter>
          {isShow && (
            <motion.ul
              variants={container}
              initial={"hidden"}
              animate={"show"}
              exit={"hidden"}
              transition={{ duration: 0.3, bounce: 0.2, ease: "easeInOut" }}
            >
              {leftSide.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.url}
                    className="d-flex align-items-center gap-2"
                  >
                    <img
                      width={36}
                      height={36}
                      src={item.icon}
                      alt={item.text}
                    />
                    <p className="mb-0">{item.text}</p>
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* button */}
        <li
          onClick={() => setShow(!isShow)}
          className="d-flex align-items-center gap-3"
        >
          <motion.button
            animate={{ rotate: isShow ? 180 : 0 }}
            transition={{ dealy: 0.3 }}
            className="show-more"
          >
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
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </motion.button>
          <p className="mb-0">Show more</p>
        </li>
      </ul>
    </div>
  );
};

export default LeftSide;
