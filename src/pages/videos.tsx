import Video from "../components/video/videos";
import PrivacyScreen from "../utilities/PrivacyScreen";

const Videos = () => {
  return (
    <div className="container-folid nav-top">
      <PrivacyScreen />
      <div className="row pt-2">
        <div className="col-3 bg-primary d-none d-md-block">
          <h1>Hellow</h1>
        </div>
        <div className="col">
          <div className="d-flex flex-column gap-4 pb-3">
            <Video />
            <Video />
            <Video />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;
