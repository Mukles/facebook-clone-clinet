import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetSuggestionFriedsQuery } from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import { FriendRequesItem } from "./requestList";

interface Props {
  url: string;
}

const SuggestionList = ({ url }: Props) => {
  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );

  const {
    data: suggestionFriends,
    isLoading,
    isError,
    error,
  } = useGetSuggestionFriedsQuery(userId);

  return (
    <>
      <div className="friend-request-top">
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
          <h1>Suggestions</h1>
        </div>
      </div>
      <div className="friend-request-container">
        <h4 className="mt-2 text-capitalize">People you many know.</h4>
      </div>
      <div className="friend-request-container suggestions">
        {(suggestionFriends as Array<any>)?.map(
          (friend: any, index: number) => (
            <FriendRequesItem
              friend={friend}
              userId={userId}
              type={"suggestions"}
              key={index}
            />
          )
        )}
      </div>
    </>
  );
};

export default SuggestionList;
