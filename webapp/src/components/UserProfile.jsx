import React, { useState, useEffect } from "react";
import ErrorPage from "./Misc/ErrorPage";
import LoadingSpinner from "./Misc/LoadingSpinner";
import {
  fetchUser,
  fetchUserLists,
  uploadImage,
  fetchListOptionPair,
} from "../util/Endpoints";
import { useHistory } from "react-router-dom";
import "../styles/UserProfile.css";

export default function UserProfile() {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [completedLists, setCompletedLists] = useState([]);
  const [inProgressLists, setInProgressLists] = useState([]);
  const [createdLists, setCreatedLists] = useState([]);
  const [error, setError] = useState(null);
  const [userError, setUserError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetchLists();
    fetchUserInfo();
  }, []);

  const fetchLists = async () => {
    try {
      const res = await fetchUserLists(localStorage.getItem("userId"));
      const currInProgressLists = [];
      for (let i = 0; i < res.data.inProgressLists.length; i++) {
        currInProgressLists.push(res.data.inProgressLists[i]);
      }
      setInProgressLists(currInProgressLists);

      const currCompletedLists = [];
      for (let i = 0; i < res.data.completedLists.length; i++) {
        currCompletedLists.push(res.data.completedLists[i]);
      }
      setCompletedLists(currCompletedLists);

      const currCreatedLists = [];
      for (let i = 0; i < res.data.createdLists.length; i++) {
        currCreatedLists.push(res.data.createdLists[i]);
      }
      setCreatedLists(currCreatedLists);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const res = await fetchUser(localStorage.getItem("userId"));
      setName(res.data.name);
      if (res.data.avatarUrl) setAvatarUrl(res.data.avatarUrl);
      setLoading(false);
    } catch (err) {
      setError(err.message);
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
      setImageLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLink = async (listId) => {
    if (await listIsComplete(listId)) {
      history.push(`/${listId}/rankings`);
    } else {
      history.push(`/${listId}/quiz`);
    }
  };

  const listIsComplete = async (listId) => {
    try {
      const res = await fetchListOptionPair(
        listId,
        localStorage.getItem("userId")
      );
      return res.data.isCompleted;
    } catch (err) {
      return false;
    }
  };

  if (error) return <ErrorPage error={error} />;
  if (loading) return <LoadingSpinner />;

  const completedListLi = completedLists.map((list, i) => {
    return (
      <p
        className="top-lists-item-name"
        onClick={() => handleLink(list.id)}
        key={i}
      >
        {i + 1}. {list.title}
      </p>
    );
  });

  const inProgressListLi = inProgressLists.map((list, i) => {
    return (
      <p
        className="top-lists-item-name"
        onClick={() => handleLink(list.id)}
        key={i}
      >
        {i + 1}. {list.title}
      </p>
    );
  });

  const createdListLi = createdLists.map((list, i) => {
    return (
      <p
        className="top-lists-item-name"
        onClick={() => handleLink(list.id)}
        key={i}
      >
        {i + 1}. {list.title}
      </p>
    );
  });

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

  return (
    <div id="user-profile-main-container">
      <div id="user-profile-header">
        <input
          id="user-photo-input"
          type="file"
          onChange={handleUserPhotoFile}
          hidden
        />
        <div
          id="user-profile-image-container"
          onClick={() => document.getElementById("user-photo-input").click()}
        >
          {currentImage}
        </div>
        <h1 id="user-profile-name">{name}</h1>
      </div>
      <h3 id="user-profile-error">{userError}</h3>
      <div id="user-lists-container">
        <div id="user-profile-completed-lists-container">
          <h3 className="user-profile-list-category-title">Completed Lists</h3>
          <ul id="top-list-ul">{completedListLi}</ul>
        </div>
        <div id="user-profile-in-progress-lists-container">
          <h3 className="user-profile-list-category-title">
            In Progress Lists
          </h3>
          <ul id="top-list-ul">{inProgressListLi}</ul>
        </div>
        <div id="user-profile-created-lists-container">
          <h3 className="user-profile-list-category-title">Created Lists</h3>
          <ul id="top-list-ul">{createdListLi}</ul>
        </div>
      </div>
    </div>
  );
}
