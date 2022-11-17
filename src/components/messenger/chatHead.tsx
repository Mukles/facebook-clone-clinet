import CallSvg from "../../assets/messenger/callSvg";
import InfoSvg from "../../assets/messenger/infoSvg";
import VideoSvg from "../../assets/messenger/videoSvg";
import profile from "../../assets/story/311888806_797128861505186_6075576457730166756_n.jpg";

const ChatHead = () => {
  return (
    <div className="d-flex justify-content-between py-2 px-2 bg-white align-items-center chathead">
      <div className="profile text-center d-flex align-items-center justify-content-center">
        <img
          className="rounded-circle"
          src={profile}
          width={45}
          height={45}
          alt="profile"
        />
      </div>
      <p className="me-auto ms-2 mb-0">Mukles Ali</p>

      <div className="icons d-flex align-items-center gap-2">
        <div className="icon">
          <CallSvg />
        </div>
        <div className="icon">
          <VideoSvg />
        </div>
        <div className="icon">
          <InfoSvg />
        </div>
      </div>
    </div>
  );
};

export default ChatHead;
