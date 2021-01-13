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
  },[]);

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

  return (
    <div id="home-main">
      <h1 id="home-title">Home</h1>
      <h1 id="all-list-error">{error}</h1>
      <h3>New Lists</h3>
      <ul id="top-list-ul">{newListLi}</ul>
    </div>
  );
}
