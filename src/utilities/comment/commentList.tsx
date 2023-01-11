import { useGetCommentListsQuery } from "../../App/features/comment/commentApi";
import Comment from "./comment";
import CommentForm from "./commentForm";

interface Props {
  postId: string;
}

const Commentlist = ({ postId }: Props) => {
  const { isLoading, data: comments } = useGetCommentListsQuery({ postId });

  return (
    <>
      <CommentForm postId={postId} />

      <ul>
        {comments?.map((comment: any) => {
          return <Comment key={comment._id} {...comment} postId={postId} />;
        })}
      </ul>
    </>
  );
};

export default Commentlist;
