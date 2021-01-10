import React, { useState, useEffect } from "react";
import LoadingSpinner from "./Misc/LoadingSpinner";
import "../styles/Home.css";
import { fetchTopLists } from "../util/Endpoints";
import { NavLink } from "react-router-dom";
import ErrorPage from "./Misc/ErrorPage";

export default function Home() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([]);
   
  useEffect(() => {
    fetchLists(localStorage.getItem("userId"));
  },[]);

  const fetchLists = async () => {
      try {
      const res = await fetchTopLists();
      const lists = [];
      for (let i = 0; i < res.data.lists.length; i++) {
        lists.push(res.data.lists[i]);
      }
      setLists(lists);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <ErrorPage error={error} />
  if (loading) return <LoadingSpinner />;

  const topLists = lists.map((list, i) => {
    //add logic to switch destination to quiz if user has not taken list quiz
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
      <ul id="top-list-ul">{topLists}</ul>
    </div>
  );
}
