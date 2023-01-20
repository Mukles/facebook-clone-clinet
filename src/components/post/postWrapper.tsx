import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetPostsQuery } from "../../App/features/post/postApi";
import { RootState } from "../../App/store";
import PostSkeleton from "../../Skeleton/Post-Skeleton";
import { IUser } from "../../types/userTypes";
import CreatePost from "./createPost";
import Post from "./post";
import ProfileSidebar from "./userSidebar";

const PostWrapper = () => {
  const [loader, setLoader] = useState(true);
  const { _id, email } = useSelector<RootState, IUser>(
    (state) => state.auth.user
  );

  const { id: userId } = useParams();
  const [page, setPage] = useState(0);
  const {
    data: posts,
    error,
    isLoading,
  } = useGetPostsQuery({ userId, email, page });
  const isAdmin = _id === userId;

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setLoader(false);
    }, 500);

    return () => clearTimeout(timeOutId);
  }, []);

  return (
    <>
      <ProfileSidebar isAdmin={isAdmin} />
      <div className="col">
        {isAdmin && <CreatePost />}

        {loader || isLoading ? (
          Array(3)
            .fill("")
            .map((item, i) => <PostSkeleton key={i} />)
        ) : (
          <>
            {posts.length > 0 ? (
              <div id="scrollableDiv">
                <InfiniteScroll
                  scrollThreshold={1}
                  dataLength={posts?.length}
                  next={() => setPage((prev) => prev + 1)}
                  hasMore={posts?.length}
                  loader={<h4>Loading...</h4>}
                >
                  {posts?.map((post: any, index: number) => {
                    return <Post key={index} post={post} />;
                  })}
                </InfiniteScroll>
              </div>
            ) : (
              <h2 className="text-center mt-2">No Post</h2>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PostWrapper;
