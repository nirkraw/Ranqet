import React, { useState, useEffect } from "react";
import ErrorPage from "./Misc/ErrorPage";
import LoadingSpinner from "./Misc/LoadingSpinner";
import {fetchUser, fetchUserLists} from "../util/Endpoints";
import { NavLink } from "react-router-dom";

export default function UserProfile() {
  const [name, setName] = useState("");
  const [completedLists, setCompletedLists] = useState([]);
  const [inProgressLists, setInProgressLists] = useState([]);
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
      <NavLink className="list-name" to={`/${list.id}/quiz`} key={i}>
        {i + 1}: {list.title}
      </NavLink>
    );
  });

  const inProgressListLi = inProgressLists.map((list, i) => {
    return (
      <NavLink className="list-name" to={`/${list.id}/quiz`} key={i}>
        {i + 1}: {list.title}
      </NavLink>
    );
  });

  return (
    <div>
      <h1>{name}</h1>
      <h3>Completed Lists</h3>
      <ul id="top-list-ul">{completedListLi}</ul>
      <h3>In Progress Lists</h3>
      <ul id="top-list-ul">{inProgressListLi}</ul>
    </div>
  );
}