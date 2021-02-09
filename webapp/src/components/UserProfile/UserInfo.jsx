import React, { useState, useEffect } from "react";
import "../../styles/UserProfile.css";
import { formatUploadTime } from "../../util/DateCalc";
import { fetchUser, uploadImage, updateUserAvatar } from "../../util/Endpoints";
import { useRouteMatch } from "react-router-dom";
import LoadingSpinner from "../Misc/LoadingSpinner";

export default function UserInfo({numCreated, numCompleted, setPublicFacing, publicFacing}) {
  const match = useRouteMatch();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    fetchUserInfo();
  }, [match.params.userId]);

  const fetchUserInfo = async () => {
    try {
      const res = await fetchUser(match.params.userId);
      setDate(formatUploadTime(res.data.createdOn));
      setName(res.data.name);
      if (res.data.avatarUrl) setAvatarUrl(res.data.avatarUrl);
      setLoading(false);
    } catch (err) {
      alert("No User Info Found");
    }
  };

  const handleUserPhotoFile = async (e) => {
    e.preventDefault();
    setUserError("");
    const file = e.currentTarget.files[0];
    if (file.size > 1048576) {
      setUserError("Please upload files smaller than 1 megabyte.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    setImageLoading(true);
    try {
      const res = await uploadImage(formData);
      setAvatarUrl(res.data.imageUrl);
      await updateUserAvatar(localStorage.getItem("userId"), res.data.imageUrl);
      setImageLoading(false);
    } catch (err) {
      alert("Unable to upload image");
    }
  };

  let currentImage;
  if (imageLoading) {
    currentImage = <LoadingSpinner />;
  } else if (avatarUrl) {
    currentImage = (
      <img src={avatarUrl} alt="user-profile" id="user-profile-image"></img>
    );
  } else {
    currentImage = <p id="profile-photo-text">Add User Profile</p>;
  }

  let button;
  if (!publicFacing && localStorage.getItem("userId") === match.params.userId) {
    button = (
      <button onClick={() => setPublicFacing(!publicFacing)}>
        View Public Profile
      </button>
    );
  } else if(publicFacing && localStorage.getItem("userId") === match.params.userId) {
   button = <button onClick={() => setPublicFacing(!publicFacing)}>
      Back to Full Profile
    </button>;
  }

    if (loading) return <LoadingSpinner />;

  return (
    <div id="user-profile-header">
      <h3 id="user-profile-error">{userError}</h3>
      <input
        id="user-photo-input"
        type="file"
        onChange={handleUserPhotoFile}
        hidden
      />
      {localStorage.getItem("userId") === match.params.userId && !publicFacing ? (
        <div
          id="user-profile-image-container"
          onClick={() => document.getElementById("user-photo-input").click()}
        >
          {currentImage}
        </div>
      ) : (
        <div id="user-profile-image-container-no-hover">{currentImage}</div>
      )}
      <h1 id="user-profile-name">{name}</h1>
      <div id="user-stats">
        <h1>
          Active since <span>{date}</span>
        </h1>
        <h1><span>{numCreated}</span> lists created</h1>
        <h1><span>{numCompleted}</span> lists completed</h1>
      </div>
     {button}
    </div>
  );
}
