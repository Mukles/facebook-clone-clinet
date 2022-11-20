import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import profile from "../../assets/story/309455177_5413268065451119_346845499347874328_n.jpg";
import { settings } from "../../data/settings/setting";

interface Props {
  setOpen: any;
}

const Settings = ({ setOpen }: Props) => {
  const [selectedIndex, setIndex] = useState<number | null>(null);

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
        <LayoutGroup>
          <AnimatePresence initial={false} exitBeforeEnter>
            {selectedIndex === null && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
              >
                <motion.div className="profile-card-thum">
                  <Link to={"/profile"} className="profile-dsc">
                    <img src={profile} alt="profile" />
                    <span>Mukles Ali</span>
                  </Link>

                  <Link to="/profile" className="see-profile">
                    See all Profile
                  </Link>
                </motion.div>

                <ul className="list-setting">
                  {settings.map((setting, index) => {
                    return (
                      <li key={setting.id} onClick={() => setIndex(index)}>
                        <div className="icon">{setting.icon}</div>
                        <p>{setting.text}</p>
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
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence exitBeforeEnter>
            {(selectedIndex === 0 || selectedIndex) && (
              <motion.ul
                initial={{ x: 100, opacity: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 100, y: 0 }}
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
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                  </div>
                  <h2>{settings[selectedIndex].siblings.title}</h2>
                </div>
                {settings[0].siblings.main.map((item) => {
                  return (
                    <li key={item.id}>
                      <div className="icon">{item.icon}</div>
                      <p>{item.text}</p>
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
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </motion.div>
    </>
  );
};

export default Settings;
