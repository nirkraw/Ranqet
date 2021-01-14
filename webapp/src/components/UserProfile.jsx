import React, { useState, useEffect } from "react";
import ErrorPage from "./Misc/ErrorPage";
import LoadingSpinner from "./Misc/LoadingSpinner";
import { fetchUser, fetchUserLists } from "../util/Endpoints";
import { NavLink } from "react-router-dom";
import "../styles/UserProfile.css";

export default function UserProfile() {
  const [name, setName] = useState("");
  const [completedLists, setCompletedLists] = useState([]);
  const [inProgressLists, setInProgressLists] = useState([]);
  const [createdLists, setCreatedLists] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <ErrorPage error={error} />;
  if (loading) return <LoadingSpinner />;

  const completedListLi = completedLists.map((list, i) => {
    return (
      <NavLink className="top-lists-item-name" to={`/${list.id}/quiz`} key={i}>
        {i + 1}. {list.title}
      </NavLink>
    );
  });

  const inProgressListLi = inProgressLists.map((list, i) => {
    return (
      <NavLink className="top-lists-item-name" to={`/${list.id}/quiz`} key={i}>
        {i + 1}. {list.title}
      </NavLink>
    );
  });

  const createdListLi = createdLists.map((list, i) => {
    return (
      <NavLink className="top-lists-item-name" to={`/${list.id}/quiz`} key={i}>
        {i + 1}. {list.title}
      </NavLink>
    );
  });

  return (
    <div id="user-profile-main-container">
      <div id="user-profile-header">
        <div id="user-profile-image-container">+ Add Photo</div>
        <h1 id="user-profile-name">{name}</h1>
      </div>
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
