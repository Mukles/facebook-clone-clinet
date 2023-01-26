import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useAccpetFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useSentFriendRequestMutation,
  useUnFriendRequestMutation
} from "../App/features/user/userApi";
import { RootState } from "../App/store";

interface Props {
  sender: string;
  recipient: string;
  data: any;
}

const data: any = {
  accepted: [
    {
      icon: (
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
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ),
      text: "Favorites",
    },
    {
      icon: (
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
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      ),
      text: "Edit Friends List",
    },
    {
      icon: (
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
            d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
          />
        </svg>
      ),
      text: "Unfriend",
    },
  ],
  respond: [{ text: "Confirm" }, { text: "Delete" }],
};

export const RequestChecker = ({ sender, recipient, data }: Props) => {
  const { id: friendId } = useParams();
  const { _id: requestId } = data || {};
  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );
  const [addFriend, { isLoading }] = useSentFriendRequestMutation();
  const [cancelRequest, { isLoading: isCancelLoading }] =
    useCancelFriendRequestMutation();

  const onRequestCancel = () => {
    cancelRequest({ requestId, userId, friendId });
  };

  const onFriendRequest = () => {
    addFriend({ friendId, userId });
  };

  switch (data?.status) {
    case "accepted":
      return <Button status="accepted" text="Friends" requestId={data?._id} />;
    case "pending":
      return sender === data.sender ? (
        <button
          onClick={onRequestCancel}
          className="add-story profile-button position-relative"
        >
          {isCancelLoading ? (
            <RotatingLines
              strokeColor="black"
              strokeWidth="5"
              animationDuration="0.75"
              width="20"
              visible={true}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
            </svg>
          )}
          <span>Request sent</span>
        </button>
      ) : (
        <Button status="respond" text="Respond" requestId={data?._id} />
      );

    default:
      return (
        <>
          <button
            onClick={onFriendRequest}
            disabled={isLoading}
            className="add-story profile-button"
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="black"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M11 5a3 3 0 11-6 0 3 3 0 016 0zM2.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 018 18a9.953 9.953 0 01-5.385-1.572zM16.25 5.75a.75.75 0 00-1.5 0v2h-2a.75.75 0 000 1.5h2v2a.75.75 0 001.5 0v-2h2a.75.75 0 000-1.5h-2v-2z" />
              </svg>
            )}
            <span>Add Friend</span>
          </button>
        </>
      );
  }
};

interface buttonProps {
  text: string;
  status: "accepted" | "respond";
  requestId: string;
}

const Button = ({ text, status, requestId }: buttonProps) => {
  const [portal, setPortal] = useState<HTMLElement | null>();
  const [isOpen, setOpen] = useState(false);
  const statusBar = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [deleteFriendRequest, { isLoading: isDeleteLoading }] =
    useDeleteFriendRequestMutation();
  const [accpetFriendRequest, { isLoading }] = useAccpetFriendRequestMutation();
  const [unFriendRequest, { isLoading: isFriendLoading }] =
    useUnFriendRequestMutation();
  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );
  const { id: sender } = useParams();

  const onAccept = () => {
    accpetFriendRequest({ userId, requestId, friendId: sender });
  };

  const onDelete = () => {
    deleteFriendRequest({ userId, requestId, friendId: sender  });
  };

  const onUnFriend = () => {
    unFriendRequest({ requestId, userId, friendId: sender });
  };

  useEffect(() => {
    const protalElement = document.querySelector(".portal") as HTMLElement;
    setPortal(protalElement);
    const handleClick = (event: any) => {
      if (!statusBar.current || !buttonRef.current) return;

      if (
        !statusBar.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="position-relative d-inline-block">
      {status === "respond" && portal && (
        <>
          {createPortal(
            <div className="d-flex justify-content-between profile-photo rounded mt-5 align-items-center request-status">
              <p>Kasfiya Islam sent you a friend request</p>
              <div>
                <button onClick={onAccept} className="add-story profile-button">
                  <span>Confirm request</span>
                </button>
                <button
                  onClick={onDelete}
                  className="edit-profile profile-button"
                >
                  <span>Delete request</span>
                </button>
              </div>
            </div>,
            portal
          )}
        </>
      )}
      <button
        disabled={isLoading || isFriendLoading || isDeleteLoading}
        ref={buttonRef}
        className="add-story profile-button position-relative"
        onClick={() => setOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
        </svg>

        <span>{text}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <ul
            ref={statusBar}
            className="position-absolute status-bar shadow-lg"
          >
            {data[status as any].map((item: any, i: number) => {
              const onclicker =
                status === "respond"
                  ? item.text === "Confirm"
                    ? onAccept
                    : item.text === "Delete"
                    ? onDelete
                    : () => {}
                  : item.text === "Unfriend"
                  ? onUnFriend
                  : () => {};

              return (
                <li key={i}>
                  <button
                    className="d-flex align-items-center border-0"
                    type="button"
                    onClick={onclicker}
                  >
                    {item?.icon}
                    <p className="ms-2">{item.text}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RequestChecker;
