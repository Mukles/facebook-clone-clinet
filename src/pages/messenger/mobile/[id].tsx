import MessengesBody from "../../../components/messenger/message-body";

const MobileSpecificConversation = () => {
  return (
    <div className="mobile-messenger row p-0 m-0">
      <div className="mobile-messenger-right messenger-right-side">
        <MessengesBody />
      </div>
    </div>
  );
};

export default MobileSpecificConversation;
