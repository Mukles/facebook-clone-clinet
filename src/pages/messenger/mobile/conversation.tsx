import Menu from "../../../components/messenger/menu";
const MobileConversation = () => {
  return (
    <div className="container-fluid bg-white px-0">
      <div className="mobile-conversation messenger row p-0 mt-0">
        <div className="messenger-left-side">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default MobileConversation;
