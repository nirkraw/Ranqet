import React, { useState, useEffect } from "react";
import { createList } from "../../util/Endpoints";
import "../../styles/createList/CreateList.css";
import ErrorPage from "../Misc/ErrorPage";
import LoadingSpinner from "../Misc/LoadingSpinner";
import OptionInputs from "./OptionInputs";
import ListImage from "./ListImage";
import { useHistory } from "react-router-dom";
import CategoriesDropdown from "./CategoriesDropdown";
import UnlistedDropdown from "./UnlistedCheckbox";
import SavePresetOptions from "./PresetOptions/SavePresetOptions";

export default function CreateList() {
  const history = useHistory();
  const [listTitle, setListTitle] = useState("");
  const [description, setDescription] = useState("");
  const [unlisted, setUnlisted] = useState(false);
  const [listImgUrl, setListImgUrl] = useState("");
  const [category, setCategory] = useState("");
  const [listOptions, setListOptions] = useState([]);
  const [userError, setUserError] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [presetModalOpen, setPresetModalOpen] = useState(false);
  const [savePresetModalOpen, setSavePresetModalOpen] = useState(false);

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [userError]);

  const handleListSubmit = async (e) => {
    e.preventDefault();
    let totalOptions = 0;
    for (let i = 0; i < listOptions.length; i++) {
      if (listOptions[i].name) totalOptions++;
    }

    if (!listTitle) setUserError("*List must have title.");
    else if (totalOptions < 2) setUserError("Please add at least two options.");
    else if (!category) setUserError("Please choose category.");
    else {
      setLoading(true);
      const newOptions = [];
      const visitedOptions = new Set();
      for (let i = 0; i < listOptions.length; i++) {
        let option = listOptions[i];
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
        category,
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
      <form id="create-list-form">
        <div id="create-list-error-container">
          <h2 id="create-list-error">{userError}</h2>
        </div>
        <div id="create-list-info-and-image-container">
          <div id="list-info-container">
            <div id="create-list-title-div">
              <h2 id="title-label">List Title:</h2>
              <input
                id="title-input"
                maxLength="32"
                type="text"
                onChange={(e) => setListTitle(e.target.value)}
              />
            </div>
            <div id="create-list-description-div">
              <h2 id="description-label">List Description:</h2>
              <textarea
                id="description-input"
                rows="3"
                maxLength="190"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div id="categories-unlisted-container">
              <CategoriesDropdown setCategory={setCategory} />
              <UnlistedDropdown setUnlisted={setUnlisted} unlisted={unlisted} />
            </div>
          </div>
          <ListImage
            setImageLoading={setImageLoading}
            setUserError={setUserError}
            setListImgUrl={setListImgUrl}
            imageLoading={imageLoading}
            listImgUrl={listImgUrl}
          />
        </div>
        <div id="create-list-options-div">
          <h2 id="options-label">List Options (any order):</h2>
          <div id="infotag-and-preset-button-container">
            <button
              id="option-preset-button"
              onClick={() => setPresetModalOpen(true)}
            >
              Use Preset Options
            </button>
            <div className="info-tag tooltip-container">
              <h1>?</h1>
              <span className="tooltiptext">
                Prefill your options with previously made public or personal
                options
              </span>
            </div>
          </div>
          <OptionInputs
            listOptions={listOptions}
            imageLoading={imageLoading}
            setListOptions={setListOptions}
            setImageLoading={setImageLoading}
            presetModalOpen={presetModalOpen}
            setPresetModalOpen={setPresetModalOpen}
          />
          <button
            id="option-preset-button"
            onClick={() => setSavePresetModalOpen(true)}
          >
            Save Options As Preset
          </button>
          <SavePresetOptions
            isOpen={savePresetModalOpen}
            setSavePresetModalOpen={setSavePresetModalOpen}
            options={listOptions}
          />
        </div>
        <button onClick={handleListSubmit} id="create-list-submit">
          Create List
        </button>
      </form>
    </div>
  );
}
