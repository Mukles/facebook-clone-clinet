import Frined from "./freind";

const RequestGrid = () => {
  return (
    <div>
      <div className="py-4">
        <div className="friend-group-top pb-3">
          <h3>Friend Requests</h3>
          <button>See all</button>
        </div>
        <div className="row g-3">
          {Array(1)
            .fill("")
            .map((friend, index) => (
              <Frined key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RequestGrid;