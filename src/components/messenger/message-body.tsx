import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetConversationListQuery } from "../../App/features/conversation/conversationApi";
import { useGetReqUserQuery } from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import defaultProfile from "../../assets/default/profile.png";
import ChatHead from "./chatHead";
import MessengerForm from "./messengeFrom";

const MessengesBody = () => {
  const { id: userId } = useParams();
  const { data: friendDetails } = useGetReqUserQuery(userId);
  const { profilePicture, userName } = friendDetails || {};
  const sender = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );
  const { data, isLoading, isSuccess, isError, error } =
    useGetConversationListQuery({ sender, recipient: userId });

  console.log("conversationList", data);

  return (
    <>
      {userId ? (
        <>
          <ChatHead user={friendDetails} userId={userId} />

          <ul className="messenger-body d-flex flex-column py-1 px-2">
            <div className="text-center position-static user-details py-3">
              <img
                style={{ width: "50px", height: "50px" }}
                className="rounded-circle"
                src={profilePicture || defaultProfile}
                alt="profile"
              />
              <p className="mt-1">{userName}</p>
              <p>You're not friends on Facebook</p>
              <p>
                4 mutual friends including Md. Yousuf Miah and Mominul Islam
              </p>
            </div>
          </ul>
          <MessengerForm recipient={userId} />
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <h5>Select a chat or start a new conversation</h5>
        </div>
      )}
    </>
  );
};

export default MessengesBody;
