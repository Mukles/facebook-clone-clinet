import { Link } from "react-router-dom";
import {
  useAccpetFriendRequestMutation,
  useDeleteFriendRequestMutation,
} from "../../App/features/user/userApi";
import defaultProfile from "../../assets/default/profile.png";
import profile from "../../assets/story/309455177_5413268065451119_346845499347874328_n.jpg";

interface Props {
  sender: any;
  userId: string;
}

const Frined = ({ sender, userId }: Props) => {
  const requestId = sender._id;
  const { userName, profilePicture } = sender.sender_details;

  const [
    accpetFriendRequest,
    {
      isLoading: isAccpetLoading,
      isSuccess: isAccpetSuccess,
      //isError: isAccpetError,
      data: accpetData,
    },
  ] = useAccpetFriendRequestMutation();

  const onAccept: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    accpetFriendRequest({ userId, requestId });
  };

  const [
    deleteFriendRequest,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      //isError: isDeleteError,
      data: deleteData,
      //error: deleteError,
    },
  ] = useDeleteFriendRequestMutation();

  const onDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    deleteFriendRequest({ userId, requestId });
  };

  return (
    <div className="col-lg-4 col-md-6 col-xl-3">
      <div className="friend shadow rounded mx-auto">
        <div className="ratio ratio-1x1">
          <img
            src={profilePicture || defaultProfile}
            alt="user"
            className="rounded"
          />
        </div>
        <div className="friend-body">
          <Link to="/">{userName}</Link>
          <div className="mutual-friends mt-2 ">
            <img src={profile} alt="user" />
            <span>2 mutual friends</span>
          </div>
          <button
            onClick={onAccept}
            disabled={isAccpetLoading || isDeleteLoading || isDeleteSuccess}
            type="button"
            className={`frd-button confirm rounded ${
              isAccpetSuccess || isDeleteSuccess ? "opacity-0" : ""
            }`}
          >
            Confirm
          </button>
          <button
            disabled={isAccpetLoading || isDeleteLoading || isAccpetSuccess}
            type="button"
            className="frd-button cancel rounded"
          >
            {accpetData?.message || deleteData?.message || "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Frined;
