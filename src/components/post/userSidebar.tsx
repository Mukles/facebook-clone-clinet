import { FastField, Form, Formik } from "formik";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetFriendsQuery,
  useGetMutualFriendsQuery,
  useGetReqUserQuery,
  useGetUploadedImagesQuery,
  useUpdateBioMutation,
} from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import defaultProfile from "../../assets/default/profile.png";
import { IUser } from "../../types/userTypes";
import OverView from "../profile/overview";

interface Porps {
  isAdmin: boolean;
}

const ProfileSidebar = ({ isAdmin }: Porps) => {
  const navigate = useNavigate();
  const { id: requestId } = useParams();
  let {
    bio,
    _id: userId,
    numberOfFriends,
  } = useSelector<RootState, IUser>((state) => state.auth.user);

  const [editBio, setEditBio] = useState(false);
  const [updateBio, { isLoading }] = useUpdateBioMutation();
  const { isLoading: imagesLoading, data: images } = useGetUploadedImagesQuery({
    userId: requestId,
  });

  const { data: friendDetails } = useGetReqUserQuery(requestId, {
    skip: isAdmin,
  });

  const { data: mutualFriends, isLoading: mutualFriendsLoading } =
    useGetMutualFriendsQuery(
      { user1Id: userId, user2Id: requestId },
      { skip: isAdmin }
    );

  const { data: friends, isLoading: isFriendLoading } = useGetFriendsQuery(
    {
      userId: requestId,
    },
    { skip: isAdmin ? false : mutualFriends?.userDetails?.length > 0 }
  );

  bio = isAdmin ? bio : friendDetails?.bio;
  const friendsContainer = friends?.length
    ? friends
    : mutualFriends?.userDetails;

  const onEditeable = () => {
    setEditBio(!editBio);
  };
  const totalFriends = friendDetails?.friendDetails ?? numberOfFriends;

  return (
    <div className="col-lg-5 mt-3">
      <div className="h-100">
        <div className="sticky">
          <div className="user-card">
            <h3>Intro</h3>
            {(editBio || !bio) && !isLoading && isAdmin && (
              <Formik
                onSubmit={({ bio }, { resetForm }) => {
                  updateBio({ userId, bio });
                  setEditBio(false);
                  setTimeout(() => {
                    resetForm();
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
                        <button type="submit" disabled={isLoading}>
                          {!isLoading ? "Save" : "Saving..."}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            )}
            {bio && !editBio && (
              <>
                <p>{bio}</p>
              </>
            )}
            {isAdmin && !bio && <button className="edit-bio">Add bio</button>}
            {isAdmin && bio && !editBio && (
              <button className="edit-bio mb-3" onClick={onEditeable}>
                Edit bio
              </button>
            )}
            <OverView isProfile={true} />
            {isAdmin && (
              <Link to={"about"} className="edit-bio mt-2">
                Edit Details
              </Link>
            )}
          </div>

          <div className="user-card mt-3">
            <div className="friends">
              <div className="friends-header d-flex justify-content-between align-items-center">
                <h3>Photos</h3>
                <Link to={"/"}>See all photos</Link>
              </div>
              <div className="row gy-3 gx-1 pb-2">
                {imagesLoading ? (
                  <>
                    {Array(9)
                      .fill("")
                      .map((item: any, i: number) => {
                        return (
                          <div className="col-4" key={i}>
                            <div className="ratio ratio-1x1">
                              <div>
                                <Skeleton className="w-100 h-100" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {images?.length > 0 && (
                      <>
                        {images?.map((item: any) => {
                          return (
                            <div className="col-4" key={item?._id}>
                              <div className="ratio ratio-1x1">
                                <div>
                                  <img
                                    className="w-100 h-100"
                                    src={item?.img}
                                    alt={"friend"}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="user-card mt-3">
            <div className="friends">
              <div className="friends-header d-flex justify-content-between align-items-center">
                <div>
                  <h3>Friends</h3>
                  <p className="mt-2">
                    {isAdmin && totalFriends > 0 ? (
                      <>{totalFriends} Friends</>
                    ) : (
                      <>
                        {mutualFriends?.count > 0 && (
                          <>
                            {totalFriends} Friends ({mutualFriends?.count}{" "}
                            mutual)
                          </>
                        )}
                      </>
                    )}
                  </p>
                </div>
                <Link to={"/"}>See all friends</Link>
              </div>
              <div className="row gy-3 gx-1 pb-2">
                {mutualFriendsLoading || isFriendLoading ? (
                  <>
                    {Array(9)
                      .fill("")
                      .map((item: any, i: number) => {
                        return (
                          <div className="col-4" key={i}>
                            <div className="ratio ratio-1x1">
                              <div>
                                <Skeleton className="w-100 h-100" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {friendsContainer?.length > 0 && (
                      <>
                        {friendsContainer?.map((item: any) => {
                          const { profilePicture, userName, _id } = item || {};
                          return (
                            <div
                              onClick={() => navigate(`/profile/${_id}`)}
                              className="col-4"
                              key={item?._id}
                            >
                              <div className="ratio ratio-1x1">
                                <div>
                                  <img
                                    className="w-100 h-100"
                                    src={profilePicture || defaultProfile}
                                    alt={userName}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
