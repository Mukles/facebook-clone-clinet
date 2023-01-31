import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import {
  useCheckRequestStatusQuery,
  useCoverChangeMutation,
  useGetFriendsQuery,
  useGetMutualFriendsQuery,
  useGetReqUserQuery
} from "../App/features/user/userApi";
import { RootState } from "../App/store";
import defaultCover from "../assets/default/cover.jpg";
import defaultProfile from "../assets/default/profile.png";
import MessengerSvg from "../assets/Header/messagerSvg";
import AvaterChanged from "../components/profile-chnage/avaterChange";
import ProfileChanged from "../components/profile-chnage/profileChange";
import ProifleUpload from "../components/profile-chnage/profileUpload";
import SelectPhotos from "../components/profile-chnage/selectPhotos";
import { paths } from "../data/profile/paths";
import ProfileSkeleton from "../Skeleton/Profile-Skeleton";
import { IUser } from "../types/userTypes";
import RequestChecker from "../utilities/requestChecker";

const ProfileLayout = () => {
  const { id: userId } = useParams();
  const {
    _id,
    email,
    userName,
    profilePicture,
    converPicture,
    numberOfFriends,
  } = useSelector<RootState, IUser>((state) => state.auth.user) || {};
  const isAdmin = userId === _id;

  const { data: friendDetails, isLoading: isDetailsLoading } =
    useGetReqUserQuery(userId, {
      skip: isAdmin,
    });

  const { data: isFriend } = useCheckRequestStatusQuery(
    { sender: _id, recipient: userId },
    { skip: isAdmin }
  );

  const { data: friends, isLoading: friendsLoading } = useGetFriendsQuery(
    {
      userId,
    },
    {
      skip: !isAdmin,
    }
  );

  const { data: mutualFriends, isLoading: mutualFriendsLoading } =
    useGetMutualFriendsQuery(
      { user1Id: _id, user2Id: userId },
      { skip: isAdmin }
    );

  console.log({ mutualFriends });

  const [globalLoading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [coverPhoto, setConverPhoto] = useState<any | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<any | null>(null);
  const [isSlectedPhtosOpen, setSlectedPhtosOpen] = useState<boolean>(false);
  const [converPhotoPreview, setCoverPhotoPreview] = useState<any | null>(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<any | null>(
    null
  );
  const [
    coverChange,
    { isLoading: isCoverLoading, isSuccess: isCoverPhotoSuccess },
  ] = useCoverChangeMutation();

  const onCoverPhotoSave = () => {
    const formdata = new FormData();
    formdata.append("coverPhoto", coverPhoto);
    formdata.append("email", email as string);
    coverChange(formdata);
  
  };

  useEffect(() =>{
  if(isCoverPhotoSuccess){
    setCoverPhotoPreview(null);
    setConverPhoto(null);
  }
  }, [isCoverPhotoSuccess])

  useEffect(() => {
    if (converPhotoPreview) {
      setOpen(false);
    }
  }, [converPhotoPreview, setOpen]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeOutId);
  }, []);

  const cover = friendDetails ? friendDetails.converPicture : converPicture;
  const avater = friendDetails ? friendDetails.profilePicture : profilePicture;
  const frindesLength = friendDetails
    ? friendDetails.numberOfFriends
    : numberOfFriends;
  const friendsList = isAdmin ? friends : friendDetails?.friends;

  const isFriendOrRequestsent = isFriend && isFriend[0];

  return (
    <section id="profile">
      <div className="background-color">
        {/* save change coverphoto */}
        <AnimatePresence>
          {converPhotoPreview && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              exit={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              className="conver-photo-change d-flex justify-content-between align-items-center"
            >
              <div className="icon d-none d-md-flex">
                <i className="fas fa-globe-americas"></i>
                <p>Your cover photo is public.</p>
              </div>
              <div className="button-group">
                <button
                  type="button"
                  onClick={() => {
                    setCoverPhotoPreview(null);
                    setConverPhoto(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={isCoverLoading}
                  type="button"
                  onClick={onCoverPhotoSave}
                >
                  {isCoverLoading || isCoverPhotoSuccess ? (
                    <ThreeDots
                      height="19px"
                      width="38px"
                      radius="9"
                      color="#fff"
                      ariaLabel="three-dots-loading"
                      visible={true}
                    />
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </motion.div>
          )}
          {isProfileModalOpen && !profilePhotoPreview && (
            <ProfileChanged
              setProfileModalOpen={setProfileModalOpen}
              setProfilePhotoPreview={setProfilePhotoPreview}
              setProfilePhoto={setProfilePhoto}
            />
          )}
          {profilePhotoPreview && (
            <ProifleUpload
              setProfilePhotoPreview={setProfilePhotoPreview}
              setProfileModalOpen={setProfileModalOpen}
              profilePhotoPreview={profilePhotoPreview}
              profilePhoto={profilePhoto}
            />
          )}
        </AnimatePresence>
        <div className="container-fluid nav-top p-0">
          <div className="profile-container">
            {globalLoading ||
            isDetailsLoading ||
            friendsLoading ||
            mutualFriendsLoading ? (
              <ProfileSkeleton />
            ) : (
              <>
                <div className="cover-photo">
                  <img
                    src={converPhotoPreview || cover || defaultCover}
                    alt="conver"
                  />
                  {isAdmin && (
                    <button
                      type="button"
                      className="edit-cover"
                      onClick={() => setOpen(true)}
                    >
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
                          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                        />
                      </svg>
                      <span>Edit conver photo</span>
                    </button>
                  )}
                  <AnimatePresence>
                    {isOpen && !isSlectedPhtosOpen && (
                      <AvaterChanged
                        setOpen={setOpen}
                        setCoverPhotoPreview={setCoverPhotoPreview}
                        setConverPhoto={setConverPhoto}
                        setSlectedPhtosOpen={setSlectedPhtosOpen}
                      />
                    )}
                    {isSlectedPhtosOpen && (
                      <SelectPhotos setClose={setSlectedPhtosOpen} />
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <div className="profile-photo">
                    <div className="avater">
                      <img src={avater || defaultProfile} alt="user-profile" />
                      {isAdmin && (
                        <button
                          className="profile-change"
                          onClick={() => setProfileModalOpen(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                            <path
                              fillRule="evenodd"
                              d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    <div className="profile-details-wrapper">
                      <div>
                        <h2>{friendDetails?.userName || userName}</h2>
                        <span className="mutual-frd">
                          {frindesLength === 0 ? (
                            <>No friend yet</>
                          ) : frindesLength === 1 ? (
                            <>1 friend</>
                          ) : (
                            <>{frindesLength} friends</>
                          )}
                        </span>
                        {mutualFriends?.count > 0 && (
                          <>
                            <span className="mutual-frd">
                              {" "}
                              &#9679;{mutualFriends.count} mutual
                            </span>
                          </>
                        )}
                        <ul className="friend-list">
                          {friendsList?.map((item: any, i: number) => {
                            const { _id, profilePicture, userName } = item;
                            return (
                              <li key={i}>
                                <Link to={`/profile/${_id}`}>
                                  <img
                                    src={profilePicture || defaultProfile}
                                    alt="friend"
                                    title={userName}
                                  />
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="position-relative mt-2 mt-sm-0">
                        {isAdmin ? (
                          <>
                            <button className="add-story profile-button">
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
                                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>Add Story</span>
                            </button>
                            <button className="edit-profile profile-button">
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
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                />
                              </svg>

                              <span>Edit profile</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <RequestChecker
                              sender={_id as string}
                              recipient={userId as string}
                              data={isFriendOrRequestsent}
                            />
                            <Link
                              to={`/messenger/${userId}`}
                              className="edit-profile profile-button"
                            >
                              <MessengerSvg />
                              <span>Message</span>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="portal"></div>

                  <div className="nav-bottom mx-3 mt-3 mt-lg-4 d-flex justify-content-between align-items-center">
                    <ul className="d-flex">
                      {paths.map((path, idx) => (
                        <li key={idx} className={path?.className}>
                          <NavLink
                            key={idx}
                            end={true}
                            className={({ isActive }) =>
                              isActive ? "active" : ""
                            }
                            to={path.href}
                          >
                            {path.text}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                    <button className="more">
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
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="profile-container pb-4">
          <div className="row">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileLayout;
