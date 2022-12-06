import { motion } from "framer-motion";
import img1 from "../../assets/story/309455177_5413268065451119_346845499347874328_n.jpg";

interface Props {
  setClose: any;
}

const SelectPhotos = ({ setClose }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overlay"
      onClick={() => setClose(false)}
    >
      <div
        className="photos-wrapper rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="row">
          <div className="photos-header px-3 position-relative py-2">
            <h3 className="text-cetner">Select Photo</h3>
            <button className="close" onClick={() => setClose(false)}>
              <i className="fa fa-times"></i>
            </button>
            <div className="timeline-buttons d-flex">
              <button className="active">Recent photos</button>
              <button>Photos Albums</button>
            </div>
          </div>
          <div className="img-container row g-2">
            <div className="col-4">
              <div className="ratio ratio-16x9">
                <img className="rounded" src={img1} alt="fjasl" />
              </div>
            </div>
            <div className="col-4">
              <div className="ratio ratio-16x9">
                <img className="rounded" src={img1} alt="fjasl" />
              </div>
            </div>
            <div className="col-4">
              <div className="ratio ratio-16x9">
                <img className="rounded" src={img1} alt="fjasl" />
              </div>
            </div>
            <div className="col-4">
              <div className="ratio ratio-16x9">
                <img className="rounded" src={img1} alt="fjasl" />
              </div>
            </div>
            <div className="col-4">
              <div className="ratio ratio-16x9">
                <img className="rounded" src={img1} alt="fjasl" />
              </div>
            </div>
            <div className="col-4">
              <div className="ratio ratio-16x9">
                <img className="rounded" src={img1} alt="fjasl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SelectPhotos;
