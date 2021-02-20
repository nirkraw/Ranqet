import React, { useState, useEffect } from "react";
import LoadingSpinner from "../Misc/LoadingSpinner";
import UploadImage from "./UploadImage";
import "../../styles/createList/OptionInputs.css";
import PresetOptions from "./PresetOptions/PresetOptions";

export default function OptionInputs({
  imageLoading,
  setListOptions,
  setImageLoading,
  presetModalOpen,
  setPresetModalOpen,
}) {
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
  const [currModalOptionIdx, setCurrModalOptionIdx] = useState();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setListOptions(options);
  }, [options]);

  const handleOptionNameChange = (e) => {
    const currOptionIdx = e.currentTarget.attributes.optionnum.value;
    const optionsCopy = [...options]
    optionsCopy[currOptionIdx].name = e.currentTarget.value;
    setOptions(optionsCopy);
  };

  const openImageModal = (e) => {
    const currOptionIdx = e.currentTarget.attributes.optionnum.value;
    setCurrModalOptionIdx(currOptionIdx);
    setOpenModal(true);
  };

  const arrIdxs = [];
  for (let i = 0; i < 8; i++) {
    arrIdxs[i] = i;
  }

  const optionInputs = arrIdxs.map((i) => {
    let currImg;
    if (!options[i] || !options[i].photoUrl) {
      currImg = "Add Image";
    } else if (imageLoading) {
      currImg = <LoadingSpinner />;
    } else {
      currImg = (
        <img
          onClick={openImageModal}
          className="option-input-image"
          optionnum={i}
          src={options[i].photoUrl}
          alt="option-preview"
        ></img>
      );
    } 

    return (
      <li className="option-input-li" key={i}>
        <UploadImage
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          setImageLoading={setImageLoading}
          currOptionIdx={currModalOptionIdx}
          options={options}
          setOptions={setOptions}
        />
        <PresetOptions
          isOpen={presetModalOpen}
          setPresetModalOpen={setPresetModalOpen}
          setOptions={setOptions}
          options={options}
        />
        <input
          placeholder={`Option ${i + 1}`}
          value={options[i].name}
          maxLength="32"
          optionnum={i}
          className="option-input"
          type="text"
          onChange={handleOptionNameChange}
        />
        <div
          className="option-input-add-image"
          optionnum={i}
          onClick={openImageModal}
        >
          {currImg}
        </div>
      </li>
    );
  });

  return <ul id="options-input-ul">{optionInputs}</ul>;
}
