import img from "../assets/story/309455177_5413268065451119_346845499347874328_n.jpg";

const Profile = () => {
  return (
    <div className="d-flex align-items-center gap-2">
      <div className="user-profile">
        <img width={40} height={40} src={img} alt="profile" />
      </div>
      <div className="user-details">
        <p className="m-0">Mukles Ali</p>
        <p className="m-0">10 min ago</p>
      </div>
    </div>
  );
};

export default Profile;
