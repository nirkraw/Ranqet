import React, { useState } from "react";
import { createList, uploadImage } from "../../util/Endpoints";
import "../../styles/CreateList.css";
import ErrorPage from "../Misc/ErrorPage";
import LoadingSpinner from "../Misc/LoadingSpinner";
import UploadImage from "./UploadImage";
import OptionInputs from "./OptionInputs";
import { useHistory } from "react-router-dom";

export default function CreateList() {
  const history = useHistory();
  const [listTitle, setListTitle] = useState("");
  const [description, setDescription] = useState("");
  const [unlisted, setUnlisted] = useState(false);
  const [listImgUrl, setListImgUrl] = useState("");
  const [options, setOptions] = useState([
    { name: "", photoUrl: "" },
    { name: "", photoUrl: "" },
    { name: "", photoUrl: "" },
    { name: "", photoUrl: "" },
    { name: "", photoUrl: "" },
    { name: "", photoUrl: "" },
    { name: "", photoUrl: "" },
    { name: "", photoUrl: "" },
  ]);
  const [userError, setUserError] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [currModalOptionIdx, setCurrModalOptionIdx] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleListPhotoFile = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    const file = e.currentTarget.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await uploadImage(formData);
      setListImgUrl(res.data.imageUrl);
    } catch (err) {
      setUserError(
        "Image could not be uploaded. Please refresh and try again."
      );
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
    setImageLoading(false);
  };

  const handleSubmit = async () => {
    let totalOptions = 0;
    for (let i = 0; i < options.length; i++) {
      if (options[i].name) totalOptions++;
    }

    if (!listTitle) {
      setUserError("*List must have title.");
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    } else if (totalOptions < 2) {
      setUserError("Please add at least two options.");
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setLoading(true);
      const newOptions = [];
      const visitedOptions = new Set();
      for (let i = 0; i < options.length; i++) {
        let option = options[i];
        if (!option.name) continue;
        if (visitedOptions.has(option.name)) {
          setUserError("All options must be unique");
          setLoading(false);
          return;
        }
        visitedOptions.add(option.name);
        newOptions.push({ name: option.name, photoUrl: option.photoUrl });
      }

      const data = {
        title: listTitle,
        imageUrl: listImgUrl,
        description,
        options: newOptions,
        authorId: localStorage.getItem("userId"),
        isUnlisted: unlisted,
      };

      try {
        await createList(data);
        setLoading(false);
        history.push("/");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (error) return <ErrorPage error={error} />;
  if (loading) return <LoadingSpinner />;

  let currentImage;
  if (imageLoading) {
    currentImage = <LoadingSpinner />;
  } else if (listImgUrl) {
    currentImage = (
      <img
        src={listImgUrl}
        alt="list"
        id="list-image"
        onClick={() => document.getElementById("list-photo-input").click()}
      ></img>
    );
  } else {
    currentImage = (
      <button
        id="upload-image-button"
        onClick={() => document.getElementById("list-photo-input").click()}
      >
        Add List Image
      </button>
    );
  }

  return (
    <div id="create-list-main-div">
      <UploadImage
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        setImageLoading={setImageLoading}
        currOptionIdx={currModalOptionIdx}
        options={options}
        setOptions={setOptions}
      />
      <form id="create-list-form">
        <div id="create-list-error-container">
          <h2 id="create-list-error">{userError}</h2>
        </div>
        <div id="create-list-title-and-unlisited-container">
          <div id="create-list-title-div">
            <h2 id="title-label">List Title:</h2>
            <input
              id="title-input"
              maxLength="32"
              type="text"
              onChange={(e) => setListTitle(e.target.value)}
            />
          </div>
          <div id="unlisted-container">
            <div className="info-tag tooltip-container">
              i
              <span className="tooltiptext">
                List will not show up on any public page and can only be shared
                with a URL
              </span>
            </div>
            <label id="unlisted-label">Unlisted</label>
            <input
              type="checkbox"
              id="unlisted-input"
              name="unlisted"
              onChange={() => setUnlisted(!unlisted)}
            />
          </div>
        </div>
        <div id="create-list-image-div">
          <h2 id="image-label">List Image:</h2>
          <input
            id="list-photo-input"
            type="file"
            onChange={handleListPhotoFile}
            hidden
          />
          <div id="create-list-image-container">{currentImage}</div>
        </div>
        <div id="create-list-description-div">
          <h2 id="description-label">List Description:</h2>
          <input
            id="description-input"
            type="text"
            maxLength="120"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div id="create-list-options-div">
          <h2 id="options-label">List Options (any order):</h2>
          <OptionInputs
            options={options}
            imageLoading={imageLoading}
            setOptions={setOptions}
            setImageLoading={setImageLoading}
            setCurrModalOptionIdx={setCurrModalOptionIdx}
            setOpenModal={setOpenModal}
          />
        </div>
        <button onClick={handleSubmit} id="create-list-submit">
          Submit
        </button>
      </form>
    </div>
  );
}
