import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  const [isRender, setRender] = useState(true);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(0);

  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );

  const {
    isLoading,
    isError,
    error,
    data: feeds,
  } = useGetNewsFeedQuery({ userId, skip, page });
  const { posts } = feeds || {};
  console.log({ feeds, posts });

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

          {(isLoading || loader) && isRender ? (
            <>
              {Array(3)
                .fill("")
                .map((item, i) => (
                  <PostSkeleton key={i} />
                ))}
            </>
          ) : (
            <div>
              {posts?.length > 0 ? (
                <InfiniteScroll
                  scrollThreshold={1}
                  dataLength={posts?.length}
                  next={() => {
                    setSkip(posts?.length);
                    setPage((prev) => prev + 1);
                  }}
                  hasMore={posts?.length < posts[0]?.totalCount}
                  loader={
                    <ColorRing
                      visible={true}
                      height="40"
                      width="40"
                      ariaLabel="blocks-loading"
                      wrapperClass="blocks-wrapper mx-auto d-block"
                      colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                      ]}
                    />
                  }
                >
                  {posts?.map((post: any, index: number) => {
                    return <Post key={index} post={post.friendsPosts} />;
                  })}
                </InfiniteScroll>
              ) : (
                <div className="no-more-post shadow-sm rounded create-post mt-3">
                  <h3>No more posts</h3>
                  <p>Add more friends to see more posts in your Feed.</p>
                  <Link
                    to="/friends/suggestions"
                    className="add-story profile-button"
                  >
                    <span>Find Friend</span>
                  </Link>
                </div>
              )}
            </div>
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
