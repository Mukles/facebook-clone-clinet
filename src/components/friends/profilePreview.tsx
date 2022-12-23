import { useParams } from "react-router-dom";
import noSelected from "../../assets/default/non-selected.svg";
import Profile from "../../pages/profile";

const ProfilePreview = () => {
  const { selectedId } = useParams();
  return (
    <>
      {selectedId ? (
        <Profile selectedId={selectedId} />
      ) : (
        <div className="no-proile-selected">
          <img src={noSelected} alt="no-selected" />
          <h2>Select people's names to preview their profile.</h2>
        </div>
      )}
    </>
  );
};

export default ProfilePreview;
