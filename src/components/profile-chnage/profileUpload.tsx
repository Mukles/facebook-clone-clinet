interface Props {
  setProfilePhotoPreview: any;
  setProfileModalOpen: any;
}

const ProifleUpload = ({
  setProfilePhotoPreview,
  setProfileModalOpen,
}: Props) => {
  return (
    <div className="overlay">
      <div className="profile-changed-modal shadow rounded">
        <div className="profile-change-top">
          <h3>Update profile picture</h3>
          <button
            type="button"
            className="close"
            onClick={() => {
              setProfilePhotoPreview(null);
              setProfileModalOpen(false);
            }}
          >
            <i className="fa fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProifleUpload;
