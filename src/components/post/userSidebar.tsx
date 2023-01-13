import { FastField, Form, Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useUpdateBioMutation } from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import { IUser } from "../../types/userTypes";
import OverView from "../profile/overview";

interface Porps {
  isAdmin: boolean;
}

const ProfileSidebar = ({ isAdmin }: Porps) => {
  const [editBio, setEditBio] = useState(false);
  const [updateBio, { isLoading, isError }] = useUpdateBioMutation();
  const {
    bio,
    _id: userId,
    details,
  } = useSelector<RootState, IUser>((state) => state.auth.user);

  const onEditeable = () => {
    setEditBio(!editBio);
  };

  return (
    <div className="col-lg-5 mt-3">
      <div className="user-card">
        {(editBio || !bio) && (
          <Formik
            onSubmit={({ bio }, { resetForm }) => {
              updateBio({ userId, bio });
              setTimeout(() => {
                resetForm();
                onEditeable();
              }, 500);
            }}
            initialValues={{ bio }}
          >
            {() => {
              return (
                <Form>
                  <FastField name={"bio"}>
                    {({ field, form }: any) => {
                      return (
                        <textarea
                          {...field}
                          className="w-100 shadow"
                          {...field}
                          placeholder={"Describe who you are"}
                        />
                      );
                    }}
                  </FastField>
                  <div className="button-group">
                    <button type="reset" onClick={onEditeable}>
                      Cancel
                    </button>
                    <button type="submit">Save</button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
        {bio && !editBio && (
          <>
            <h3>Intro</h3>
            <p>{bio}</p>
          </>
        )}
        {isAdmin && !bio && <button className="edit-bio">Add bio</button>}
        {isAdmin && bio && !editBio && (
          <button className="edit-bio" onClick={onEditeable}>
            Edit bio
          </button>
        )}
        <OverView isProfile={true} />
        <Link to={"about"} className="edit-bio">
          Edit Details
        </Link>
      </div>
    </div>
  );
};

export default ProfileSidebar;
