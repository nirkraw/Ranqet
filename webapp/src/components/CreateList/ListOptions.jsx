import React, { useState, useEffect } from "react";
import ListUploadImage from "./ListUploadImage";
import "../../styles/createList/ListOptions.css";
import DeleteConfirmation from "../DeleteConfirmation";

export default function ListOptions({
  setListOptions,
  setUserError,
}) {
  const [options, setOptions] = useState([
    { name: "", imageUrl: "" },
    { name: "", imageUrl: "" },
  ]);

  // by keeping another state for options in ListOptions we can keep all our logic in the
  // same component. However in order to submit CreateList needs access to the options. So we update the CreateList option this.state.
  // everytime there is a change to ListOptions option state.
  useEffect(() => {
    setListOptions(options);
  }, [options]);

  const handleOptionNameChange = (e, index) => {
    const optionsCopy = [...options]; //deep copy in order to trigger the option state change
    optionsCopy[index].name = e.currentTarget.value;
    setOptions(optionsCopy);
  };

  const deleteOptionImage = (e, index) => {
    e.preventDefault();
    const optionsCopy = [...options]; //deep copy in order to trigger the option state change
    optionsCopy[index].imageUrl = "";
    // Since we do not store Id for giphys we only delte the imageId for uploads
    if (optionsCopy[index].imageId) optionsCopy[index].imageId = "";
    setOptions(optionsCopy);
  };

  const addOption = (e) => {
    e.preventDefault();
    const optionsCopy = [...options]; //deep copy in order to trigger the option state change
    optionsCopy.push({ name: "", imageUrl: "" });
    setOptions(optionsCopy);
  };

  const removeOption = (deleteIdx) => {
    const optionsCopy = [];
    for (let i = 0; i < options.length; i++) {
      //deep copy in order to trigger the option state change
      if (i !== deleteIdx) optionsCopy.push(options[i]);
    }
    setOptions(optionsCopy);
  };

  // imageId is used in backend for tracking and cleaning up uploads.
  // Since giphy are not stored in anything but text, we do not need to keep Id's for them.
  const setOptionImage = (imageUrl, idx, imageId) => {
    const newOptions = [...options];
    newOptions[idx].imageUrl = imageUrl;
    newOptions[idx].imageId = imageId;
    setOptions(newOptions);
  };

  const optionInputs = options.map((option, i) => {
    return (
      <li className="option-input-li" key={i}>
        <DeleteConfirmation
          parent={<div className="list-index-delete">Delete this option</div>}
          submitFunc={removeOption}
          confirmMessage="Are you sure you want to delete this option?"
          funcArgs={[i]}
        />
        <div className="justify-start" style={{ width: "100%" }}>
          <div className="column-start" style={{ width: "55%" }}>
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
          <ListUploadImage
            setUserError={setUserError}
            setOptionImage={setOptionImage}
            imgUrl={option.imageUrl}
            optionIdx={i}
            deleteImage={deleteOptionImage}
          />
        </div>
      </li>
    );
  });

  return (
    <div id="options-input-main-container">
      <ul id="options-input-ul">{optionInputs}</ul>
      {options.length < 8 ? (
        <div className="site-button-3" onClick={addOption}>
          + Add Option
        </div>
      ) : null}
    </div>
  );
}
