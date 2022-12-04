import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetPostsQuery } from "../App/features/post/postApi";
import { RootState } from "../App/store";
import Image from "../assets/story/309455177_5413268065451119_346845499347874328_n.jpg";
import CreatePost from "../components/post/createPost";
import Post from "../components/post/post";
import WithFileUpload from "../HOC/withFileUpload";

const Profile = () => {
  const {
    _id: userId,
    email,
    userName,
  } = useSelector<RootState, any>((state) => state.auth.user);
  const { data: posts, error, isLoading } = useGetPostsQuery({ userId, email });

  return (
    <section id="profile">
      <div className="background-color">
        <div className="container-fluid nav-top p-0">
          <div className="profile-container">
            <div className="cover-photo">
              <img
                src="https://scontent.fdac1-1.fna.fbcdn.net/v/t1.6435-9/103130336_751185818958781_7428316446390233982_n.jpg?stp=dst-jpg_p180x540&_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeGmuAezhvbpdQTfuPNWMkd19UcG3qxQ8b_1RwberFDxv_wX0tlVzL5QP49cMPqoZjI50_pweGk2U737ICX1Kzh9&_nc_ohc=zgEcGBTO8KsAX-eu-z-&_nc_ht=scontent.fdac1-1.fna&oh=00_AfB50SUWSAGBtMita2MFwh-L3Yd7iwP9UHqY7As01wAXfg&oe=63AE7B1F"
                alt="conver-photo"
              />
              <button type="button" className="edit-cover">
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
                <span> Edit conver photo</span>
              </button>
            </div>
            <div className="profile-photo">
              <div className="avater">
                <img
                  src="https://scontent.fdac1-1.fna.fbcdn.net/v/t1.6435-9/103130336_751185818958781_7428316446390233982_n.jpg?stp=dst-jpg_p180x540&_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeGmuAezhvbpdQTfuPNWMkd19UcG3qxQ8b_1RwberFDxv_wX0tlVzL5QP49cMPqoZjI50_pweGk2U737ICX1Kzh9&_nc_ohc=zgEcGBTO8KsAX-eu-z-&_nc_ht=scontent.fdac1-1.fna&oh=00_AfB50SUWSAGBtMita2MFwh-L3Yd7iwP9UHqY7As01wAXfg&oe=63AE7B1F"
                  alt="conver-photo"
                />
                <button className="profile-change">
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
              </div>

              <div className="profile-details-wrapper">
                <div>
                  <h2>{userName}</h2>
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
                    <span>Add to profile</span>
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
                </div>
              </div>
            </div>
            <div className="nav-bottom mx-3 d-flex justify-content-between align-items-center">
              <ul className="d-flex">
                <li>
                  <Link to={"/post"}>Posts</Link>
                </li>

                <li>
                  <Link to={"/about"}>About</Link>
                </li>

                <li>
                  <Link to={"/Friends"}>Friends</Link>
                </li>
                <li className="d-none d-sm-block">
                  <Link to={"/Photos"}>Photos</Link>
                </li>
                <li className="d-none d-sm-block">
                  <Link to={"/videos"}>Videos</Link>
                </li>
                <li className="d-none d-md-block">
                  <Link to={"/check"}>Check-ins</Link>
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
                <button className="edit-bio">Edit bio</button>
              </div>
            </div>
            <div className="col">
              <CreatePost />
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

export default WithFileUpload(Profile);
