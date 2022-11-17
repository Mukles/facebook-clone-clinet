import img from "../../assets/story/311888806_797128861505186_6075576457730166756_n.jpg";

const Story = () => {
  return (
    <div className="story">
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
  );
};

export default Story;
