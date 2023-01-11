import { IUser } from "../../types/userTypes";
import CommentBody from "./commentBody";

interface Props {
  user: IUser;
  img: string;
  replies: any;
  _id: string;
  created_at: string;
  content: string;
  postId: string;
}

const Comment = (details: Props) => {
  return (
    <CommentBody {...details} key={details._id}>
      {details.replies?.map((reply: any, index: number) => {
        return <CommentBody key={index} {...reply} _id={details._id} />;
      })}
    </CommentBody>
  );
};

export default Comment;
