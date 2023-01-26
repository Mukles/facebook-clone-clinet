import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";
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
  const { id: userId } = useParams();
  const { _id, email } = useSelector<RootState, IUser>(
    (state) => state.auth.user
  );

  const [isRender, setRender] = useState(true);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(true);
  const isAdmin = _id === userId;

  const { data: postData, isLoading } = useGetPostsQuery({
    userId,
    email,
    page,
    skip,
  });

  const { posts, size } = postData || {};

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setLoader(false);
      setRender(false);
    }, 500);

    return () => clearTimeout(timeOutId);
  }, []);

  return (
    <>
      <ProfileSidebar isAdmin={isAdmin} />
      <div className="col">
        {isAdmin && <CreatePost />}

        {(loader || isLoading) && isRender ? (
          Array(3)
            .fill("")
            .map((item, i) => <PostSkeleton key={i} />)
        ) : (
          <>
            {posts?.length > 0 ? (
              <div>
                <InfiniteScroll
                  scrollThreshold={1}
                  dataLength={posts?.length}
                  next={() => {
                    setSkip(posts?.length);
                    setPage((prev) => prev + 1);
                  }}
                  hasMore={posts?.length < size}
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
                    return <Post key={index} post={post} />;
                  })}
                </InfiniteScroll>
              </div>
            ) : (
              <h2 className="no-post-available">No posts available</h2>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PostWrapper;
