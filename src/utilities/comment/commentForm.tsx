import { Form, Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useAddCommentMutation,
  useReplyCommentMutation,
} from "../../App/features/comment/commentApi";
import { RootState } from "../../App/store";
import defaultProfile from "../../assets/default/profile.png";
import { IUser } from "../../types/userTypes";  
import TextArea from "../textArea";

interface Props {
  postId: string;
  type?: "replay";
  commentId?: string;
  page: number;
  setVisiable?: any;
}

const CommentForm = ({ postId, type, commentId, page, setVisiable }: Props) => {
  const [preview, setPreview] = useState<any | null>();

  const { _id: userId, profilePicture } = useSelector<RootState, IUser>(
    (state) => state.auth.user
  );

  const onFileLoad = (
    event: React.SyntheticEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList?.length && fileList != null) {
      const fileinfo: File | null = fileList.length ? fileList[0] : null;
      setFieldValue("image", fileinfo);
      setPreview(URL.createObjectURL(fileinfo as any));
    }
  };

  const onClear = (
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    setPreview(null);
    setFieldValue("image", "");
  };

  const [addComment, { isLoading: addLoading }] = useAddCommentMutation();
  const [addReplay, { isLoading: replyLoading }] = useReplyCommentMutation();

  return (
    <Formik
      initialValues={{ comment: "", image: "" }}
      onSubmit={({ comment, image }, { resetForm, setSubmitting }) => {
        const comments = {
          content: comment,
          postId,
          userId,
          image,
          page,
        };

        if (type !== "replay") {
          if (!addLoading) {
            addComment(comments);
          }
        } else {
          setVisiable(false);
          if (!replyLoading) {
            addReplay({ ...comments, commentId });
          }
        }
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
                {preview && (
                  <div className="position-relative d-inline-block">
                    <img src={preview} alt="profile" />
                    <button
                      onClick={() => onClear(setFieldValue)}
                      type="button"
                      className="close shadow"
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                )}
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
                    <input
                      name="image"
                      title=""
                      className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(e) => onFileLoad(e, setFieldValue)}
                      type={"file"}
                    />
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
  );
};

export default CommentForm;
