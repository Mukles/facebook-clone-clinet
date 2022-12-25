import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import {
  useAccpetFriendRequestMutation,
  useCancelFriendRequestMutation,
  useGetFriendRequestListQuery,
  useSentFriendRequestMutation,
} from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import defaultProfile from "../../assets/default/profile.png";
import profile from "../../assets/story/309455177_5413268065451119_346845499347874328_n.jpg";

type props = {
  url: "request" | "suggestion";
};

interface Props {
  type?: string;
  friend?: any;
  userId?: string;
}

export const FriendRequesItem = ({ type, friend, userId }: Props) => {
  const {
    userName,
    profilePicture,
    _id: friendId,
    createdAt,
    requestId,
  } = friend || {};

  const [
    sendRequest,
    {
      data: requestData,
      isSuccess: requestSuccess,
      isLoading: requestLoading,
      error: requestError,
    },
  ] = useSentFriendRequestMutation();

  const [
    cancelRequest,
    {
      isLoading: isCancelLoading,
      isSuccess: isCancelSuccess,
      isError: isCancelError,
      data: cancelFriendRequestData,
      error: cancelFriendRequestError,
    },
  ] = useCancelFriendRequestMutation();

  const [
    accpetFriendRequest,
    {
      isLoading: isAccpetLoading,
      isSuccess: isAccpetSuccess,
      isError: isAccpetError,
      data: accpetData,
    },
  ] = useAccpetFriendRequestMutation();

  const [isCancel, setCancel] = useState(false);

  const sentFriendRequest: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    sendRequest({ friendId, userId });
  };

  const cancelFriendRequest: React.MouseEventHandler<
    HTMLButtonElement
  > = async (event) => {
    const requestId = requestData.newRequest._id;
    event.preventDefault();
    cancelRequest(requestId);
  };

  const onAccept: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    accpetFriendRequest(requestId);
  };

  useEffect(() => {
    if (requestSuccess) {
      setCancel(true);
    }
  }, [requestSuccess]);

  useEffect(() => {
    if (isCancelSuccess) {
      setCancel(false);
    }
  }, [isCancelSuccess]);

  return (
    <Link
      to={
        !type
          ? `/friends/requests/${friendId}`
          : `/friends/suggestions/${friendId}`
      }
      className={`friend-request-item ${type} ${
        isCancel ? "request-sent" : ""
      }`}
    >
      <img src={profilePicture || defaultProfile} alt={"profile" + isCancel} />
      <div
        className={`flex-fill ${isCancel ? "d-flex align-items-center" : ""}`}
      >
        <div
          className={`d-flex justify-content-between mt-0 ${
            isCancel || isAccpetSuccess ? "flex-column" : ""
          }`}
        >
          <p className="name">{userName}</p>
          {(isCancel || isAccpetSuccess) && (
            <p className="request-sent mt-1">
              {accpetData?.message || "Request sent"}
            </p>
          )}
          {!isAccpetSuccess && (
            <p className="name time text-end">{format(createdAt as string)}</p>
          )}
        </div>
        {!isCancel && !isAccpetSuccess && (
          <div className={`mutual-frd`}>
            <div className="frd-imgs">
              <img src={profile} alt="profile" />
              <img src={profile} alt="profile" />
            </div>
            <p>4 mutual friends</p>
          </div>
        )}

        <div className="friend-buttons">
          {!type ? (
            <>
              {!isAccpetSuccess && (
                <>
                  <button
                    onClick={onAccept}
                    disabled={isAccpetLoading}
                    className={`friend confirm`}
                  >
                    Confirm
                  </button>
                  <button className="friend delete">Delete</button>
                </>
              )}
            </>
          ) : (
            <>
              {!isCancel && (
                <>
                  <button
                    disabled={requestLoading}
                    className="friend confirm"
                    type="button"
                    onClick={sentFriendRequest}
                  >
                    Add Friend
                  </button>
                  <button className="friend delete" type="button">
                    Delete
                  </button>
                </>
              )}
              {isCancel && (
                <button
                  onClick={cancelFriendRequest}
                  disabled={isCancelLoading}
                  className="friend cancel"
                  type="button"
                >
                  Cancel Request
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

const RequestList = ({ url }: props) => {
  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );
  const { isLoading, isSuccess, isError, error, data } =
    useGetFriendRequestListQuery(userId);

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
        {data?.map((friend: any, index: number) => {
          return (
            <FriendRequesItem
              key={index}
              friend={{ ...friend.user_details[0], requestId: friend._id }}
            />
          );
        })}
      </div>
    </>
  );
};

export default RequestList;
