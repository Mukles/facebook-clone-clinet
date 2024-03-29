import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import defaultProfile from "../../assets/default/profile.png";
import { IUser } from "../../types/userTypes";
import CommentForm from "./commentForm";
import Option from "./option";

interface Props {
  user: IUser;
  img: string;
  replies: any;
  _id: string;
  created_at: string;
  content: string;
  postId: string;
  page: number;
  children?: any;
}
const CommentBody = ({
  page,
  user,
  content,
  created_at,
  _id,
  img,
  postId,
  children,
}: Props) => {
  const button = useRef<HTMLButtonElement>(null);
  const modal = useRef<HTMLUListElement>(null);

  const [visiable, setVisiable] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const onVisiable = () => {
    setVisiable(true);
  };

  useEffect(() => {
    const handleClick = (event: any) => {
      if (
        !modal.current?.contains(event.target) &&
        !button.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", (event) => handleClick(event));

    return () =>
      document.removeEventListener("click", (event) => handleClick(event));
  }, [button, setOpen]);

  return (
    <li className="comment position-relative">
      <AnimatePresence>
        {isOpen && <Option ref={modal} setOpen={setOpen} />}
      </AnimatePresence>
      <Link to={`/profile/${user._id}`} className="profile">
        <img src={user.profilePicture || defaultProfile} alt="profile" />
      </Link>
      <div className="position-relative flex-fill">
        <div className="d-flex align-items-center justify-center">
          <div className="main">
            <Link to={`/profile/${user._id}`}>{user.userName}</Link>
            {img && <img src={img} alt="comment-img" className="d-block" />}
            <p>{content}</p>
          </div>
          <button
            ref={button}
            type="button"
            className="icon edit-button"
            onClick={() => setOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
            </svg>
          </button>
        </div>
        <div className="comment-footer">
          <button type="button">Like</button>
          <button type="button" onClick={onVisiable}>
            Replay
          </button>
          <button type="button">{format(created_at)}</button>
          {visiable && (
            <CommentForm
              page={page}
              type="replay"
              postId={postId}
              commentId={_id}
              setVisiable={setVisiable}
            />
          )}
        </div>
        <ul>{children}</ul>
      </div>
    </li>
  );
};

export default CommentBody;
