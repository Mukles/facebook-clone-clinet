import VideoSvg from "../assets/right-side/videoSvg";
import img1 from "../assets/story/1.jpg";
import img2 from "../assets/story/2.jpg";
import img3 from "../assets/story/3.jpg";
import img4 from "../assets/story/4.jpg";
import img5 from "../assets/story/5.png";

const ContactList = () => {
  return (
    <div className="contact-list overflow-y-auto">
      {/* contact-header */}
      <div className="contact-header d-flex justify-content-between mt-2">
        <p className="title mb-0">Contacts</p>
        {/* contact-right-side */}
        <div className="contact-icons d-flex gap-2">
          {/* single-icon */}
          <div className="icon">
            <VideoSvg />
          </div>
          {/* single-icon */}
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          {/* single-icon */}
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* contact-list */}

      <div className="active-user-list">
        {[img1, img2, img3, img4, img5].map((img, i) => (
          <div key={i} className="active-user d-flex align-items-center gap-3">
            <div className="user-profile">
              <img src={img} height={45} width={45} alt={"Profile"} />
            </div>
            <p className="mb-0">Mukles Mukles</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
