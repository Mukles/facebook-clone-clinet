import { format } from "timeago.js";
import defaultProfile from "../../assets/default/profile.png";
interface Props {
  partnerInfo: any;
  lastMessage: any;
}

const SingleChat = ({ partnerInfo, lastMessage }: Props) => {
  const { userName, profilePicture } = partnerInfo || {};
  const { message, createdAt } = lastMessage || {};

  return (
    <li className="chat-list d-flex align-items-center gap-3 rounded w-80">
      <div className="profile">
        <img
          className="rounded-circle"
          width={55}
          height={55}
          src={profilePicture || defaultProfile}
          alt="profile"
        />
      </div>
      <div className="user-deatils d-blcok d-md-none d-lg-block">
        <p className="mb-2 user-name">{userName}</p>
        <p className="mb-0 message">{message}</p>
      </div>
      <p className="pe-2 mb-0 ms-auto  d-blcok d-md-none d-lg-block">
        {format(createdAt)}
      </p>
      <div className="overlay d-blcok d-md-none d-lg-flex">
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
    </li>
  );
};

export default SingleChat;

const getParterInfo = () => {};
