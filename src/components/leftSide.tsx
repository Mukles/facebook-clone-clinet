import groups from "../assets/leftside/groups.png";
import marketplace from "../assets/leftside/market-place.png";
import messenger from "../assets/leftside/messenger.png";
import friends from "../assets/leftside/S0U5ECzYUSu.png";
import watch from "../assets/leftside/videos.png";
import profile from "../assets/story/311888806_797128861505186_6075576457730166756_n.jpg";

const LeftSide = () => {
  return (
    <div className="left-side">
      {/* left-side-icons-wrapper */}
      <ul className="d-flex flex-column gap-2">
        {/* icon */}
        <li className="d-flex align-items-center gap-2">
          <div className="profile d-flex align-items-center">
            <img width={35} height={35} src={profile} alt="profile" />
          </div>
          <p className="m-0">Mukles Ali</p>
        </li>
        {/* icon */}
        <li className="d-flex align-items-center gap-2">
          <img width={36} height={36} src={friends} alt="freinds" />
          <p className="mb-0">Friends</p>
        </li>
        {/* icon */}
        <li className="d-flex align-items-center gap-2">
          <img width={36} height={36} src={groups} alt="groups" />
          <p className="mb-0">Groups</p>
        </li>
        {/* icon */}
        <li className="d-flex align-items-center gap-2">
          <img width={36} height={36} src={messenger} alt="messenger" />
          <p className="mb-0">Messenger</p>
        </li>
        <li className="d-flex align-items-center gap-2">
          <img width={36} height={36} src={marketplace} alt="market-place" />
          <p className="mb-0">Marketplace</p>
        </li>
        {/* icon */}
        <li className="d-flex align-items-center gap-2">
          <img width={36} height={36} src={watch} alt="watch" />
          <p className="mb-0">Watch</p>
        </li>
        {/* button */}
        <li className="d-flex align-items-center gap-3">
          <button className="show-more">
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
          </button>
          <p className="mb-0">Show more</p>
        </li>
      </ul>
    </div>
  );
};

export default LeftSide;
