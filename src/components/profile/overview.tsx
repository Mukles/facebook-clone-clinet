import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetReqUserQuery } from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import { IUser, Types } from "../../types/userTypes";
import Add from "./add";
import List from "./list";

type Data = {
  type: Types;
  title: string;
};

const data: Data[] = [
  {
    type: "work",
    title: "Add a workplace",
  },
  {
    type: "study",
    title: "Add secondary school",
  },
  {
    type: "university",
    title: "Add university",
  },
  {
    type: "currentCity",
    title: "Add current city",
  },
  {
    type: "homeTown",
    title: "Add home town",
  },
];

interface Props {
  isProfile?: boolean;
}

const OverView = ({ isProfile }: Props) => {
  const { id: userId } = useParams();
  let { details, _id: owerId } = useSelector<RootState, IUser>(
    (state) => state.auth.user
  );
  const isOwner = userId === owerId;

  const { data: friendDetails, isLoading } = useGetReqUserQuery(userId, {
    skip: isOwner,
  });

  details = isOwner ? details : friendDetails?.details;

  if (!isLoading) {
    return (
      <div className={`overview ${isProfile && "profile-overview"}`}>
        <ul>
          {data?.map((item, index) => {
            const type =
              item.type === "study" || item.type === "university"
                ? "school"
                : item.type === "work"
                ? "company"
                : item.type === "currentCity"
                ? "currentTown"
                : item.type;
            return (
              <List key={index} details={details![item.type]} type={type}>
                {!isProfile && (
                  <Add type={item.type} title={item.title} isOwner={isOwner} />
                )}
              </List>
            );
          })}
        </ul>
      </div>
    );
  }

  return null;
};

export default OverView;
