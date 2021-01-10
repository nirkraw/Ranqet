import React, { useState, useEffect } from "react";
import LoadingSpinner from "./Misc/LoadingSpinner";
import "../styles/Home.css";
import { fetchTopLists } from "../util/Endpoints";
import { NavLink } from "react-router-dom";
import ErrorPage from "./Misc/ErrorPage";

export default function Home() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newLists, setNewLists] = useState([]);
  const [completedLists, setCompletedLists] = useState([]);
  const [inProgressLists, setInProgressLists] = useState([]);
   
  useEffect(() => {
    fetchLists();
  },[]);

  const fetchLists = async () => {
      try {
      const res = await fetchTopLists(localStorage.getItem("userId"));
      const currNewLists = [];
      for (let i = 0; i < res.data.newLists.length; i++) {
        currNewLists.push(res.data.newLists[i]);
      }
      setNewLists(currNewLists);

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
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <ErrorPage error={error} />
  if (loading) return <LoadingSpinner />;
  const newListLi = newLists.map((list, i) => {
    return (
      <NavLink className="list-name" to={`/${list.id}/quiz`} key={i}>
        {i + 1}: {list.title}
      </NavLink>
    );
  });

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
    <div id="home-main">
      <h1 id="home-title">Home</h1>
      <h1 id="all-list-error">{error}</h1>
      <h3>New Lists</h3>
      <ul id="top-list-ul">{newListLi}</ul>
      <h3>Completed Lists</h3>
      <ul id="top-list-ul">{completedListLi}</ul>
      <h3>In Progress Lists</h3>
      <ul id="top-list-ul">{inProgressListLi}</ul>
    </div>
  );
}
