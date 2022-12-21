import noSelected from "../../assets/default/non-selected.svg";

const ProfilePreview = () => {
  return (
    <div className="no-proile-selected">
      <img src={noSelected} alt="no-selected" />
      <h2>Select people's names to preview their profile.</h2>
    </div>
  );
};

export default ProfilePreview;
