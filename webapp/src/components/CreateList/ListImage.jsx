import React, { useRef } from "react";
import { uploadImage } from "../../util/Endpoints";
import LoadingSpinner from "../Misc/LoadingSpinner";
import "../../styles/createList/ListImage.css";

export default function ListImage({
  setImageLoading,
  setUserError,
  setListImgUrl,
  imageLoading,
  listImgUrl,
}) {
  const inputFileRef = useRef(null);

  const handleListPhotoFile = async (e) => {
    e.preventDefault();
    setUserError("");
    const file = e.currentTarget.files[0];
    if (file.size > 1048576) {
      setUserError("Please upload files smaller than 1 megabyte.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    setImageLoading(true);

    try {
      const res = await uploadImage(formData);
      setListImgUrl(res.data.imageUrl);
    } catch (err) {
      setUserError(
        "Image could not be uploaded. Please refresh and try again."
      );
    }
    setImageLoading(false);
  };

  const triggerInput = (e) => {
    e.preventDefault();
    inputFileRef.current.click();
  };

  let currentImage;
  if (imageLoading) {
    currentImage = <LoadingSpinner />;
  } else if (listImgUrl) {
    currentImage = (
      <img
        src={listImgUrl}
        alt="list"
        id="list-image"
        onClick={triggerInput}
      ></img>
    );
  } else {
    currentImage = (
      <button id="upload-image-button" onClick={triggerInput}>
        Add List Image
      </button>
    );
  }

  return (
    <div id="create-list-image-div">
      <h2 id="image-label">List Image:</h2>
      <input
        id="list-photo-input"
        type="file"
        onChange={(e) => handleListPhotoFile(e)}
        hidden
        ref={inputFileRef}
      />
      <div id="create-list-image-container">{currentImage}</div>
    </div>
  );
}
