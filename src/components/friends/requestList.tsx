import { Link } from "react-router-dom";
import defaultProfile from "../../assets/default/profile.png";
import profile from "../../assets/story/309455177_5413268065451119_346845499347874328_n.jpg";

type props = {
  url: "request" | "suggestion";
};

interface Props {
  type?: string;
  friend?: any;
}

export const FriendRequesItem = ({ type, friend }: Props) => {
  const { userName, profilePicture, _id: userId } = friend;
  return (
    <Link
      to={
        !type ? `/friends/requests/${userId}` : `/friends/suggestions/${userId}`
      }
      className={`friend-request-item ${type}`}
    >
      <img src={profilePicture || defaultProfile} alt="profile" />
      <div className="flex-fill">
        <div className="d-flex justify-content-between mt-0">
          <p className="name">{userName}</p>
          <p className="name time">43y</p>
        </div>

        <div className="mutual-frd">
          <div className="frd-imgs">
            <img src={profile} alt="profile" />
            <img src={profile} alt="profile" />
          </div>
          <p>4 mutual friends</p>
        </div>

        <div className="friend-buttons">
          {!type ? (
            <>
              <button className="friend confirm">Confirm</button>
              <button className="friend delete">Delete</button>
            </>
          ) : (
            <>
              <button className="friend confirm">Add Friend</button>
              <button className="friend delete">Delete</button>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

const RequestList = ({ url }: props) => {
  return (
    <>
      <div className={`friend-request-top`}>
        <Link to={"/friends"}>
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
        </Link>
        <div>
          <Link to="/friends">Friends</Link>
          <h1>Friend Requests</h1>
        </div>
      </div>
      <div className="friend-request-container">
        <h4 className="mt-2">52 Friend Requests</h4>
        <button>View sent request</button>
        {Array(12)
          .fill("")
          .map((friend, index) => (
            <FriendRequesItem key={index} />
          ))}
      </div>
    </>
  );
};

export default RequestList;
