import { motion } from "framer-motion";
import MessengesBody from "../../../components/messenger/message-body";

const MobileSpecificConversation = () => {
  return (
    <motion.div layout className="mobile-messenger row p-0 m-0">
      <div className="mobile-messenger-right messenger-right-side">
        <MessengesBody />   
      </div>
    </motion.div>
  );
};

export default MobileSpecificConversation;
