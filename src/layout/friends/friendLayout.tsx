import { Outlet, useParams } from "react-router-dom";
import SideBar from "../../components/friends/sidebar";

const FriendLayout = () => {
  const { selectedId } = useParams();

  return (
    <div className="container-fluid nav-top">
      <SideBar />
      <div
        className={`friend-right-side  d-md-block ${
          selectedId ? "d-block" : "d-none"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default FriendLayout;
