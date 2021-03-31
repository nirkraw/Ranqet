import React, { useState, useRef } from "react";
import "../../styles/createList/ListUploadImage.css";
import Web from "../../assets/web.png";
import { uploadImage } from "../../util/Endpoints/ListEP";
import Picture from "../../assets/picture.png";
import LoadingSpinner from "../Misc/LoadingSpinner";
import GiffyModal from "./GiffyModal";

export default function ListUploadImage({
  setUserError,
  setOptionImage,
  imgUrl,
  optionIdx
}) {
  const [imageLoading, setImageLoading] = useState(false);
  const [giffyModalOpen, setGiffyModalOpen] = useState(false);
  const inputFileRef = useRef(null);

  const handlePhotoFile = async (e) => {
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
      setOptionImage(res.data.imageUrl, optionIdx, res.data.imageId);
    } catch (err) {
      setUserError(
        "Image could not be uploaded. Please refresh and try again."
      );
    }
    setImageLoading(false);
  };

  let currentImage;
  if (imageLoading) {
    currentImage = (
      <div className="list-upload-image justify-start-center">
        <LoadingSpinner />
      </div>
    );
  } else if (imgUrl) {
    currentImage = (
      <div className="list-upload-image-main justify-start-center">
        <img
          src={imgUrl}
          alt="list"
          className="create-list-image"
          onClick={() => inputFileRef.current.click()}
        ></img>
      </div>
    );
  } else {
    currentImage = (
      <div className="list-upload-image justify-start-center">
        <div
          onClick={() => inputFileRef.current.click()}
          className={
            optionIdx !== undefined
              ? "list-upload-uploadImage column-center-center"
              : "list-upload-uploadImage-no-giffy column-center-center"
          }
        >
          <img
            className="list-upload-icon"
            src={Picture}
            alt="generic-icon"
          ></img>
          <p className="list-upload-type-header">Upload Image</p>
        </div>
        {optionIdx !== undefined ? (
          <div
            className="list-upload-searchGiffy column-center-center"
            onClick={() => setGiffyModalOpen(true)}
          >
            <img className="list-upload-icon-2" src={Web} alt="web"></img>
            <p className="list-upload-type-header">Search Giffy</p>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="list-upload-image-main justify-column-center">
      <h2 className="create-list-label">Photo</h2>
      <input
        id="list-photo-input"
        type="file"
        onChange={(e) => handlePhotoFile(e)}
        hidden
        ref={inputFileRef}
      />
      {currentImage}
      <GiffyModal
        isOpen={giffyModalOpen}
        closeModal={() => setGiffyModalOpen(false)}
        currOptionIdx={optionIdx}
        setOptionImage={setOptionImage}
      />
    </div>
  );
}
