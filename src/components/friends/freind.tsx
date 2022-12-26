import { Link } from "react-router-dom";
import defaultProfile from "../../assets/default/profile.png";
import profile from "../../assets/story/309455177_5413268065451119_346845499347874328_n.jpg";
import { IUser } from "../../types/userTypes";

interface Props {
  user: IUser;
}

const Frined = ({ user }: Props) => {
  const { userName, profilePicture } = user || {};
  return (
    <div className="col-lg-4 col-md-6 col-xl-3">
      <div className="friend shadow rounded mx-auto">
        <div className="ratio ratio-1x1">
          <img
            src={profilePicture || defaultProfile}
            alt="user"
            className="rounded"
          />
        </div>
        <div className="friend-body">
          <Link to="/">{userName}</Link>
          <div className="mutual-friends mt-2 ">
            <img src={profile} alt="user" />
            <span>2 mutual friends</span>
          </div>
          <button type="button" className="frd-button confirm rounded">
            Confirm
          </button>
          <button type="button" className="frd-button cancel rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Frined;
