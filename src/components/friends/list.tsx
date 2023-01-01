import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetFriendListQuery } from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import defaultProfile from "../../assets/default/profile.png";
import SideBarTop from "./sidebarTop";

const List = () => {
  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );
  const { isLoading, isSuccess, isError, data } = useGetFriendListQuery(userId);
  console.log(data);
  return (
    <>
      <SideBarTop text="All Friends" />
      <div className="friends-list">
        <div className="position-relative search">
          <div className="position-absolute">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <input type={"search"} name="search" placeholder="Search Friends" />
        </div>
        <div className="list-body">
          <ul className="list-container">
            {data?.length > 0 && (
              <p className="mt-3 ms-2">{data.length} Friends</p>
            )}
            {data?.map((friend: any) => {
              const { _id, userName, profilePicture } = friend;
              return (
                <li className="friend-card" key={_id}>
                  <Link to={`/profile/${_id}`}>
                    <img src={profilePicture || defaultProfile} alt="profile" />
                    <div className="ms-2 flex-fill">
                      <p>{userName}</p>
                      <p className="mutual">2 mutual Friends</p>
                    </div>
                    <button className="icon ms-auto">
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
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default List;
