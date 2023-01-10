import { FastField, Form, Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import {
  useAddCommentMutation,
  useGetCommentListsQuery,
} from "../App/features/comment/commentApi";
import { RootState } from "../App/store";
import defaultProfile from "../assets/default/profile.png";
import { IUser } from "../types/userTypes";
import TextArea from "../utilities/textArea";

interface Props {
  postId: string;
}

const Comment = ({ postId }: Props) => {
  const { _id: userId, profilePicture } = useSelector<RootState, IUser>(
    (state) => state.auth.user
  );
  const { isLoading, data: comments } = useGetCommentListsQuery({ postId });
  const [addComment, { isLoading: addLoading, data: newComment }] =
    useAddCommentMutation();
  const [preview, setPreview] = useState<any | null>();

  function onFileLoad(
    event: React.SyntheticEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList?.length && fileList != null) {
      const fileinfo: File | null = fileList.length ? fileList[0] : null;
      setFieldValue("image", fileinfo);
      setPreview(URL.createObjectURL(fileinfo as any));
    }
  }

  return (
    <>
      <Formik
        initialValues={{ comment: "", image: "" }}
        onSubmit={({ comment, image }, { resetForm, setSubmitting }) => {
          console.log("submited", comment);
          addComment({ content: comment, postId, userId, image });
          //submit the form here
          setTimeout(() => {
            resetForm();
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ submitForm, setFieldValue }) => {
          return (
            <Form className="comment comment-textarea">
              <Link to={"/"} className="profile">
                <img src={profilePicture || defaultProfile} alt="profile" />
              </Link>
              <div className="position-relative w-100">
                <div className="main">
                  <TextArea
                    setFieldValue={setFieldValue}
                    submitForm={submitForm}
                    name="comment"
                    type="comment"
                    placeholder="Write a comment..."
                  />
                  <div className="icons">
                    <button type="button">
                      <i className="fa-regular fa-face-smile"></i>
                    </button>
                    <button type="button" className="position-relative">
                      <i className="fa-regular fa-image"></i>
                      <FastField name="image">
                        {({ field }: any) => (
                          <input
                            className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                            {...field}
                            onChange={(e) => onFileLoad(e, setFieldValue)}
                            type={"file"}
                          />
                        )}
                      </FastField>
                    </button>

                    <button type="button">
                      <i className="fa-solid fa-gift"></i>
                    </button>
                    <button type="button">
                      <i className="fa-solid fa-icons"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>

      <ul>
        {comments?.map((comment: any) => {
          const { user, content, created_at, replies, _id } = comment;
          return (
            <li className="comment" key={_id}>
              <Link to={`/profile/${user._id}`} className="profile">
                <img
                  src={user.profilePicture || defaultProfile}
                  alt="profile"
                />
              </Link>
              <div className="position-relative flex-fill">
                <div className="d-flex align-items-center justify-center">
                  <div className="main">
                    <Link to={`/profile/${user._id}`}>{user.userName}</Link>
                    <p>{content}</p>
                  </div>
                  <button className="icon">
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
                  <button type="button">Replay</button>
                  <button type="button">{format(created_at)}</button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Comment;
