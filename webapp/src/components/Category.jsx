import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import LoadingSpinner from "./Misc/LoadingSpinner";
import { fetchCategoryList } from "../util/Endpoints/ListEP";
import ListIndex from "./ListIndex";
import "../styles/Category.css";
import { ListCategoryToTitle } from "../enums/ListCategory";

export default function Category({openModal}) {
  const match = useRouteMatch();
  const history = useHistory();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await fetchCategoryList(match.params.categoryType);
      setCategoryList(res.data.lists);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };


  if (loading) return <LoadingSpinner />;

  return (
    <div id="category-main-container">
      <h1 id="category-header">
        {ListCategoryToTitle[match.params.categoryType]}
      </h1>
      {categoryList.length ? (
        <ListIndex passedList={categoryList} />
      ) : (
        <div id="empty-list-container">
          <button
            className="site-button"
            onClick={() =>
              localStorage.getItem("sessionToken")
                ? history.push("/create-list")
                : openModal(["login", "/create-list"])
            }
          >
            <h1>
              Create a {ListCategoryToTitle[match.params.categoryType]} List
            </h1>
          </button>
        </div>
      )}
    </div>
  );
}
