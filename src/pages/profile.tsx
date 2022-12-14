import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { useGetPostsQuery } from "../App/features/post/postApi";
import {
  useCheckRequestStatusQuery,
  useCoverChangeMutation,
  useGetReqUserQuery,
} from "../App/features/user/userApi";
import { RootState } from "../App/store";
import defaultCover from "../assets/default/cover.jpg";
import defaultProfile from "../assets/default/profile.png";
import MessengerSvg from "../assets/Header/messagerSvg";
import Image from "../assets/story/309455177_5413268065451119_346845499347874328_n.jpg";
import CreatePost from "../components/post/createPost";
import Post from "../components/post/post";
import AvaterChanged from "../components/profile-chnage/avaterChange";
import EditUserDetails from "../components/profile-chnage/editUserDetails";
import ProfileChanged from "../components/profile-chnage/profileChange";
import ProifleUpload from "../components/profile-chnage/profileUpload";
import SelectPhotos from "../components/profile-chnage/selectPhotos";
import RequestChecker from "../utilities/requestChecker";

interface Props {
  selectedId?: string;
}

const Profile = ({ selectedId }: Props) => {
  const { _id, email, userName, profilePicture, converPicture } = useSelector<
    RootState,
    any
  >((state) => state.auth.user);
  const { id } = useParams();
  const userId = selectedId ?? id;
  const { data: friendDetails } = useGetReqUserQuery(userId, {
    skip: userId === _id,
  });

  const { data: isFriend } = useCheckRequestStatusQuery(
    { sender: _id, recipient: userId },
    { skip: userId === _id }
  );

  const { data: posts, error, isLoading } = useGetPostsQuery({ userId, email });
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isSlectedPhtosOpen, setSlectedPhtosOpen] = useState<boolean>(false);
  const [converPhotoPreview, setCoverPhotoPreview] = useState<any | null>(null);
  const [coverPhoto, setConverPhoto] = useState<any | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<any | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<any | null>(
    null
  );

  const [isProfileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [editDetails, setEditDetails] = useState(false);

  const [
    coverChange,
    {
      isLoading: coverLoading,
      isError: isCoverError,
      error: coverError,
      data: coverData,
    },
  ] = useCoverChangeMutation();

  const onCoverPhotoSave = () => {
    const formdata = new FormData();
    formdata.append("coverPhoto", coverPhoto);
    formdata.append("email", email);
    coverChange(formdata);
    setCoverPhotoPreview(null);
    setConverPhoto(null);
  };

  useEffect(() => {
    if (converPhotoPreview) {
      setOpen(false);
    }
  }, [converPhotoPreview, setOpen]);

  const cover = friendDetails ? friendDetails.converPicture : converPicture;
  const avater = friendDetails ? friendDetails.profilePicture : profilePicture;
  const isFriendOrRequestsent = isFriend && isFriend[0];
  const isAdmin = userId === _id;

  return (
    <section id="profile">
      <div className="background-color">
        {/* save change coverphot */}
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
                <button type="button" onClick={onCoverPhotoSave}>
                  Save Changes
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
          {editDetails && <EditUserDetails setEditClose={setEditDetails} />}
        </AnimatePresence>
        <div className="container-fluid nav-top p-0">
          <div className="profile-container">
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
                  <span className="mutual-frd">782 friends</span>
                  <ul className="friend-list">
                    <li>
                      <a href="#">
                        <img src={Image} alt="friend" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={Image} alt="friend" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={Image} alt="friend" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={Image} alt="friend" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={Image} alt="friend" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={Image} alt="friend" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
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
                        sender={_id}
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
            <div className="nav-bottom mx-3 d-flex justify-content-between align-items-center">
              <ul className="d-flex">
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to={""}
                  >
                    Posts
                  </NavLink>
                </li>

                <li>
                  <Link to={"about"}>About</Link>
                </li>

                <li>
                  <Link to={"Friends"}>Friends</Link>
                </li>
                <li className="d-none d-sm-block">
                  <Link to={"Photos"}>Photos</Link>
                </li>
                <li className="d-none d-sm-block">
                  <Link to={"videos"}>Videos</Link>
                </li>
                <li className="d-none d-md-block">
                  <Link to={"check"}>Check-ins</Link>
                </li>
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
        </div>
      </div>

      <div className="container-fluid">
        <div className="profile-container pb-4">
          <div className="row">
            <div className="col-lg-5 mt-3">
              <div className="user-card">
                <h3>Intro</h3>
                <p>
                  Be good and shall always see good in everything and everyone
                  and even in yourself.
                </p>
                {isAdmin && <button className="edit-bio">Edit bio</button>}
                <div className="user-details">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                    <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                  </svg>
                  <p>Student at Student</p>
                </div>

                <div className="user-details">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                    <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                  </svg>
                  <p>Student at Student</p>
                </div>
                <button
                  className="edit-bio mt-3"
                  onClick={() => setEditDetails(true)}
                >
                  Edit Details
                </button>
              </div>
            </div>
            <div className="col">
              {isAdmin && <CreatePost />}
              {posts?.map((post: any, index: number) => (
                <Post key={index} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
