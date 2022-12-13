import { Link } from "react-router-dom";
import { format } from "timeago.js";
import defaultProfile from "../assets/default/profile.png";

interface Props {
  title?: string;
  createdAt?: string;
  user?: any;
}
const Profile = ({ title, createdAt, user }: Props) => {
  const { userName, profilePicture } = user || {};

  return (
    <div className="d-flex  gap-2">
      <div className="user-profile">
        <img
          width={40}
          height={40}
          src={profilePicture || defaultProfile}
          alt="profile"
        />
      </div>
      <div>
        <div className="user-details d-flex flex-wrap align-items-center">
          <Link to={`/profile/${user?._id}`} className="mb-0 me-2">
            {userName}
          </Link>
          <p className="m-0 title">{title}</p>
        </div>
        <p className="m-0 time">{format(createdAt as string)}</p>
      </div>
    </div>
  );
};

export default Profile;
