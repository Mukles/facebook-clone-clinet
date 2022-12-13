import { motion } from "framer-motion";

interface Props {
  setProfileModalOpen: any;
  setProfilePhotoPreview: any;
  setProfilePhoto: any;
}

const ProfileChanged = ({
  setProfileModalOpen,
  setProfilePhotoPreview,
  setProfilePhoto,
}: Props) => {
  function onFileLoad(event: React.SyntheticEvent<HTMLInputElement>) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList?.length && fileList != null) {
      const fileinfo: File | null = fileList.length ? fileList[0] : null;
      setProfilePhoto(fileinfo);
      setProfilePhotoPreview(URL.createObjectURL(fileinfo as any));
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="overlay"
    >
      <div className="profile-changed-modal shadow rounded">
        <div className="profile-change-top">
          <h3>Update profile picture</h3>
          <button
            type="button"
            className="close"
            onClick={() => setProfileModalOpen(false)}
          >
            <i className="fa fa-times"></i>
          </button>
        </div>
        <ul className="changed-list">
          <li>
            <button type="button" className="position-relative">
              <span className="me-1">
                <i className="fa-regular fa-plus"></i>
              </span>
              <span>Upload photo</span>
              <input
                onChange={onFileLoad}
                type="file"
                title=""
                name="profile"
                className="position-absolute opacity-0 top-0 start-0 w-100 h-100"
              />
            </button>
          </li>
          <li>
            <button type="button">
              <span className="me-1">
                <i className="fa-regular fa-plus"></i>
              </span>
              <span>Upload photo</span>
            </button>
          </li>

          <li>
            <button type="button">
              <span className="me-1">
                <i className="fa-regular fa-plus"></i>
              </span>
              <span>Upload photo</span>
            </button>
          </li>
          <li>
            <button type="button">
              <span className="me-1">
                <i className="fa-regular fa-plus"></i>
              </span>
              <span>Upload photo</span>
            </button>
          </li>
          <li>
            <button type="button">
              <span className="me-1">
                <i className="fa-regular fa-plus"></i>
              </span>
              <span>Upload photo</span>
            </button>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ProfileChanged;
