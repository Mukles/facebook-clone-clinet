import { useState } from "react";
interface props {
  values: {
    caption: string;
    image: null;
  };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

const Upload = ({ values, setFieldValue }: props) => {
  const [preview, setPreview] = useState<any | null>();

  function onFileLoad(event: React.SyntheticEvent<HTMLInputElement>) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList?.length && fileList != null) {
      const fileinfo: File | null = fileList.length ? fileList[0] : null;
      setFieldValue("image", fileinfo);
      setPreview(URL.createObjectURL(fileinfo as any));
    }
  }

  function onPreviewHide() {
    setFieldValue("image", null);
    setPreview(null);
  }

  return (
    <div className="dragable-container rounded mt-3">
      <div className="wrapper">
        <i className="fas fa-cloud-upload-alt"></i>
        <h4>File upload.</h4>
        <input
          onDrop={onFileLoad}
          onChange={onFileLoad}
          id="file-upload"
          name="file-upload"
          type={"file"}
        />
        {(preview || values.image) && (
          <>
            <img
              className="preview-image"
              src={preview || values.image}
              alt={preview?.name}
            />
            <button type="button" className="close" onClick={onPreviewHide}>
              <i className="fa fa-times"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
