import img1 from "../../assets/story/1.jpg";
import img2 from "../../assets/story/2.jpg";
import img3 from "../../assets/story/3.jpg";
import img4 from "../../assets/story/4.jpg";
import img5 from "../../assets/story/5.png";

const Stories = () => {
  return (
    <>
      {[img1, img2, img3, img4, img5].map((img, i) => (
        <div className="story" key={i}>
          {/* profile */}
          <div className="story-profile">
            <img src={img} alt="profile" width={35} height={35} />
          </div>
          {/* body */}
          <div className="story-thumnail">
            <img src={img} alt="story-img" />
          </div>
          {/* footer */}
          <div className="name">Rakib Nil</div>
        </div>
      ))}
    </>
  );
};

export default Stories;
