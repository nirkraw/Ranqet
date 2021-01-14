import React, { useState } from "react";
import { createList } from "../../util/Endpoints";
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
  const [options, setOptions] = useState([
    { name: "", photoUrl: "", file: null },
    { name: "", photoUrl: "", file: null },
    { name: "", photoUrl: "", file: null },
    { name: "", photoUrl: "", file: null },
    { name: "", photoUrl: "", file: null },
    { name: "", photoUrl: "", file: null },
    { name: "", photoUrl: "", file: null },
    { name: "", photoUrl: "", file: null },
  ]);
  const [userError, setUserError] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [currModalOptionIdx, setCurrModalOptionIdx] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = async () => {
    if (!listTitle) setUserError("*List must have title");
    else if (options.length < 2) {
      setUserError("Please add at least two options");
    } else {
      setLoading(true);
      const newOptions = [];
      const visitedOptions = new Set();
      for (let i = 0; i < options.length; i++) {
        let option = options[i];
        //allows to user to skip lines;
        if (!option.name) continue;
        if (visitedOptions.has(option.name)) {
          setUserError("All options must be unique");
          setLoading(false);
          return;
        }
        visitedOptions.add(option.name);
        let photoUrl = option.file ? option.file : option.photoUrl;
        // const formData = new FormData();
        // formData.append("title", option.title);
        // formData.append("photoUrl", photoUrl);
        // newOptions.push(formData);
        newOptions.push({ name: option.name, photoUrl });
      }

      const data = {
        title: listTitle,
        description,
        options: newOptions,
        authorId: localStorage.getItem("userId"),
        isUnlisted: unlisted
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
      <form onSubmit={handleSubmit} id="create-list-form">
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
            <label for="unlisted" id="unlisted-label">
              Unlisted
            </label>
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
          <div id="create-list-image-container">
            Add Image
          </div>
        </div>
        <div id="create-list-description-div">
          <h2 id="description-label">List Description:</h2>
          <input
            id="description-input"
            type="text"
            maxLength="64"
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
          <h2 id="create-list-error">{userError}</h2>
        </div>
        <button type="submit" id="create-list-submit">
          Submit
        </button>
      </form>
    </div>
  );
}
