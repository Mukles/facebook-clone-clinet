import { FastField, Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useAddMutation } from "../../App/features/post/postApi";
import SelectImgSvg from "../../assets/post/selectImgSvg";
import profile from "../../assets/story/309455177_5413268065451119_346845499347874328_n.jpg";
import Upload from "../../utilities/upload";
import { postSchema } from "../../validation/postValidation";

const PostModal = ({ setShow }: any) => {
  const limit = 500;
  let prevText = "";
  const [isShowImgUploader, setShowImgUploader] = useState<boolean>(false);
  const [addPost, { isLoading, isError, isSuccess, data }] = useAddMutation();

  function onTextChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
    from: any
  ) {
    const textarea = event.target;
    const text = textarea.value;
    const name = textarea.name;
    from.form.setFieldValue(name, text);
    adjustHeight(text, textarea);
    adjustFont(text, textarea);
  }

  function adjustHeight(value: string, textarea: HTMLTextAreaElement) {
    if (value.length > prevText.length) {
      textarea.style.height = Math.min(textarea.scrollHeight, limit) + "px";
    } else {
      textarea.style.height = "100%";
    }
    prevText = value;
  }

  function adjustFont(value: string, textarea: HTMLTextAreaElement) {
    textarea.style.fontSize = value.length > 38 ? "14px" : "24px";
  }

  return (
    <motion.div className="overlay py-5">
      <motion.div
        className="post-modal shadow-lg py-2"
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%", transition: { duration: 0.2 } }}
        transition={{
          type: "spring",
          stiffness: 130,
          bounce: 1,
          damping: 13,
          duration: 0.5,
          mass: 1,
          restDelta: 1,
        }}
      >
        <Formik
          initialValues={{
            caption: "",
            image: null,
          }}
          validationSchema={postSchema}
          onSubmit={({ image, caption }) => {
            const formData = new FormData();
            formData.append("img", image || "");
            formData.append("caption", caption);
            addPost(formData);
          }}
        >
          {({ values, setValues, setFieldValue }) => {
            return (
              <Form>
                <div className="post-header px-3 position-relative py-2">
                  <h3 className="text-cetner">Create Post</h3>
                  <button className="close" onClick={() => setShow(false)}>
                    <i className="fa fa-times"></i>
                  </button>
                </div>
                <hr className="m-0" />
                <div className="user-post-header d-flex gap-2 px-3 pt-3">
                  <div className="profile border-0 d-inline">
                    <img className="rounded-full" src={profile} alt={"user"} />
                  </div>
                  <div className="user-info">
                    <p className="m-0">Mukles Ali</p>
                    <button className="btn">
                      <i className="fas fa-globe-americas"></i>
                      <span className="mx-1">Public</span>
                      <i className="fas fa-caret-down"></i>
                    </button>
                  </div>
                </div>

                <div className="post-body px-3">
                  <FastField name="caption">
                    {(from: any) => {
                      return (
                        <textarea
                          className="w-100"
                          {...from.field}
                          onChange={(event) => onTextChange(event, from)}
                          placeholder={`What's on your mind, Mukles`}
                        />
                      );
                    }}
                  </FastField>

                  <AnimatePresence>
                    {isShowImgUploader && (
                      <Upload values={values} setFieldValue={setFieldValue} />
                    )}
                  </AnimatePresence>
                </div>
                <div className="post-footer my-3 d-flex justify-content-between align-items-center mx-3 py-2 rounded">
                  <h6 className="ps-3 mb-0">Add to your post</h6>
                  <ul className="post-footer-icons d-flex pe-3">
                    <li>
                      <button onClick={() => setShowImgUploader(true)}>
                        <SelectImgSvg />
                      </button>
                    </li>
                    <li>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button>
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
                            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                          />
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="mx-3">
                  <motion.button
                    disabled={isLoading}
                    whileTap={{ scale: 0.9 }}
                    className={`post-button w-100 d-block rounded ${
                      !(values.caption || values.image) && " disabled"
                    }`}
                  >
                    Post
                  </motion.button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </motion.div>
    </motion.div>
  );
};

export default PostModal;
