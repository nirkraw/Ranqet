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

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await fetchTopLists();
      const currNewLists = [];
      for (let i = 0; i < res.data.topLists.length; i++) {
        currNewLists.push(res.data.topLists[i]);
      }
      setNewLists(currNewLists);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <ErrorPage error={error} />;
  if (loading) return <LoadingSpinner />;

  const newListLi = newLists.map((list, i) => {
    return (
      <li className="top-lists-item">
        <NavLink className="top-lists-item-name" to={`/${list.id}/quiz`} key={i}>
          {list.title}
        </NavLink>
        <p className="top-lists-item-description">{list.description}</p>
      </li>
    );
  });

  return (
    <div id="home-main">
      <div id="top-list-container">
        <h1 id="home-title">Today's Top Lists</h1>
        <h1 id="all-list-error">{error}</h1>
        <ul id="top-list-ul">{newListLi}</ul>
      </div>
      <div id="other-container"></div>
    </div>
  );
}
