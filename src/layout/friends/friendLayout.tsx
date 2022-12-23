import { Outlet, useParams } from "react-router-dom";
import SideBar from "../../components/friends/sidebar";
interface Props {
  children: any;
}

const FriendLayout = () => {
  const { selectedId } = useParams();
  console.log("selectedId", selectedId);

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
