import { format } from "timeago.js";
import img from "../assets/story/309455177_5413268065451119_346845499347874328_n.jpg";

interface Props {
  title?: string;
  createdAt?: string;
}
const Profile = ({ title, createdAt }: Props) => {
  return (
    <div className="d-flex  gap-2">
      <div className="user-profile">
        <img width={40} height={40} src={img} alt="profile" />
      </div>
      <div className="user-details">
        <p className="m-0">Mukles Ali</p>
        <p className="m-0">{format(createdAt as string)}</p>
      </div>
      <p className="m-0">{title}</p>
    </div>
  );
};

export default Profile;
