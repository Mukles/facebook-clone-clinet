import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useAccpetFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useGetFriendRequestListQuery,
} from "../App/features/user/userApi";
import { RootState } from "../App/store";
import defaultProfile from "../assets/default/profile.png";
import img from "../assets/story/311888806_797128861505186_6075576457730166756_n.jpg";

const LastFriendRequest = () => {
  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );
  const { isLoading, isSuccess, isError, data } =
    useGetFriendRequestListQuery(userId);

  const lastRequest = (data && data[0]) || {};
  const { userName, profilePicture, createdAt } =
    lastRequest.sender_details || {};
  const requestId = lastRequest._id;

  const [
    accpetFriendRequest,
    {
      isLoading: isAccpetLoading,
      isSuccess: isAccpetSuccess,
      isError: isAccpetError,
      data: accpetData,
    },
  ] = useAccpetFriendRequestMutation();

  const [
    deleteFriendRequest,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      data: deleteData,
      error: deleteError,
    },
  ] = useDeleteFriendRequestMutation();

  const onAccept: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    accpetFriendRequest({ userId, requestId });
  };

  const onDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    deleteFriendRequest({ userId, requestId });
  };

  return (
    <>
      {true && (
        <div className="last-frd-req">
          <div className="d-flex justify-content-between req-header">
            <p className="mb-0 title">Friend requests</p>
            <Link to="/friends/requests">See all</Link>
          </div>

          <div className="mt-3 d-flex gap-3 wrapper p-2 overflow-hidden rounded">
            <div className="request-profile flex-shrink-0">
              <img
                src={profilePicture || defaultProfile}
                width={50}
                height={50}
                alt="profile"
              />
            </div>

            <div className="flex-fill w-100 d-flex justify-content-between">
              <div className="req-info d-flex flex-column">
                <p className="mb-0">{userName}</p>
                <div className="d-flex gap-2 mt-1">
                  <div className="frd-profile">
                    <img src={img} width={22} height={22} alt="profile" />
                  </div>
                  <div className="frd-profile">
                    <img src={img} width={22} height={22} alt="profile" />
                  </div>
                  <span className="-mt-2">5 mutual friends</span>
                </div>

                <div className="buttons mt-1 d-flex gap-2 gap-xl-3">
                  <button
                    className="confirm"
                    disabled={isAccpetLoading || isDeleteLoading}
                    onClick={onAccept}
                  >
                    Confirm
                  </button>
                  <button
                    className="delete"
                    disabled={isAccpetLoading || isDeleteLoading}
                    onClick={onDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <span>{createdAt as string}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LastFriendRequest;
