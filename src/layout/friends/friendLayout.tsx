import Friend from "../../components/friends/freind";
import SideBar from "../../components/friends/sidebar";
interface Props {
  children: React.ReactNode;
}

const FriendLayout = ({ children }: Props) => {
  return (
    <div className="container-fluid nav-top">
      <SideBar />
      <div className="friend-right-side">
        <div className="py-4">
          <div className="friend-group-top pb-3">
            <h3>Friend Requests</h3>
            <button>See all</button>
          </div>
          <div className="row g-3">
            {Array(20)
              .fill("_")
              .map((friend, index) => {
                return <Friend key={index} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendLayout;
