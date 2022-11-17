import { useNavigate, useParams } from "react-router-dom";
import MessengesBody from "../../../components/messenger/message-body";
import useWidth from "../../../hooks/useWith";

const MobileSpecificConversation = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const width = useWidth();
  if (width > 0 && width > 767) navigator(`/messenger/${id}`);

  return (
    <div className="mobile-messenger row p-0 m-0">
      <div className="mobile-messenger-right messenger-right-side">
        <MessengesBody />
      </div>
    </div>
  );
};

export default MobileSpecificConversation;
