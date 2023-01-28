import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetFriendRequestListQuery } from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import ContactList from "../contact-list";
import { FriendRequesItem } from "../friends/requestList";

const RightSide = () => {
  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );
  const { isLoading, data } = useGetFriendRequestListQuery(userId);

  const lastRequest = (data && data[0]) || {};

  return (
    <div className="right-side py-3">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {data?.length > 0 && (
            <>
              <div className="d-flex justify-content-between req-header">
                <p className="mb-0 title">Friend requests</p>
                <Link to="/friends/requests">See all</Link>
              </div>
              <FriendRequesItem
                userId={userId}
                friend={{ ...lastRequest, requestId: lastRequest._id }}
              />
            </>
          )}
        </>
      )}

      <ContactList />
    </div>
  );
};

export default RightSide;
