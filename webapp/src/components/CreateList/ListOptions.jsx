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
    { name: "", photoUrl: "", id: "" },
    { name: "", photoUrl: "", id: ""},
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
    optionsCopy[index].photoUrl = "";
    setOptions(optionsCopy);
  };

  const addOption = (e) => {
    e.preventDefault();
    const optionsCopy = [...options];
    optionsCopy.push({ name: "", photoUrl: "" });
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

  const setOptionImage = (imageUrl, imageId, idx) => {
    const newOptions = [...options];
    newOptions[idx].photoUrl = imageUrl;
    newOptions[idx].id = imageId;
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
        {option.photoUrl ? (
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
          imgUrl={option.photoUrl}
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
