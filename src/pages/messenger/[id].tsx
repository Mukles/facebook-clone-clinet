import { useNavigate, useParams } from "react-router-dom";
import Messenger from "../../components/messenger/Messenger";
import useWidth from "../../hooks/useWith";

const Conversation = () => {
  const width = useWidth();
  const { id } = useParams();
  const navigator = useNavigate();
  if (width > 0 && width < 768)
    navigator(`/messenger/mobile/conversation/${id}`);
  return <Messenger />;
};

export default Conversation;
