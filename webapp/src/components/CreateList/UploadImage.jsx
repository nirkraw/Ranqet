import React, { useState, useEffect } from "react";
import "../../styles/UploadImage.css";
import Modal from "react-modal";
import axios from "axios";
import Homer from "../../assets/homer-simpsons-155238_1280.png";
import { uploadImage } from "../../util/Endpoints";
Modal.setAppElement("#root");

export default function UploadImage({
  isOpen,
  closeModal,
  currOptionIdx,
  setImageLoading,
  options,
  setOptions,
}) {
  const [giphySearch, setGiphySearch] = useState();
  const [giphyUrl, setGiphyUrl] = useState("");

  useEffect(() => {
    setGiphySearch("");
    setGiphyUrl("");
  }, [currOptionIdx]);

  const searchGiphy = async (e) => {
    e.preventDefault();
    if (!giphySearch) return;
    try {
      const res = await axios.get(
        `http://api.giphy.com/v1/gifs/search?api_key=2uYQaIZXL9LEfcul0RgyOCfJYI1o0fjr&limit=40&q=${giphySearch}`
      );
      const randNum = Math.floor(Math.random() * (40 - 1) + 1);
      setGiphyUrl(res.data.data[randNum].images.fixed_height.url);
    } catch {
      setGiphyUrl(Homer);
    }
  };

  const handlePhotoFile = async (e) => {
    setImageLoading(true);
    const file = e.currentTarget.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await uploadImage(formData);
      options[currOptionIdx].photoUrl = res.data.imageUrl;
      setImageLoading(false);
      closeModal();
    } catch (err) {}
  };

  const addUrlToOption = (idx, url) => {
    options[idx].photoUrl = url;
    setOptions(options);
  };

  const handleGiphySubmit = (e) => {
    e.preventDefault();
    addUrlToOption(currOptionIdx, giphyUrl);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} style={{ overlay: { backgroundColor: "grey" } }}>
      <div id="upload-image-main-container">
        <h1 id="upload-image-main-title">Choose Image</h1>
        <div id="gifphy-and-file-container">
          <div id="giphy-upload-container">
            <h3 className="gifphy-and-file-title">Search Random Giphy</h3>
            <div id="giphy-search-container">
              <input
                id="giphy-search"
                type="text"
                onChange={(e) => setGiphySearch(e.target.value)}
              />
              <button id="giphy-search-button" onClick={searchGiphy}>
                Search
              </button>
            </div>
            <div id="giphy-image-container">
              {giphyUrl ? (
                <img src={giphyUrl} alt="giphy" id="option-giphy-image"></img>
              ) : null}
            </div>
            <button onClick={handleGiphySubmit} id="giphy-save-button">
              Save
            </button>
          </div>
          <div id="file-upload-container">
            <h3 className="gifphy-and-file-title">Upload Image File</h3>
            <input id="photo-input" type="file" onChange={handlePhotoFile} />
          </div>
        </div>
        <button id="exit-modal-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}

// {
//     "Version": "2012-10-17",
//     "Statement": [
//         {
//             "Sid": "AddCannedAcl",
//             "Effect": "Allow",
//             "Principal": {
//                 "AWS": "arn:aws:iam::010330551133:user/ranker-master"
//             },
//             "Action": [
//                 "s3:PutObject",
//                 "s3:PutObjectAcl"
//             ],
//             "Resource": "arn:aws:s3:::ranker-dev/*",
//             "Condition": {
//                 "StringEquals": {
//                     "s3:x-amz-acl": "public-read"
//                 }
//             }
//         }
//     ]
// }
