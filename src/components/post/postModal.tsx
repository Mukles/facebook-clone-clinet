import { motion } from "framer-motion";
import profile from "../../assets/story/309455177_5413268065451119_346845499347874328_n.jpg";

const PostModal = ({ setShow }: any) => {
  return (
    <motion.div className="overlay p-2">
      <motion.div
        className="post-modal shadow-lg py-4"
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%", transition: { duration: 0.2 } }}
        transition={{
          type: "spring",
          stiffness: 130,
          bounce: 1,
          damping: 13,
          duration: 0.5,
          mass: 1,
          restDelta: 1,
        }}
      >
        <div className="post-header px-3 d-flex justify-content-between align-items-center ">
          <h3 className="text-cetner">Create Post</h3>
          <button className="close" onClick={() => setShow(false)}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        <hr />
        <div className="user-post-header d-flex gap-2 px-3">
          <div className="profile border-0 d-inline">
            <img
              width={50}
              height={50}
              className="rounded-full"
              src={profile}
              alt={"user"}
            />
          </div>
          <div className="user-info">
            <p className="m-0">Mukles Ali</p>
            <button className="btn">
              <i className="fas fa-globe-americas"></i>
              <span className="mx-1">Public</span>
              <i className="fas fa-caret-down"></i>
            </button>
          </div>
        </div>

        <div className="post-body px-3">
          <textarea className="w-100" rows={5} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PostModal;
