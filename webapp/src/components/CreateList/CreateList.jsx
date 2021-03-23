import React, { useState, useEffect } from "react";
import { createList } from "../../util/Endpoints/ListEP";
import "../../styles/createList/CreateList.css";
import LoadingSpinner from "../Misc/LoadingSpinner";
import ListOptions from "./ListOptions";
import ListUploadImage from "./ListUploadImage";
import CategoriesDropdown from "./CategoriesDropdown";
import UnlistedDropdown from "./UnlistedCheckbox";
import { useHistory } from "react-router-dom";
import Tooltip from "../Tooltip";
import { clearEndpointCache } from "../../util/clearEndpointCache";
import { fetchUserPublicList } from "../../util/Endpoints/UserEP";

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
  const [presetModalOpen, setPresetModalOpen] = useState(false);
  const [savePresets, setSavePresets] = useState(false);
  const [presetTitle, setPresetTitle] = useState("");

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [userError]);

  const handleListSubmit = async (e) => {
    e.preventDefault();

    if (!listTitle) setUserError("*List must have title.");
    else if (listOptions.length < 2)
      setUserError("Please add at least two options.");
    else if (!category) setUserError("Please choose category.");
    else if (savePresets && !presetTitle)
      setUserError("Please add a preset title");
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
          category,
          presetTitle
        );
        setLoading(false);
        clearEndpointCache(fetchUserPublicList, [
          localStorage.getItem("userId"),
        ]);
        history.push(`/list/new/${res.data.id}`);
      } catch (err) {
        history.push(`/error/${err.message}`);
        console.log("ERROR ON SUBMIT");
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form id="create-list-form">
      <h1 className="create-list-title">Create List</h1>
      <div id="create-list-error-container">
        <h2 id="create-list-error">{userError}</h2>
      </div>
      <div id="create-list-info-and-image-container">
        <div id="list-info-container">
          <div id="create-list-title-div">
            <h2 className="create-list-label">Title</h2>
            <input
              id="title-input"
              maxLength="64"
              type="text"
              onChange={(e) => setListTitle(e.target.value)}
            />
          </div>
          <h2 className="create-list-label">Category</h2>
          <div className="categories-unlisted-container justify-start-center">
            <CategoriesDropdown setCategory={setCategory} />
            <UnlistedDropdown setUnlisted={setUnlisted} unlisted={unlisted} />
          </div>
          <div id="create-list-description-div">
            <h2 className="create-list-label">Description</h2>
            <textarea
              id="description-input"
              rows="3"
              maxLength="190"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <ListUploadImage
          setUserError={setUserError}
          setImgUrl={setListImgUrl}
          imgUrl={listImgUrl}
        />
      </div>
      <div id="create-list-options-div">
        <h1 className="create-list-title">List Options</h1>
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
        <ListOptions
          setListOptions={setListOptions}
          presetModalOpen={presetModalOpen}
          setPresetModalOpen={setPresetModalOpen}
          setUserError={setUserError}
        />
        <div id="infotag-and-preset-button-container">
          <label id="unlisted-label">Save Options As Preset:</label>
          <input
            type="checkbox"
            id="unlisted-input"
            name="unlisted"
            onChange={() => setSavePresets(!savePresets)}
          />
          <Tooltip helpText={"Save your options as a preset for future use"} />
        </div>
        {savePresets ? (
          <div className="preset-input-container">
            <label className="preset-input-label">Preset Name</label>
            <input
              id="preset-privacy-input"
              maxLength="32"
              type="text"
              onChange={(e) => setPresetTitle(e.target.value)}
            />
          </div>
        ) : null}
      </div>
      <button onClick={handleListSubmit} id="create-list-submit">
        Create List
      </button>
    </form>
  );
}
