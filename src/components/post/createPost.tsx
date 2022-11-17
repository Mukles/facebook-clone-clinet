import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import EmoijSvg from "../../assets/post/emoijSvg";
import LiveSvg from "../../assets/post/liveSvg";
import SelectImgSvg from "../../assets/post/selectImgSvg";
import img from "../../assets/story/311888806_797128861505186_6075576457730166756_n.jpg";
import PostModal from "./postModal";

const CreatePost = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <LayoutGroup>
      <motion.div layoutId="post-modal" className="create-post mt-3">
        <AnimatePresence>
          {show && <PostModal setShow={setShow} />}
        </AnimatePresence>
        <div
          className="d-flex gap-3 profile pb-2 align-items-center"
          onClick={() => setShow(true)}
        >
          <img width={40} height={40} src={img} alt="profile" />
          <input
            disabled
            className="flex-fill"
            type="text"
            name="create-post"
            id="create-post"
            placeholder="What's on your mind, Mukles?"
          />
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
      </motion.div>
    </LayoutGroup>
  );
};

export default CreatePost;
