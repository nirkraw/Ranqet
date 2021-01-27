import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import ErrorPage from "./Misc/ErrorPage";
import LoadingSpinner from "./Misc/LoadingSpinner";
import { fetchCategoryList } from "../util/Endpoints";
import ListIndex from "./ListIndex";
import "../styles/Category.css";

export default function Category() {
  const match = useRouteMatch();
  const [categoryList, setCategoryList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await fetchCategoryList(match.params.categoryType);
      setCategoryList(res.data.topLists);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <ErrorPage error={error} />;
  if (loading) return <LoadingSpinner />;

  return (
    <div id="category-main-container">
      <h1 id="category-header">{match.params.categoryType}</h1>
      <ListIndex passedList={categoryList} />
    </div>
  );
}
