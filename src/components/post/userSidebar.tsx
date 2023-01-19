import { FastField, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  useGetFriendsQuery,
  useGetMutualFriendsQuery,
  useGetReqUserQuery,
  useGetUploadedImagesQuery,
  useUpdateBioMutation,
} from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import { IUser } from "../../types/userTypes";
import OverView from "../profile/overview";

interface Porps {
  isAdmin: boolean;
}

const ProfileSidebar = ({ isAdmin }: Porps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  const { id: requestId } = useParams();
  let { bio, _id: userId } = useSelector<RootState, IUser>(
    (state) => state.auth.user
  );

  const [editBio, setEditBio] = useState(false);
  const [updateBio, { isLoading, isError }] = useUpdateBioMutation();
  const { isLoading: imagesLoading, data: images } = useGetUploadedImagesQuery({
    userId: requestId,
  });

  const { data: friendDetails, isLoading: isDetailsLoading } =
    useGetReqUserQuery(requestId, {
      skip: isAdmin,
    });

  const { data: mutualFriends, isLoading: mutualFriendsLoading } =
    useGetMutualFriendsQuery(
      { user1Id: userId, user2Id: requestId },
      { skip: isAdmin }
    );

  let { data: friends, isLoading: isFriendLoading } = useGetFriendsQuery(
    {
      userId,
    },
    { skip: !isAdmin }
  );

  bio = isAdmin ? bio : friendDetails?.bio;
  const onEditeable = () => {
    setEditBio(!editBio);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const elementTop =
        ref.current.getBoundingClientRect().top + window.pageYOffset;
      const elementBottom = elementTop + ref.current.clientHeight;
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      if (elementBottom <= scrollY + windowHeight) {
        setIsBottomVisible(true);
      } else {
        setIsBottomVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBottomVisible]);

  return (
    <div className="col-lg-5 mt-3">
      <div className="h-100">
        <div ref={ref} className={isBottomVisible ? "sticky" : ""}>
          <div className="user-card">
            <h3>Intro</h3>
            {(editBio || !bio) && isAdmin && (
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
              <div className="friends-header d-flex justify-content-between">
                <h3>Photos</h3>
                <Link to={"/"}>See all photos</Link>
              </div>

              <div className="row gy-3 gx-1 pb-2">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
