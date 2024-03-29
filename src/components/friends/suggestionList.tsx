import { useSelector } from "react-redux";
import { useGetSuggestionFriedsQuery } from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import RequestSkelton from "../../Skeleton/request-skeleton";
import { FriendRequesItem } from "./requestList";
import SideBarTop from "./sidebarTop";

const SuggestionList = () => {
  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );

  const { data: suggestionFriends, isLoading } =
    useGetSuggestionFriedsQuery(userId);

  return (
    <>
      <SideBarTop text="Suggestions" />
      <div className="friend-request-container">
        <h4 className="mt-2 text-capitalize">People you many know.</h4>
      </div>
      <div className="friend-request-container suggestions">
        {isLoading ? (
          <>
            {Array(6)
              .fill("")
              .map((item, i) => (
                <RequestSkelton key={i} />
              ))}
          </>
        ) : (
          <>
            {(suggestionFriends as Array<any>)?.map(
              (friend: any, index: number) => (
                <FriendRequesItem
                  friend={{ sender_details: { ...friend } }}
                  userId={userId}
                  type={"suggestions"}
                  key={index}
                />
              )
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SuggestionList;
