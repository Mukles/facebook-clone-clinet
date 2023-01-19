import Skeleton from "react-loading-skeleton";

const PostSkeleton = () => {
  return (
    <div className="post-loader mt-4 pt-1 rounded">
      <div className="d-flex  justify-content-between">
        <Skeleton circle height={43} width={43} />
        <div className="w-100 ms-2">
          <Skeleton height={18} width={"50%"} />
          <Skeleton height={16} width={"35%"} />
        </div>
      </div>
      <div className="post-body mt-2">
        <Skeleton width={"80%"} height={30} />
        <Skeleton width={"100%"} height={300} />
      </div>
      <ul className="d-flex footer">
        <li>
          <Skeleton width={"100%"} height={"100%"} />
        </li>
        <li>
          <Skeleton width={"100%"} height={"100%"} />
        </li>
        <li>
          <Skeleton width={"100%"} height={"100%"} />
        </li>
      </ul>
    </div>
  );
};

export default PostSkeleton;
