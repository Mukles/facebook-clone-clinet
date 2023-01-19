import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
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

  console.log({ len: comments?.length, size, postId });

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
        {hasMore && comments?.length > 0 && (
          <li className="comment justify-content-start">
            <button
              disabled={isLoading}
              onClick={clickHanlder}
              type="button"
              className="border-none bg-transparent d-flex align-items-center justify-content-center"
            >
              See more comments
              {isLoading && (
                <TailSpin
                  height="20"
                  width="20"
                  radius="1"
                  color="#000"
                  ariaLabel="tail-spin-loading"
                  visible={true}
                  wrapperClass="d-inline-block ms-2"
                />
              )}
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

export default Commentlist;
