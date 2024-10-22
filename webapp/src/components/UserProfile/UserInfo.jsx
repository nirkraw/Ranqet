import React, { useState, useEffect } from "react";
import "../../styles/UserProfile.css";
import { formatUploadTime } from "../../util/DateCalc";
import { updateUserAvatar } from "../../util/Endpoints/UserEP";
import { uploadImage } from "../../util/Endpoints/ListEP";
import { useRouteMatch, useHistory } from "react-router-dom";
import LoadingSpinner from "../Misc/LoadingSpinner";
import { getCacheId } from "../../util/getCacheId";
import useCache from "../../util/useCache";
import { fetchUser } from "../../util/Endpoints/UserEP";

export default function UserInfo({ lists }) {
  const history = useHistory();
  const match = useRouteMatch();
  const [userError, setUserError] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [rankTotals, setRankTotal] = useState("");
  const [userInfoCacheId] = useCache({
    fn: fetchUser,
    args: [match.params.userId],
  });

  //when userInfoCacheId is change update userInfo accordingly
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem(userInfoCacheId)));
  }, [userInfoCacheId]);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      total += list.numCompletions;
    }
    setRankTotal(total);
  }, []);

  if(!userInfo) return <LoadingSpinner />
  const { username, createdOn, avatarUrl } = userInfo;

  const handleUserPhotoFile = async (e) => {
    e.preventDefault();
    setUserError("");
    const file = e.currentTarget.files[0];
    if (file.size > 1048576) {
      setUserError("Please upload files smaller than 1 megabyte.");
      return;
    }
    setImageLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    // upload image and update the cache
    try {
      const res = await uploadImage(formData);
      updateUserAvatar(localStorage.getItem("userId"), res.data.imageUrl);
      const userInfoCopy = JSON.parse(JSON.stringify(userInfo));
      userInfoCopy.avatarUrl = res.data.imageUrl;
      const cacheId = getCacheId(fetchUser, [localStorage.getItem("userId")]);
      localStorage.setItem(cacheId, JSON.stringify(userInfoCopy));
      window.dispatchEvent(new Event("changeProfilePicture")); // in navbar, to update profile pic
      setUserInfo(userInfoCopy);
      setImageLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  let currentImage;
  if (imageLoading) {
    currentImage = <LoadingSpinner />;
  } else if (avatarUrl) { //if we have image
    currentImage = (
      <img src={avatarUrl} alt="user-profile" id="user-profile-image"></img>
    );
  } else if (localStorage.getItem("userId") === match.params.userId) { // if we don't have an image
    currentImage = (
      <p
        onClick={() => document.getElementById("user-photo-input").click()}
        className="site-button"
      >
        Add Avatar
      </p>
    );
  }

  return (
    <div className="user-info-main-container justify-start-center">
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
      <div className="name-and-joined ">
        <h1 id="user-profile-name">{username}</h1>
        <h1 id="user-profile-joined">
          Joined <span>{formatUploadTime(createdOn)}</span>
        </h1>
      </div>
      <div className="user-info-data-container">
        <div className="user-info-sub-container column-start">
          <h1 className="user-info-category">Created</h1>
          <h1 className="user-info-data">{lists.length} lists</h1>
        </div>
        <div className="user-info-sub-container column-start">
          <h1 className="user-info-category">Lists Ranked By</h1>
          <h1 className="user-info-data">{rankTotals} people</h1>
        </div>
      </div>
    </div>
  );
}
