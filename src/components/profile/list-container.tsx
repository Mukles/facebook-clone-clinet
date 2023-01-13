import { useSelector } from "react-redux";
import { RootState } from "../../App/store";
import { Details, Types } from "../../types/userTypes";
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

const ListContainer = () => {
  const details = useSelector<RootState, Details | undefined>(
    (state) => state.auth.user.details
  );

  return (
    <ul>
      {data.map((item, index) => {
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
            <Add type={item.type} title={item.title} />
          </List>
        );
      })}
    </ul>
  );
};

export default ListContainer;
