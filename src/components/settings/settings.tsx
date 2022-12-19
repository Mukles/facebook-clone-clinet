import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../App/store";
import defaultProfile from "../../assets/default/profile.png";
import { settings } from "../../data/settings/setting";
import { IUser } from "../../types/userTypes";

interface Props {
  setOpen: any;
}

const transition = {
  type: "spring",
  damping: 15,
  stiffness: 120,
};

const Settings = ({ setOpen }: Props) => {
  const [selectedIndex, setIndex] = useState<number | null>(null);
  const index = selectedIndex && selectedIndex - 1;
  const dispatch = useDispatch();
  const {
    profilePicture,
    userName,
    _id: userId,
  } = useSelector<RootState, IUser>((state) => state.auth.user) || {};

  return (
    <>
      <div className="setting-overlay" onClick={() => setOpen(false)}></div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{
          y: 100,
          opacity: 0,
          transition: { duration: 0.3 },
        }}
        transition={{ type: "spring", damping: 14, stiffness: 150 }}
        className="seetings-container"
      >
        <AnimatePresence initial={false} exitBeforeEnter>
          {selectedIndex === null && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={transition}
            >
              <motion.div className="profile-card-thum">
                <Link to={"/profile"} className="profile-dsc">
                  <img src={profilePicture || defaultProfile} alt="profile" />
                  <span>{userName}</span>
                </Link>

                <Link to={`/profile/${userId}`} className="see-profile">
                  See all Profile
                </Link>
              </motion.div>

              <ul className="list-setting">
                {settings.map((setting) => {
                  return (
                    <li
                      key={setting.id}
                      onClick={() => {
                        if (setting.siblings) {
                          setIndex(setting.id);
                        } else if (setting.onclick) {
                          setting.onclick(dispatch);
                        }
                      }}
                    >
                      <div className="icon">{setting.icon}</div>
                      <p>{setting.text}</p>
                      {setting.siblings && (
                        <motion.div className="icon">
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
                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}

          {selectedIndex && settings[selectedIndex - 1].siblings && (
            <motion.ul
              initial={{ x: 100, opacity: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 100, y: 0 }}
              transition={transition}
              className="list-setting siblings"
            >
              <div className="d-flex align-items-center mb-3">
                <div className="icon" onClick={() => setIndex(null)}>
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
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>
                </div>
                <h2>{settings[index || 0]?.siblings?.title}</h2>
              </div>
              {settings[index || 0]?.siblings?.main.map((item) => {
                return (
                  <li key={item.id}>
                    <div className="icon">{item.icon}</div>
                    <p>{item.text}</p>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Settings;
