import { useNavigate } from "react-router-dom";
import Menu from "../../../components/messenger/menu";
import useWidth from "../../../hooks/useWith";

const MobileConversation = () => {
  const width = useWidth();
  const navigator = useNavigate();
  if (width > 0 && width > 767) navigator("/messenger");

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
