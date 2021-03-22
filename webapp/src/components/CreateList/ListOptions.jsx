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
    { name: "", photoUrl: "" },
    { name: "", photoUrl: "" },
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

  const setOptionImage = (url, idx) => {
    const newOptions = [...options];
    newOptions[idx].photoUrl = url;
    setOptions(newOptions);
  };

  const optionInputs = options.map((option, i) => {
    return (
      <li className="option-input-li" key={i}>
        <div className="column-start-center" style={{width:"55%"}}>
          <h2 className="create-list-label" style={{marginBottom:"25px"}}>Option {i + 1}</h2>
          <input
            value={option.name}
            maxLength="32"
            className="option-input"
            type="text"
            onChange={(e) => handleOptionNameChange(e, i)}
          />
        </div>
        {/* <button
          onClick={(e) => deleteOptionImage(e, i)}
          className="delete-option-image site-button"
        >
          Delete Option Image
        </button>
        <button
          onClick={(e) => removeOption(e, i)}
          className="remove-option site-button"
        >
          Delete Option
        </button> */}
        <ListUploadImage
          setUserError={setUserError}
          setImgUrl={setOptionImage}
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
        <button className="site-button" onClick={addOption}>
          Add Option
        </button>
      ) : null}
    </div>
  );
}
