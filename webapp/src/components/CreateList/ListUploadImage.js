import React from "react";
import "../../styles/createList/ListUploadImage.css";

export default function ListUploadImage() {
  return (
    <div className="list-upload-image-main justify-column-center">
      <h2 className="create-list-label">Photo</h2>
      <div className="list-upload-image justify-start-center">
        <div className="list-upload-uploadImage"></div>
        <div className="list-upload-searchGiffy"></div>
      </div>
    </div>
  );
}
