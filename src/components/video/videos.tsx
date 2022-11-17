import { useState } from "react";
import ReactPlayer from "react-player";
import Profile from "../../utilities/profile";
import Comment from "../comment";

const Video = () => {
  const [show, setShow] = useState(false);
  const text = `Cooking and housekeeping vlogs that will relax you. Please check out my
    channel and subscribe to see more. Thank you! ♡ Cooking and housekeeping
    vlogs that will relax you. Please check out my channel and subscribe to
    see more. Thank you! ♡ Cooking and housekeeping vlogs that will relax
    you. Please check out my channel and subscribe to see more. Thank you! ♡`;
  return (
    <div className="video rounded">
      {/* prifle */}
      <div className="d-flex justify-content-between align-items-center">
        <Profile />
        <div className="icon">
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
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
      </div>
      {/* title */}
      <p className="mb-0 desc">
        {text.substr(0, show ? text.length : 120)}
        {text.length && (
          <>
            <span className={`${show ? "d-none" : "d-inline"}`}>...</span>
            <button
              onClick={() => setShow(!show)}
              className={`show-more ms-2 ${
                text.length > 100 ? "inline-block" : "d-none"
              }`}
            >
              {show === true ? "See less" : "See more"}
            </button>
          </>
        )}
      </p>

      {/* video player */}
      <div className="player-wrapper">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          width="100%"
        />
      </div>

      {/* like share comment */}

      <Comment />
    </div>
  );
};

export default Video;
