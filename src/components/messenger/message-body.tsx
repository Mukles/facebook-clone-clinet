import { useParams } from "react-router-dom";
import ChatHead from "./chatHead";
import MessengerForm from "./messengeFrom";
import SingleMessage from "./singleMessage";

const MessengesBody = () => {
  const { id } = useParams();

  return (
    <>
      {id ? (
        <>
          <ChatHead />
          <ul className="messenger-body d-flex flex-column py-1 px-2">
            <SingleMessage justify="end" />
            <SingleMessage justify="start" />
            <SingleMessage justify="end" />
            <SingleMessage justify="start" />
            <SingleMessage justify="end" />
            <SingleMessage justify="start" />
            <SingleMessage justify="end" />
            <SingleMessage justify="start" />
            <SingleMessage justify="end" />
            <SingleMessage justify="start" />
            <SingleMessage justify="end" />
            <SingleMessage justify="start" />
            <SingleMessage justify="end" />
            <SingleMessage justify="start" />
            <SingleMessage justify="end" />
            <SingleMessage justify="start" />
            <SingleMessage justify="end" />
            <SingleMessage justify="start" />
            <SingleMessage justify="end" />
            <SingleMessage justify="start" />
            <SingleMessage justify="end" />
            <SingleMessage justify="start" />
          </ul>
          <MessengerForm />
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
