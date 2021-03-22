import React, { useState, useEffect } from "react";
import "../../styles/createList/GiffyModal.css";
import Modal from "react-modal";
import axios from "axios";
import Homer from "../../assets/homer-simpsons-155238_1280.png";
Modal.setAppElement("#root");

export default function GiffyModal({
  isOpen,
  closeModal,
  currOptionIdx,
  setImgUrl,
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
        `https://api.giphy.com/v1/gifs/search?api_key=2uYQaIZXL9LEfcul0RgyOCfJYI1o0fjr&limit=40&q=${giphySearch}`
      );
      const randNum = Math.floor(Math.random() * (40 - 1) + 1);
      setGiphyUrl(res.data.data[randNum].images.fixed_height.url);
    } catch {
      setGiphyUrl(Homer);
    }
  };

  const handleGiphySubmit = (e) => {
    e.preventDefault();
    setImgUrl(giphyUrl, currOptionIdx);
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
          </div>
          {/* <div id="file-upload-container">
            <h3 className="gifphy-and-file-title">Upload Image File</h3>
            <input id="photo-input" type="file" onChange={handlePhotoFile} />
          </div> */}
        </div>
        <div id="exit-modal-buttons">
          <button id="exit-modal-button" onClick={closeModal}>
            Cancel
          </button>
          <button onClick={handleGiphySubmit} id="giphy-save-button">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
