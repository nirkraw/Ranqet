import React from "react";
import "../../styles/createList/ListUploadImage.css";
import Web from "../../assets/web.png";
import Picture from "../../assets/picture.png";

export default function ListUploadImage() {
  return (
    <div className="list-upload-image-main justify-column-center">
      <h2 className="create-list-label">Photo</h2>
      <div className="list-upload-image justify-start-center">
        <div className="list-upload-uploadImage column-center-center">
          <img className="list-upload-icon" src={Picture} alt="web"></img>
          <p className="list-upload-type-header">Upload Image</p>
        </div>
        <div className="list-upload-searchGiffy column-center-center">
          <img className="list-upload-icon-2" src={Web} alt="web"></img>
          <p className="list-upload-type-header">Search Giffy</p>
        </div>
      </div>
    </div>
  );
}
