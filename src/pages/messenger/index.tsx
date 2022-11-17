import { useNavigate } from "react-router-dom";
import Messenger from "../../components/messenger/Messenger";
import useWidth from "../../hooks/useWith";

const Conversation = () => {
  const navigator = useNavigate();

  const width = useWidth();
  if (width > 0 && width < 768) navigator("/messenger/mobile/conversation");

  return (
    <div className="container-fluid bg-white">
      <Messenger />
    </div>
  );
};

export default Conversation;
