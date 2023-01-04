import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import defaultProfile from "../../assets/default/profile.png";
import CallSvg from "../../assets/messenger/callSvg";
import InfoSvg from "../../assets/messenger/infoSvg";
import VideoSvg from "../../assets/messenger/videoSvg";

interface Props {
  user: any;
  userId: string;
}

const ChatHead = ({ user, userId }: Props) => {
  const { profilePicture, userName } = user || {};
  return (
    <div className="d-flex justify-content-between py-2 px-2 bg-white align-items-center chathead">
      <motion.div
        className="rounded"
        whileHover={{
          backgroundColor: ["#FFF", "#ddd"],
          transition: { duration: 0.5 },
        }}
      >
        <Link
          className="d-flex align-items-center p-1 px-2 text-dark"
          to={`/profile/${userId}`}
        >
          <div className="profile text-center d-flex align-items-center justify-content-center">
            <img
              className="rounded-circle"
              src={profilePicture || defaultProfile}
              width={45}
              height={45}
              alt="profile"
            />
          </div>
          <p className="me-auto ms-2 mb-0">{userName}</p>
        </Link>
      </motion.div>

      <div className="icons d-flex align-items-center gap-2">
        <div className="icon">
          <CallSvg />
        </div>
        <div className="icon">
          <VideoSvg />
        </div>
        <div className="icon">
          <InfoSvg />
        </div>
      </div>
    </div>
  );
};

export default ChatHead;
