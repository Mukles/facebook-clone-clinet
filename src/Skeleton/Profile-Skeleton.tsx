import Skeleton from "react-loading-skeleton";
import { paths } from "../data/profile/paths";

const ProfileSkeleton = () => {
  return (
    <>
      <div className="cover-loader">
        <Skeleton height={"100%"} />
      </div>
      <div className="profile-photo">
        <div className="avater-loader">
          <Skeleton circle height={"100%"} />
        </div>
        <div className="profile-details-wrapper">
          <div>
            <Skeleton height={16} width={220} />
            <Skeleton height={12} width={120} />
            <ul className="friend-list">
              {Array(6)
                .fill("")
                .map((item, i) => (
                  <li key={i}>
                    <Skeleton circle height={40} width={40} />
                  </li>
                ))}
            </ul>
          </div>
          <div className="d-flex">
            <Skeleton className="me-2" height={40} width={120} />
            <Skeleton height={40} width={120} />
          </div>
        </div>
      </div>
      <div className="nav-bottom mx-3 d-flex justify-content-between align-items-center">
        <ul className="d-flex">
          {paths.map((path, idx) => (
            <li key={idx} className={path?.className}>
              <Skeleton borderRadius={18} height={34} width={72} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProfileSkeleton;
