import Video from "../components/video/videos";

const Videos = () => {
  return (
    <div className="container-folid mt-5 mt-5">
      <div className="row mt-5 pt-4">
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
