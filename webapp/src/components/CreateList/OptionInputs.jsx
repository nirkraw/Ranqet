import React, { useState, useEffect } from "react";
import LoadingSpinner from "../Misc/LoadingSpinner";
import UploadImage from "./UploadImage";
import "../../styles/createList/OptionInputs.css";

export default function OptionInputs({
  imageLoading,
  setListOptions,
  setImageLoading,
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
    options[currOptionIdx].name = e.currentTarget.value;
    setOptions(options);
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
    if (imageLoading && options[i].photoUrl) {
      currImg = <LoadingSpinner />;
    } else if (!imageLoading && options[i].photoUrl) {
      currImg = (
        <img
          onClick={openImageModal}
          className="option-input-image"
          optionnum={i}
          src={options[i].photoUrl}
          alt="option-preview"
        ></img>
      );
    } else {
      currImg = "Add Image";
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
        <input
          placeholder={`Option ${i + 1}`}
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
