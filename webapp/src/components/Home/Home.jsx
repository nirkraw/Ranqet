import React, { useState, useEffect } from "react";
import LoadingSpinner from "../Misc/LoadingSpinner";
import "../../styles/Home.css";
import { fetchTopLists } from "../../util/Endpoints";
import { useHistory } from "react-router-dom";
import ErrorPage from "../Misc/ErrorPage";
import ListIndex from "../ListIndex";
import { ListCategory } from "../../enums/ListCategory";

export default function Home() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topLists, settopLists] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await fetchTopLists();
      settopLists(res.data.topLists);
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
      <div id="top-list-and-recommended-container">
        <div id="top-list-container">
          <h1 id="home-title">Today's Top Lists</h1>
          <h1 id="all-list-error">{error}</h1>
          <ListIndex passedList={topLists}/>
        </div>
        <div id="other-container">
          <h1 id="recomended">Recommended For You</h1>
        </div>
      </div>
    </div>
  );
}
