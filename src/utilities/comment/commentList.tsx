import { useState } from "react";
import { useGetCommentListsQuery } from "../../App/features/comment/commentApi";
import Comment from "./comment";
import CommentForm from "./commentForm";

interface Props {
  postId: string;
}

const Commentlist = ({ postId }: Props) => {
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(0);
  const { isLoading, data: commentsList } = useGetCommentListsQuery({
    postId,
    page,
    skip,
  });
  const { comments, size } = commentsList || {};
  const hasMore = comments?.length < size;

  const clickHanlder = () => {
    if (hasMore) {
      setSkip(comments?.length);
      setPage((page) => page + 1);
    }
  };

  return (
    <>
      <CommentForm postId={postId} page={page} />
      <ul>
        {comments?.map((comment: any) => {
          return (
            <Comment
              key={comment._id}
              {...comment}
              postId={postId}
              page={page}
            />
          );
        })}
        {hasMore && (
          <li className="comment justify-content-start">
            <button
              onClick={clickHanlder}
              type="button"
              className="border-none bg-transparent"
            >
              See more comments
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

export default Commentlist;
