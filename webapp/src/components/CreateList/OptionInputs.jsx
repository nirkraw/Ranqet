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
  ]);
  const [currModalOptionIdx, setCurrModalOptionIdx] = useState();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setListOptions(options);
  }, [options]);

  const handleOptionNameChange = (e, index) => {
    const optionsCopy = [...options];
    optionsCopy[index].name = e.currentTarget.value;
    setOptions(optionsCopy);
  };

  const openImageModal = (index) => {
    setCurrModalOptionIdx(index);
    setOpenModal(true);
  };

  const deleteOptionImage = (e, index) => {
    e.preventDefault();
    const optionsCopy = [...options];
    optionsCopy[index].photoUrl = "";
    console.log(optionsCopy);
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

  const optionInputs = options.map((option, i) => {
    let currImg;
    if (!option.photoUrl) {
      currImg = "Add Image";
    } else if (imageLoading) {
      currImg = <LoadingSpinner />;
    } else {
      currImg = (
        <img
          onClick={() => openImageModal(i)}
          className="option-input-image"
          src={option.photoUrl}
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
          value={option.name}
          maxLength="32"
          className="option-input"
          type="text"
          onChange={(e) => handleOptionNameChange(e, i)}
        />
        <button
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
        </button>
        <div
          className="option-input-add-image"
          onClick={() => openImageModal(i)}
        >
          {currImg}
        </div>
      </li>
    );
  });

  return (
    <div id="options-input-main-container">
      <ul id="options-input-ul">{optionInputs}</ul>
      {options.length < 8 ? (
        <button className="site-button" onClick={addOption}>
          Add Option
        </button>
      ) : null}
    </div>
  );
}

// export default function OptionInputs({
//   imageLoading,
//   setListOptions,
//   setImageLoading,
//   presetModalOpen,
//   setPresetModalOpen,
// }) {
//   const [options, setOptions] = useState([
//     { name: "", photoUrl: "" },
//     { name: "", photoUrl: "" },
//     { name: "", photoUrl: "" },
//     { name: "", photoUrl: "" },
//     { name: "", photoUrl: "" },
//     { name: "", photoUrl: "" },
//     { name: "", photoUrl: "" },
//     { name: "", photoUrl: "" },
//   ]);
//   const [currModalOptionIdx, setCurrModalOptionIdx] = useState();
//   const [openModal, setOpenModal] = useState(false);

//   useEffect(() => {
//     setListOptions(options);
//   }, [options]);

//   const handleOptionNameChange = (e, index) => {
//     const optionsCopy = [...options]
//     optionsCopy[index].name = e.currentTarget.value;
//     setOptions(optionsCopy);
//   };

//   const openImageModal = (index) => {
//     setCurrModalOptionIdx(index);
//     setOpenModal(true);
//   };

//   const deleteOptionImage = (e, index) => {
//     e.preventDefault();
//     const optionsCopy = [...options];
//     optionsCopy[index].photoUrl = "";
//     console.log(optionsCopy)
//     setOptions(optionsCopy);
//   };

//   const arrIdxs = [];
//   for (let i = 0; i < 8; i++) {
//     arrIdxs[i] = i;
//   }

//   const optionInputs = arrIdxs.map((i) => {
//     let currImg;
//     if (!options[i] || !options[i].photoUrl) {
//       currImg = "Add Image";
//     } else if (imageLoading) {
//       currImg = <LoadingSpinner />;
//     } else {
//       currImg = (
//         <img
//           onClick={() => openImageModal(i)}
//           className="option-input-image"
//           src={options[i].photoUrl}
//           alt="option-preview"
//         ></img>
//       );
//     }

//     return (
//       <li className="option-input-li" key={i}>
//         <UploadImage
//           isOpen={openModal}
//           closeModal={() => setOpenModal(false)}
//           setImageLoading={setImageLoading}
//           currOptionIdx={currModalOptionIdx}
//           options={options}
//           setOptions={setOptions}
//         />
//         <PresetOptions
//           isOpen={presetModalOpen}
//           setPresetModalOpen={setPresetModalOpen}
//           setOptions={setOptions}
//           options={options}
//         />
//         <input
//           placeholder={`Option ${i + 1}`}
//           value={options[i].name}
//           maxLength="32"
//           className="option-input"
//           type="text"
//           onChange={(e) => handleOptionNameChange(e, i)}
//         />
//         <button onClick={(e) => deleteOptionImage(e, i)} className="site-button">Delete Option Image</button>
//         <div
//           className="option-input-add-image"
//           onClick={() => openImageModal(i)}
//         >
//           {currImg}
//         </div>
//       </li>
//     );
//   });

//   return <ul id="options-input-ul">{optionInputs}</ul>;
// }
