import ContactList from "../contact-list";
import LastFriendRequest from "../last-freind-request";

const RightSide = () => {
  return (
    <div className="right-side py-3">
      <LastFriendRequest />
      <ContactList />
    </div>
  );
};

export default RightSide;
