import { FastField, Form, Formik } from "formik";
import { useCallback, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useProfileChangeMutation } from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import { toastRise } from "../../hooks/toastRise";

interface Props {
  setProfilePhotoPreview: any;
  setProfileModalOpen: any;
  profilePhotoPreview: any;
  profilePhoto: any;
}

const ProifleUpload = ({
  setProfilePhotoPreview,
  setProfileModalOpen,
  profilePhotoPreview,
  profilePhoto,
}: Props) => {
  const limit = 500;
  let prevText = "";

  function onTextChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
    from: any
  ) {
    const textarea = event.target;
    const text = textarea.value;
    const name = textarea.name;
    from.form.setFieldValue(name, text);
    adjustHeight(text, textarea);
  }

  const onClose = useCallback(() => {
    setProfilePhotoPreview(null);
    setProfileModalOpen(false);
  }, [setProfilePhotoPreview, setProfileModalOpen]);

  function adjustHeight(value: string, textarea: HTMLTextAreaElement) {
    if (value.length > prevText.length) {
      textarea.style.height = Math.min(textarea.scrollHeight, limit) + "px";
    } else {
      textarea.style.height = "100%";
    }
    prevText = value;
  }

  const dispatch = useDispatch();
  const [changeProfile, { isLoading, isError, error, isSuccess }] =
    useProfileChangeMutation();
  const { email, userName } = useSelector<RootState, any>(
    (state) => state.auth.user
  );

  useEffect(() => {
    toastRise(
      isSuccess,
      isError,
      (error as any)?.message,
      "Profile added successfully.!",
      dispatch,
      onClose
    );
  }, [isError, isSuccess, onClose, dispatch, error]);

  return (
    <div className="overlay">
      <div className="profile-changed-modal shadow rounded">
        <div className="profile-change-top">
          <h3>Update profile picture</h3>
          <button type="button" className="close" onClick={onClose}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        <Formik
          initialValues={{ caption: "" }}
          onSubmit={({ caption }) => {
            const formdata = new FormData();
            formdata.append("email", email);
            formdata.append("caption", caption);
            formdata.append("profilePhoto", profilePhoto);
            changeProfile(formdata);
          }}
        >
          {() => {
            return (
              <Form>
                <FastField name="caption">
                  {(from: any) => {
                    return (
                      <textarea
                        className="w-100"
                        {...from.field}
                        onChange={(event) => onTextChange(event, from)}
                        placeholder={`What's on your mind, ${userName}`}
                      />
                    );
                  }}
                </FastField>
                <img src={profilePhotoPreview} alt="profile-preview" />
                <div className="btn-group ms-auto">
                  <button type="reset">Cancel</button>
                  <button disabled={isLoading} type="submit">
                    {isLoading ? (
                      <ThreeDots
                        height="40"
                        width="40"
                        radius="9"
                        color="#fff"
                        ariaLabel="three-dots-loading"
                        wrapperClass="post-loader"
                        visible={true}
                      />
                    ) : (
                      "save"
                    )}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ProifleUpload;
