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
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ListIndex from "./ListIndex";

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
      setInProgressLists(res.data.inProgressLists);
      setCompletedLists(res.data.completedLists);
      setCreatedLists(res.data.createdLists);
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
      <Tabs defaultActiveKey="completed" id="tabs-container">
        <Tab
          eventKey="completed"
          title="Completed"
          tabClassName="tab-container"
        >
          <ListIndex passedList={completedLists} />
        </Tab>
        <Tab eventKey="created" title="Created" tabClassName="tab-container">
          <ListIndex passedList={createdLists} />
        </Tab>
        <Tab
          eventKey="inProgress"
          title="In Progress"
          tabClassName="tab-container"
        >
          <ListIndex passedList={inProgressLists} />
        </Tab>
      </Tabs>
    </div>
  );
}
