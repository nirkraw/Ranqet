import React, { useState, useEffect } from "react";
import "../../styles/UserProfile.css";
import { formatUploadTime } from "../../util/DateCalc";
import { fetchUser, updateUserAvatar } from "../../util/Endpoints/UserEP";
import { uploadImage } from "../../util/Endpoints/ListEP";
import { useRouteMatch, useHistory } from "react-router-dom";
import LoadingSpinner from "../Misc/LoadingSpinner";
import useEndpoint from "./useEndpoint";

export default function UserInfo({ numCreated }) {
  const history = useHistory();
  const match = useRouteMatch();
  const [user, loadingOrError] = useEndpoint(fetchUser, [match.params.userId]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    if (loadingOrError === "loading") setLoading(true);
    else if (loadingOrError === "Not loading") setLoading(false);
    else history.push(`/error/${loadingOrError}`);

    if (user) {
      setDate(formatUploadTime(user.createdOn));
      setName(user.name);
      if (user.avatarUrl) setAvatarUrl(user.avatarUrl);
    }
  }, [loadingOrError, user]);

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
          Joined <span>{date}</span>
        </h1>
        <h1>
          <span>{numCreated}</span> lists created
        </h1>
      </div>
    </div>
  );
}
