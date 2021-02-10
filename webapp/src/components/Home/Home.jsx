import React, { useState, useEffect } from "react";
import LoadingSpinner from "../Misc/LoadingSpinner";
import ErrorPage from "../Misc/ErrorPage";
import "../../styles/Home.css";
import { fetchTopLists, fetchNewLists } from "../../util/Endpoints";
import { useHistory } from "react-router-dom";
import ListIndex from "../ListIndex";
import { ListCategory, ListCategoryToTitle } from "../../enums/ListCategory";
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
      const topListsRes = await fetchTopLists();
      setTopLists(topListsRes.data.topLists);
      const newListsRes = await fetchNewLists();
      setNewLists(newListsRes.data.topLists);
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
          <p className="category-container-item"key={i} onClick={() => history.push(`/category/${category}`)}>
            {ListCategoryToTitle[category]}
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
