import React, { useState, useEffect } from "react";
import LoadingSpinner from "./Misc/LoadingSpinner";
import "../styles/Home.css";
import { fetchTopLists } from "../util/Endpoints";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ErrorPage from "./Misc/ErrorPage";
import { fetchListOptionPair } from "../util/Endpoints";

export default function Home() {
  const history = useHistory();
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

  const handleLink = async (listId) => {
    if(await listIsComplete(listId)) {
      debugger
      history.push(`/${listId}/rankings`)

    } else {
      debugger
      history.push(`/${listId}/quiz`);
    }
  }

  const listIsComplete = async (listId) => {
    try {
      const res = await fetchListOptionPair(listId, localStorage.getItem("userId"));
      debugger
      return res.data.isCompleted; 
    } catch(err) {
      return false;
    }
  }

  const newListLi = newLists.map((list, i) => {
    return (
      <li className="top-lists-item" key={i}>
        <div className="top-lists-image-container">No Image</div>
        <div className="top-lists-item-name-and-description-container">
          <p className="top-lists-item-name" onClick={()=>handleLink(list.id)}>
            {list.title}
          </p>
          <p>{list.description}</p>
        </div>
      </li>
    );
  });

  if (error) return <ErrorPage error={error} />;
  if (loading) return <LoadingSpinner />;

  return (
    <div id="home-main">
      <div id="top-list-container">
        <h1 id="home-title">Today's Top Lists</h1>
        <h1 id="all-list-error">{error}</h1>
        <ul id="top-list-ul">{newListLi}</ul>
      </div>
      <div id="other-container">
        <h1 id="recomended">Recomended</h1>
      </div>
    </div>
  );
}
