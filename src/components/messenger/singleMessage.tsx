import { format } from "timeago.js";

interface justify {
  justify: "start" | "end";
  info: any;
}

const SingleMessage = ({ justify, info }: justify) => {
  const { message, createdAt } = info;
  return (
    <li className={`d-flex justify-content-${justify} single-message`}>
      <div className={justify === "end" ? "bg-blue" : "bg-gray"}>
        <p className="mb-1">{message}</p>
        <span className="ms-end d-block">{format(createdAt)}</span>
      </div>
    </li>
  );
};

export default SingleMessage;
