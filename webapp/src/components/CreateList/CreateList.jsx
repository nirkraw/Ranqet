import React, { useState, useEffect } from "react";
import { createList } from "../../util/Endpoints/ListEP";
import "../../styles/createList/CreateList.css";
import LoadingSpinner from "../Misc/LoadingSpinner";
import OptionInputs from "./OptionInputs";
import ListImage from "./ListImage";
import CategoriesDropdown from "./CategoriesDropdown";
import UnlistedDropdown from "./UnlistedCheckbox";
import SavePresetOptions from "./PresetOptions/SavePresetOptions";
import { useHistory } from "react-router-dom";
import Tooltip from "../Tooltip";

export default function CreateList() {
  const history = useHistory();
  const [listTitle, setListTitle] = useState("");
  const [description, setDescription] = useState("");
  const [unlisted, setUnlisted] = useState(false);
  const [listImgUrl, setListImgUrl] = useState("");
  const [category, setCategory] = useState("");
  const [listOptions, setListOptions] = useState([]);
  const [userError, setUserError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [presetModalOpen, setPresetModalOpen] = useState(false);
  const [savePresetModalOpen, setSavePresetModalOpen] = useState(false);

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [userError]);

  const handleListSubmit = async (e) => {
    e.preventDefault();

    if (!listTitle) setUserError("*List must have title.");
    else if (listOptions.length < 2) setUserError("Please add at least two options.");
    else if (!category) setUserError("Please choose category.");
    else {
      const visitedOptions = new Set();
      for (let i = 0; i < listOptions.length; i++) {
        let option = listOptions[i];
        if (!option.name) {
          setUserError("All options need titles");
          return;
        }
        if (visitedOptions.has(option.name)) {
          setUserError("All options must be unique");
          return;
        }
        visitedOptions.add(option.name);
      }
      try {
        setLoading(true);
        const res = await createList(
          listTitle,
          listImgUrl,
          description,
          listOptions,
          localStorage.getItem("userId"),
          unlisted,
          category
        );
        setLoading(false);
        history.push(`/list/new/${res.data.id}`);
      } catch (err) {
        history.push(`/error/${err.message}`);
      }
    }
  };

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
              onClick={(e) => {
                e.preventDefault();
                setPresetModalOpen(true);
              }}
            >
              Use Preset Options
            </button>
            <Tooltip
              helpText={
                "Prefill your options with previously made public or personal options"
              }
            />
          </div>
          <OptionInputs
            listOptions={listOptions}
            imageLoading={imageLoading}
            setListOptions={setListOptions}
            setImageLoading={setImageLoading}
            presetModalOpen={presetModalOpen}
            setPresetModalOpen={setPresetModalOpen}
          />
          <div id="infotag-and-preset-button-container">
            <button
              id="option-preset-button"
              onClick={(e) => {
                e.preventDefault();
                setSavePresetModalOpen(true);
              }}
            >
              Save Options As Preset
            </button>
            <Tooltip
              helpText={"Save your options as a preset for future use"}
            />
          </div>
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
