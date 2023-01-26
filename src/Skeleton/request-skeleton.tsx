import Skeleton from "react-loading-skeleton";

const RequestSkelton = () => {
  return (
    <div className="request-loader d-flex align-items-center mb-3">
      <div className="flex-fill">
        <Skeleton circle height={55} width={55} />
      </div>
      <div className="w-100 ms-3">
        <Skeleton width={"100%"} height={20} />
      </div>
    </div>
  );
};

export default RequestSkelton;
