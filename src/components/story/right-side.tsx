import { useSelector } from "react-redux";
import { useGetFriendRequestListQuery } from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import ContactList from "../contact-list";
import { FriendRequesItem } from "../friends/requestList";

const RightSide = () => {
  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );
  const { isLoading, isSuccess, isError, data } =
    useGetFriendRequestListQuery(userId);

  const lastRequest = (data && data[0]) || {};

  console.log(lastRequest);

  return (
    <div className="right-side py-3">
      <FriendRequesItem
        userId={userId}
        friend={{ ...lastRequest, requestId: lastRequest._id }}
      />
      <ContactList />
    </div>
  );
};

export default RightSide;
