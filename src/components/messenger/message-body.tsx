import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetMessageListQuery } from "../../App/features/conversation/conversationApi";
import { useGetReqUserQuery } from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import defaultProfile from "../../assets/default/profile.png";
import ChatHead from "./chatHead";
import MessengerForm from "./messengeFrom";
import SingleMessage from "./singleMessage";

const MessengesBody = () => {
  const { id: userId } = useParams();
  const [skip, setSkip] = useState();
  const { data: friendDetails } = useGetReqUserQuery(userId, { skip: !userId });
  const { profilePicture, userName } = friendDetails || {};
  const sender = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );

  const { data: messagesList, isLoading } = useGetMessageListQuery({
    sender,
    recipient: userId,
    skip,
  });
  const { messages, count } = messagesList || {};

  return (
    <>
      {userId ? (
        <>
          {isLoading ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "calc(100% - 56px)" }}
            >
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="40"
                visible={true}
              />
            </div>
          ) : (
            <>
              <ChatHead user={friendDetails} userId={userId as string} />
              <ul className="messenger-body d-flex flex-column py-1">
                {messages?.length > 0 ? (
                  <div
                    id="scrollableDiv"
                    style={{
                      display: "flex",
                      height: "100%",
                      overflowY: "scroll",
                      flexDirection: "column-reverse",
                    }}
                  >
                    <InfiniteScroll
                      dataLength={messages?.length}
                      next={() => setSkip(messages?.length)}
                      inverse={true}
                      hasMore={true}
                      style={{ paddingInline: "10px", height: "100%" }}
                      endMessage={
                        <div className="text-center position-static user-details py-3 h-100">
                          <img
                            style={{ width: "50px", height: "50px" }}
                            className="rounded-circle"
                            src={profilePicture || defaultProfile}
                            alt="profile"
                          />
                          <p className="mt-1">{userName}</p>
                          <p>You're not friends on Facebook</p>
                          <p>
                            4 mutual friends including Md. Yousuf Miah and
                            Mominul Islam
                          </p>
                        </div>
                      }
                      loader={
                        <h4 className="text-center text-2xl font-bold mb-3">
                          Loading...
                        </h4>
                      }
                      scrollableTarget="scrollableDiv"
                      className="d-flex flex-column-reverse"
                    >
                      {[...messages]
                        .reverse()
                        .map((message: any, idx: number) => {
                          const justify =
                            sender !== message.sender[0]._id ? "start" : "end";
                          return (
                            <SingleMessage
                              key={idx}
                              info={message}
                              justify={justify}
                            />
                          );
                        })}
                    </InfiniteScroll>
                  </div>
                ) : (
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
                      4 mutual friends including Md. Yousuf Miah and Mominul
                      Islam
                    </p>
                  </div>
                )}
              </ul>
            </>
          )}
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
