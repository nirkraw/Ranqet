import React, { useState } from "react";
import { createList} from "../../util/Endpoints";
import "../../styles/CreateList.css";
import ErrorPage from "../Misc/ErrorPage";
import LoadingSpinner from "../Misc/LoadingSpinner";
import UploadImage from "./UploadImage";
import OptionInputs from "./OptionInputs";
import { useHistory } from "react-router-dom";

export default function CreateList() {
  const history = useHistory();
  const [listTitle, setListTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([
    { title: "", photoUrl: "", file: null },
    { title: "", photoUrl: "", file: null },
    { title: "", photoUrl: "", file: null },
    { title: "", photoUrl: "", file: null },
    { title: "", photoUrl: "", file: null },
    { title: "", photoUrl: "", file: null },
    { title: "", photoUrl: "", file: null },
    { title: "", photoUrl: "", file: null }
  ]);
  const [userError, setUserError] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [currModalOptionIdx, setCurrModalOptionIdx] = useState();
  const [openModal, setOpenModal] = useState(false);
 
  const handleSubmit = async () => {
    if (!listTitle) setUserError("*List must have title");
    else if (options.length < 2) {
      setUserError("Please add at least two options");
    } else {
      setLoading(true);
      const newOptions = [];
      for (let i = 0; i < options.length; i++) {
        let option = options[i];
        //allows to user to skip lines;
        if (!option.title) continue;
        let photoUrl = option.file ? option.file : option.photoUrl;
        // const formData = new FormData();
        // formData.append("title", option.title);
        // formData.append("photoUrl", photoUrl);
        // newOptions.push(formData);
        newOptions.push({title: option.title, photoUrl})
      }

      const data = {
        title: listTitle,
        description,
        options: newOptions,
        authorId: localStorage.getItem("userId"),
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
      <UploadImage
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        setImageLoading={setImageLoading}
        currOptionIdx={currModalOptionIdx}
        options={options}
        setOptions={setOptions}
      />
      <form onSubmit={handleSubmit} id="create-list-form">
        <div id="create-list-title-div">
          <h2 id="title-label">List title:</h2>
          <input
            id="title-input"
            maxLength="32"
            type="text"
            onChange={(e) => setListTitle(e.target.value)}
          />
        </div>
        <div id="create-list-description-div">
          <h2 id="description-label">List Description:</h2>
          <input
            id="description-input"
            type="text"
            maxLength="64"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div id="create-list-options-div">
          <h2 id="options-label">List Options (any order):</h2>
          <OptionInputs
            options={options}
            imageLoading={imageLoading}
            setOptions={setOptions}
            setImageLoading={setImageLoading}
            setCurrModalOptionIdx={setCurrModalOptionIdx}
            setOpenModal={setOpenModal}
          />
          <h2 id="create-list-error">{userError}</h2>
        </div>
        <button type="submit" id="create-list-submit">
          Submit
        </button>
      </form>
    </div>
  );
}
