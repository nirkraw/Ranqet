import React, { useState, useEffect } from "react";
import LoadingSpinner from "../Misc/LoadingSpinner";
import "../../styles/Home.css";
import { fetchTopLists } from "../../util/Endpoints";
import { useHistory } from "react-router-dom";
import ErrorPage from "../Misc/ErrorPage";
import ListIndex from "../ListIndex";
import { ListCategory } from "../../enums/ListCategory";
import NewLists from "./NewLists";

export default function Home() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topLists, setTopLists] = useState([]);
  const [newLists, setNewLists] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await fetchTopLists();
      setTopLists(res.data.topLists);
      setNewLists(res.data.topLists)
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };


  if (error) return <ErrorPage error={error} />;
  if (loading) return <LoadingSpinner />;

  return (
    <div id="home-main">
      <div id="category-container">
        {ListCategory.map((category, i) => (
          <p key={i} onClick={() => history.push(`/category/${category}`)}>
            {category}
          </p>
        ))}
      </div>
      <div id="top-and-new-lists-container">
        <div id="top-list-container">
          <h1 id="home-title">Today's Top Lists</h1>
          <h1 id="all-list-error">{error}</h1>
          <ListIndex passedList={topLists}/>
        </div>
        <NewLists newLists={newLists} />
      </div>
    </div>
  );
}
