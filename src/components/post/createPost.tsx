import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../App/store";
import EmoijSvg from "../../assets/post/emoijSvg";
import LiveSvg from "../../assets/post/liveSvg";
import SelectImgSvg from "../../assets/post/selectImgSvg";
import img from "../../assets/story/311888806_797128861505186_6075576457730166756_n.jpg";
import PostModal from "./postModal";

const CreatePost = () => {
  const [show, setShow] = useState<boolean>(false);
  const { _id } = useSelector<RootState, any>((state) => state.auth.user);

  return (
    <div className="create-post mt-3">
      <AnimatePresence initial={false}>
        {show && <PostModal setShow={setShow} />}
      </AnimatePresence>
      <div className="d-flex gap-3 profile pb-2 align-items-center">
        <Link to={`/profile/${_id}`}>
          <img width={40} height={40} src={img} alt="profile" />
        </Link>
        <div className="flex-fill" onClick={() => setShow(true)}>
          <input
            className="w-100"
            disabled
            type="text"
            name="create-post"
            id="create-post"
            placeholder="What's on your mind, Mukles?"
          />
        </div>
      </div>
      <ul className="d-flex align-items-center pt-2 icons">
        <li
          onClick={() => setShow(true)}
          className="live-video flex-fill icon d-flex"
        >
          <LiveSvg />
          <span>Live Video</span>
        </li>
        <li
          onClick={() => setShow(true)}
          className="photo flex-fill icon d-flex"
        >
          <SelectImgSvg />
          <span>Photo/Video</span>
        </li>
        <li
          onClick={() => setShow(true)}
          className="photo flex-fill d-none d-sm-flex"
        >
          <EmoijSvg />
          <span>Feeling/Activity</span>
        </li>
      </ul>
    </div>
  );
};

export default CreatePost;
