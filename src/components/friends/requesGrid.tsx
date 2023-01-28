import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetFriendRequestListQuery } from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import Frined from "./freind";

const RequestGrid = () => {
  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );

  const { isLoading, data } = useGetFriendRequestListQuery(userId);

  return (
    <div>
      <div className="py-4 ps-2">
        <div className="friend-group-top pb-3">
          <h3>Friend Requests</h3>
          <Link to="requests">See all</Link>
        </div>
        <div className="row g-3">
          {isLoading ? (
            <h4>Loading...</h4>
          ) : (
            <>
              {data?.map((sender: any, index: any) => (
                <Frined sender={sender} userId={userId as string} key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestGrid;
