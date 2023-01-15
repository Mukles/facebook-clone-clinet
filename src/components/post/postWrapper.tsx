import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetPostsQuery } from "../../App/features/post/postApi";
import { RootState } from "../../App/store";
import { IUser } from "../../types/userTypes";
import CreatePost from "./createPost";
import Post from "./post";
import ProfileSidebar from "./userSidebar";

const PostWrapper = () => {
  const { _id, email } = useSelector<RootState, IUser>(
    (state) => state.auth.user
  );

  const { id: userId } = useParams();
  const { data: posts, error, isLoading } = useGetPostsQuery({ userId, email });
  console.log({ posts });
  const isAdmin = _id === userId;

  return (
    <>
      <ProfileSidebar isAdmin={isAdmin} />
      <div className="col-7">
        {isAdmin && <CreatePost />}
        {posts?.map((post: any, index: number) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </>
  );
};

export default PostWrapper;
