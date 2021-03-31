import React, { useState, useEffect } from "react";
import ListUploadImage from "./ListUploadImage";
import "../../styles/createList/ListOptions.css";
import PresetOptions from "./PresetOptions/PresetOptions";

export default function ListOptions({
  setListOptions,
  presetModalOpen,
  setPresetModalOpen,
  setUserError,
}) {
  const [options, setOptions] = useState([
    { name: "", imageUrl: "" },
    { name: "", imageUrl: "" },
  ]);

  useEffect(() => {
    setListOptions(options);
  }, [options]);

  const handleOptionNameChange = (e, index) => {
    const optionsCopy = [...options];
    optionsCopy[index].name = e.currentTarget.value;
    setOptions(optionsCopy);
  };

  const deleteOptionImage = (e, index) => {
    e.preventDefault();
    const optionsCopy = [...options];
    optionsCopy[index].imageUrl = "";
    if(optionsCopy[index].imageId) optionsCopy[index].imageId = "";
    setOptions(optionsCopy);
  };

  const addOption = (e) => {
    e.preventDefault();
    const optionsCopy = [...options];
    optionsCopy.push({ name: "", imageUrl: "" });
    setOptions(optionsCopy);
  };

  const removeOption = (e, deleteIdx) => {
    e.preventDefault();
    const optionsCopy = [];
    for (let i = 0; i < options.length; i++) {
      if (i !== deleteIdx) optionsCopy.push(options[i]);
    }
    setOptions(optionsCopy);
  };

  const setOptionImage = (imageUrl, idx, imageId) => {
    const newOptions = [...options];
    newOptions[idx].imageUrl = imageUrl;
    newOptions[idx].imageId = imageId;
    setOptions(newOptions);
  };

  const optionInputs = options.map((option, i) => {
    return (
      <li className="option-input-li" key={i}>
        <div className="column-start-center" style={{ width: "55%" }}>
          <h2 className="create-list-label" style={{ marginBottom: "25px" }}>
            Option {i + 1}
          </h2>
          <input
            value={option.name}
            maxLength="32"
            className="option-input"
            type="text"
            onChange={(e) => handleOptionNameChange(e, i)}
          />
        </div>
        {option.imageUrl ? (
          <button
            onClick={(e) => deleteOptionImage(e, i)}
            className="delete-option-image site-button"
          >
            Delete Option Image
          </button>
        ) : null}
        <button
          onClick={(e) => removeOption(e, i)}
          className="remove-option site-button-3"
        >
          Remove Option {i + 1}
        </button>
        <ListUploadImage
          setUserError={setUserError}
          setOptionImage={setOptionImage}
          imgUrl={option.imageUrl}
          optionIdx={i}
        />
      </li>
    );
  });

  return (
    <div id="options-input-main-container">
      <ul id="options-input-ul">{optionInputs}</ul>
      {presetModalOpen ? ( //do we need this?
        <PresetOptions
          isOpen={true}
          setPresetModalOpen={setPresetModalOpen}
          setOptions={setOptions}
          options={options}
        />
      ) : null}
      {options.length < 8 ? (
        <div className="site-button-3" onClick={addOption}>
          + Add Option
        </div>
      ) : null}
    </div>
  );
}
