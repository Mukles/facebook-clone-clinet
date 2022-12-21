import { Outlet } from "react-router-dom";
import SideBar from "../../components/friends/sidebar";
interface Props {
  children: any;
}

const FriendLayout = () => {
  return (
    <div className="container-fluid nav-top">
      <SideBar />
      <div className="friend-right-side">
        <Outlet />
      </div>
    </div>
  );
};

export default FriendLayout;
