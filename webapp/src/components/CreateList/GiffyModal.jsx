import React, { useState, useEffect } from "react";
import axios from "axios";
import Homer from "../../assets/homer-simpsons-155238_1280.png";
import "../../styles/createList/GiffyModal.css";

export default function GiffyModal({
  isOpen,
  closeModal,
  currOptionIdx,
  setOptionImage,
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
    setOptionImage(giphyUrl, currOptionIdx);
    closeModal();
  };
  if (!isOpen) return null;
  return (
    <div className="modal-background" onClick={closeModal}>
      <div
        className="modal-child column-start"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="giffy-main">
          <h1 className="giffy-header">Search Giffy</h1>
          <div className="column-center-center">
            <div className="giphy-search-container justify-center">
              <input
                id="giphy-search"
                type="text"
                onChange={(e) => setGiphySearch(e.target.value)}
              />
              <button id="giphy-search-button" onClick={searchGiphy}>
                Search
              </button>
            </div>
            <div className="giphy-image-container">
              {giphyUrl ? (
                <img src={giphyUrl} alt="giphy" id="option-giphy-image"></img>
              ) : null}
            </div>
          </div>
          <div className="exit-modal-buttons">
            <button id="exit-modal-button" onClick={closeModal}>
              Cancel
            </button>
            <button onClick={handleGiphySubmit} id="giphy-save-button">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
