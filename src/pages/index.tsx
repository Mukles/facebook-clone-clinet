import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetNewsFeedQuery } from "../App/features/user/userApi";
import { RootState } from "../App/store";
import LeftSide from "../components/leftSide";
import CreatePost from "../components/post/createPost";
import Post from "../components/post/post";
import RightSide from "../components/story/right-side";
import Story from "../components/story/story";
import PostSkeleton from "../Skeleton/Post-Skeleton";
import PrivacyScreen from "../utilities/PrivacyScreen";

const Home = () => {
  const [loader, setLoader] = useState(true);
  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );

  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data: posts,
  } = useGetNewsFeedQuery(userId);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setLoader(false);
    }, 500);

    return () => clearTimeout(timeOutId);
  }, []);

  return (
    <div className="container-fluid nav-top">
      <PrivacyScreen key={"index"} />
      <div className="row justify-content-between">
        <div className="col-3 d-none d-xl-block">
          <LeftSide />
        </div>
        <div className="col-12 col-md-10 col-lg-6 mb-3 mx-auto">
          {/* sotries */}
          <div className="d-flex justify-content-center gap-2 py-2">
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
          </div>
          {/* create a new post */}
          <CreatePost />
          {/* posts */}

          {isLoading || loader ? (
            <>
              {Array(3)
                .fill("")
                .map((item, i) => (
                  <PostSkeleton key={i} />
                ))}
            </>
          ) : (
            <>
              {posts?.map((post: any, index: number) => (
                <Post key={index} post={post.friendsPosts} />
              ))}
            </>
          )}
        </div>
        <div className="col-lg-4 col-xl-3 d-none d-lg-block">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default Home;
