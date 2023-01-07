import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../App/store";
import { Details, Types } from "../../types/userTypes";
import Add from "./add";
import Child from "./child";

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

const OverView = () => {
  const details = useSelector<RootState, Details | undefined>(
    (state) => state.auth.user.details
  );

  return (
    <div className="overview">
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
            <React.Fragment key={index}>
              <Add type={item.type} title={item.title} />
              {details![item.type].length && (
                <Child details={details![item.type]} type={type} />
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default OverView;
