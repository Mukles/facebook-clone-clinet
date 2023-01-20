import { Outlet, useParams } from "react-router-dom";
import noSelected from "../../assets/default/non-selected.svg";

const ProfilePreview = () => {
  const { id } = useParams();
  return (
    <>
      {id ? (
        <Outlet />
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
