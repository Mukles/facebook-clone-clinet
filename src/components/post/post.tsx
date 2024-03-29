import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useGetCommentListsQuery } from "../../App/features/comment/commentApi";
import { useToogleReactPostMutation } from "../../App/features/post/postApi";
import { RootState } from "../../App/store";
import angry from "../../assets/post/angery.svg";
import love from "../../assets/post/download.svg";
import haha from "../../assets/post/haha.svg";
import like from "../../assets/post/like.svg";
import sad from "../../assets/post/sad.svg";
import wow from "../../assets/post/wow.svg";
import Commentlist from "../../utilities/comment/commentList";
import DeleteConfirmation from "../../utilities/deleteConfirmation";
import Profile from "../../utilities/profile";
import ReactsPopup from "../../utilities/ReactPop";
import Option from "./option";
import PostModal from "./postModal";

interface Props {
  post?: any;
}

const reactIcons: any = {
  like,
  love,
  haha,
  wow,
  angry,
  sad,
};

const Post = ({ post }: Props) => {
  const timeRef = useRef<null | NodeJS.Timeout>(null);
  const { img, caption, _id: id, likeReact, reactCount }: any = post || {};
  const [isOpen, setOpen] = useState<boolean>(false);
  const [delteReq, setDeleteReq] = useState<boolean>(false);
  const [isEditAble, setEditAble] = useState<boolean>(false);
  const [selectReact, setSelectedReact] = useState<string>("");
  const [toggleReact, { isLoading }] = useToogleReactPostMutation();
  const [tuple, setTuple] = useState(["", selectReact]);
  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );

  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(0);
  const { isLoading: isCommentLoading, data: commentsList } =
    useGetCommentListsQuery({
      postId: id,
      page,
      skip,
    });

  const { toatalCount } = commentsList || {};

  if (tuple[1] !== selectReact) {
    setTuple([tuple[1], selectReact]);
  }

  let prevSeletedReact = tuple[0];

  const clickReactToggler = (selectReact: string) => {
    if (isLoading) return;
    selectReact ? setSelectedReact("") : setSelectedReact("like");
  };

  useEffect(() => {
    timeRef.current && clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      toggleReact({ postId: id, react: selectReact, userId });
    }, 500);

    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectReact]);

  return (
    <div className="single-post mt-4 pt-1 rounded">
      {isOpen && (
        <div
          className="w-100 h-100 position-fixed  top-0 start-0"
          onClick={() => {
            setOpen(false);
          }}
        ></div>
      )}
      {/* option */}
      <AnimatePresence>
        {isOpen && (
          <Option
            setDeleteReq={setDeleteReq}
            setEditAble={setEditAble}
            setOpen={setOpen}
          />
        )}
        {delteReq && (
          <DeleteConfirmation
            key="delete"
            setOpen={setOpen}
            setDeleteReq={setDeleteReq}
            id={id}
          />
        )}
        {isEditAble && (
          <PostModal key={"post"} post={post} setShow={setEditAble} />
        )}
      </AnimatePresence>

      {/* header */}
      <div className="profile-details d-flex align-items-center justify-content-between px-2">
        <Profile
          title={post?.title}
          createdAt={post?.createdAt}
          user={post?.user}
        />
        <button className="ellipsis-horizontal" onClick={() => setOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </button>
      </div>
      {/* post-body */}
      <div className="post-body mt-2">
        {/* title */}
        <p className="post-title px-2">{caption}</p>
        {/* image */}
        {img && <img className="w-100" src={img} alt="post" />}
      </div>
      {/* post-footer */}
      <div className="post-footer">
        <div className="d-flex justify-content-between px-2 py-3">
          <ul className="d-flex user-reactions align-items-center justify-content-center">
            <AnimatePresence>
              {Object.keys(reactCount || {})?.map(
                (react: string, i: number) => {
                  return (
                    <Fragment key={react}>
                      {reactCount &&
                      reactCount[likeReact?.react] === 1 &&
                      ((selectReact !== likeReact?.react &&
                        selectReact &&
                        react === likeReact?.react) ||
                        (!selectReact && prevSeletedReact !== selectReact)) ? (
                        <></>
                      ) : (
                        <>
                          {(reactCount[react] > 0 || react === selectReact) && (
                            <motion.li
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              key={i}
                            >
                              <img
                                src={reactIcons[react]}
                                alt={react}
                                width={20}
                                height={20}
                              />
                            </motion.li>
                          )}
                        </>
                      )}
                    </Fragment>
                  );
                }
              )}
            </AnimatePresence>
          </ul>
          <p className="total-comments m-0">
            {toatalCount ? <>{toatalCount} Comments</> : <>No Comment yet.</>}
          </p>
        </div>

        {/*react popup */}

        {/* icons */}
        <ul className="icon-wrapper d-flex justify-content-center mx-2 py-1">
          <li className="like-icon cursor-pointer flex-fill position-relative">
            <ReactsPopup
              toggleReact={toggleReact}
              isLoading={isLoading}
              setSelectedReact={setSelectedReact}
              selectReact={selectReact}
              postId={id}
              userId={userId as string}
            >
              <div
                aria-disabled={isLoading}
                onClick={() => clickReactToggler(selectReact)}
              >
                {prevSeletedReact === selectReact && !!likeReact?.react ? (
                  <>
                    <img src={reactIcons[likeReact?.react]} alt={"Mokles"} />
                    <span>{likeReact?.react}</span>
                  </>
                ) : (
                  <>
                    {prevSeletedReact !== selectReact && selectReact ? (
                      <>
                        <img src={reactIcons[selectReact]} alt={"Hi"} />
                        <span>{selectReact}</span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                          />
                        </svg>
                        <span>Like</span>
                      </>
                    )}
                  </>
                )}
              </div>
            </ReactsPopup>
          </li>
          <li className="comment-icon cursor-pointer flex-fill">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            <span>Comment</span>
          </li>
          <li className="share-icon cursor-pointer flex-fill">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
            <span>Share</span>
          </li>
        </ul>
        <Commentlist
          postId={id}
          commentsList={commentsList}
          isLoading={isCommentLoading}
          page={page}
          setPage={setPage}
          setSkip={setSkip}
        />
      </div>
    </div>
  );
};

export default Post;
