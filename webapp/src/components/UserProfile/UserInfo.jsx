import React, { useState } from "react";
import "../../styles/UserProfile.css";
import { formatUploadTime } from "../../util/DateCalc";
import { updateUserAvatar } from "../../util/Endpoints/UserEP";
import { uploadImage } from "../../util/Endpoints/ListEP";
import { useRouteMatch, useHistory } from "react-router-dom";
import LoadingSpinner from "../Misc/LoadingSpinner";
// import { clearEndpointCache } from "../../util/clearEndpointCache";
import { fetchUser } from "../../util/Endpoints/UserEP";
import {getCacheId} from "../../util/getCacheId"

export default function UserInfo({numCreated}) {
  const history = useHistory();
  const match = useRouteMatch();
  const [userError, setUserError] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const userInfoCacheId = getCacheId(fetchUser, [
    localStorage.getItem("userId"),
  ]);
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem(userInfoCacheId)));
  const { name, createdOn, avatarUrl } = userInfo;

  const handleUserPhotoFile = async (e) => {
    e.preventDefault();
    // clearEndpointCache(fetchUser, [localStorage.getItem("userId")]);
    setUserError("");
    const file = e.currentTarget.files[0];
    if (file.size > 1048576) {
      setUserError("Please upload files smaller than 1 megabyte.");
      return;
    }
    setImageLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await uploadImage(formData);
      await updateUserAvatar(localStorage.getItem("userId"), res.data.imageUrl);
      const userInfoCopy = userInfo;
      userInfoCopy.avatarUrl = res.data.imageUrl;
      setUserInfo(userInfoCopy);
      setImageLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  let currentImage;
  if (imageLoading) {
    currentImage = <LoadingSpinner />;
  } else if (avatarUrl) {
    currentImage = (
      <img src={avatarUrl} alt="user-profile" id="user-profile-image"></img>
    );
  } else if (localStorage.getItem("userId") === match.params.userId) {
    currentImage = <p className="site-button">Add Avatar</p>;
  }

  return (
    <div id="user-profile-header">
      <h3 id="user-profile-error">{userError}</h3>
      <input
        id="user-photo-input"
        type="file"
        onChange={handleUserPhotoFile}
        hidden
      />
      {localStorage.getItem("userId") === match.params.userId ? (
        <div id="user-profile-image-container">
          {currentImage}
          {avatarUrl ? (
            <button
              className="update-picture site-button"
              onClick={() =>
                document.getElementById("user-photo-input").click()
              }
            >
              Update
            </button>
          ) : null}
        </div>
      ) : (
        <div id="user-profile-image-container-no-hover">{currentImage}</div>
      )}
      <h1 id="user-profile-name">{name}</h1>
      <div id="user-stats">
        <h1>
          Joined <span>{formatUploadTime(createdOn)}</span>
        </h1>
        <h1>
          <span>{numCreated}</span> lists created
        </h1>
      </div>
    </div>
  );
}
