import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { apiSlice } from "../../App/features/api/apiSlice";
import {
  useAccpetFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useGetFriendRequestListQuery,
  useSentFriendRequestMutation,
} from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import defaultProfile from "../../assets/default/profile.png";
import profile from "../../assets/story/309455177_5413268065451119_346845499347874328_n.jpg";
import { useAppDispatch } from "../../hooks/hook";
import RequestSkelton from "../../Skeleton/request-skeleton";
import SideBarTop from "./sidebarTop";

interface Props {
  type?: string;
  friend?: any;
  userId?: string;
}

export const FriendRequesItem = ({ type, friend, userId }: Props) => {
  const dispatch = useAppDispatch();
  const { _id: requestId, createdAt, sender_details } = friend || {};
  const { userName, profilePicture, _id: friendId } = sender_details || {};
  console.log({ friendId });

  const [
    sendRequest,
    {
      data: requestData,
      isSuccess: requestSuccess,
      isLoading: requestLoading,
      // error: requestError,
    },
  ] = useSentFriendRequestMutation();

  const [
    cancelRequest,
    {
      isLoading: isCancelLoading,
      isSuccess: isCancelSuccess,
      // isError: isCancelError,
      // data: cancelFriendRequestData,
      // error: cancelFriendRequestError,
    },
  ] = useCancelFriendRequestMutation();

  const [
    accpetFriendRequest,
    {
      isLoading: isAccpetLoading,
      isSuccess: isAccpetSuccess,
      // isError: isAccpetError,
      data: accpetData,
    },
  ] = useAccpetFriendRequestMutation();

  const [
    deleteFriendRequest,
    { 
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      // isError: isDeleteError,
      data: deleteData,
    },
  ] = useDeleteFriendRequestMutation();

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
    cancelRequest({ requestId, userId, friendId });
  };

  const onAccept: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    accpetFriendRequest({ userId, requestId });
  };

  const onDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    deleteFriendRequest({ userId, requestId });
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
    <AnimatePresence initial={false}>
      {
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ opacity: { duration: 0.3 } }}
        >
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
            <img
              src={profilePicture || defaultProfile}
              alt={"profile" + isCancel}
            />
            <div
              className={`flex-fill ${
                isCancel ? "d-flex align-items-center" : ""
              }`}
            >
              <div
                className={`d-flex justify-content-between mt-0 ${
                  isCancel || isAccpetSuccess || isDeleteSuccess
                    ? "flex-column"
                    : ""
                }`}
              >
                <p className="name">{userName}</p>
                {(isCancel || isAccpetSuccess || isDeleteSuccess) && (
                  <p className="request-sent mt-1">
                    {accpetData?.message ||
                      deleteData?.message ||
                      "Request sent"}
                  </p>
                )}
                {!isAccpetSuccess && !isDeleteSuccess && (
                  <p className="name time text-end">
                    {format(createdAt as string)}
                  </p>
                )}
              </div>
              {!isCancel && !isAccpetSuccess && !isDeleteSuccess && (
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
                    {!isAccpetSuccess && !isDeleteSuccess && (
                      <>
                        <button
                          type="button"
                          onClick={onAccept}
                          disabled={isAccpetLoading || isDeleteLoading}
                          className={`friend confirm`}
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={onDelete}
                          disabled={isAccpetLoading || isDeleteLoading}
                          className="friend delete"
                        >
                          Delete
                        </button>
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
                        <button
                          onClick={() => {
                            console.log(" I am clcikc", friendId);
                            dispatch(
                              apiSlice.util.updateQueryData(
                                "getSuggestionFrieds" as never,
                                userId as never,
                                (draft: any) => {
                                  draft = draft.filter(
                                    (item: any) => item._id !== friendId
                                  );
                                  return draft;
                                }
                              )
                            );
                          }}
                          className="friend delete"
                          type="button"
                        >
                          Remove
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
        </motion.div>
      }
    </AnimatePresence>
  );
};

const RequestList = () => {
  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );

  const { isLoading, data } = useGetFriendRequestListQuery(userId);

  return (
    <>
      <SideBarTop text="Friend Requests" />
      <div className="friend-request-container">
        {isLoading ? (
          <>
            {Array(7)
              .fill("")
              .map((item, i) => (
                <RequestSkelton key={i} />
              ))}
          </>
        ) : (
          <>
            <h4 className="mt-2">{data?.length} Friend Requests</h4>
            <button>View sent request</button>
            {data?.map((friend: any, index: number) => {
              return (
                <FriendRequesItem
                  key={index}
                  userId={userId}
                  friend={{ ...friend, requestId: friend._id }}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default RequestList;
