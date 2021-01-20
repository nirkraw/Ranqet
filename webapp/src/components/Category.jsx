import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import ErrorPage from "../Misc/ErrorPage";
import LoadingSpinner from "../Misc/LoadingSpinner";
import { fetchCategoryList, listIsComplete } from "../util/Endpoints";

export default function Category() {
  const match = useRouteMatch();
  const history = useHistory();
  const [newList, setNewList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await fetchCategoryList(match.params.categoryType);
      setNewList(res.data.newList);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLink = async (listId) => {
    if (await listIsComplete(listId)) {
      history.push(`/${listId}/rankings`);
    } else {
      history.push(`/${listId}/quiz`);
    }
  };

  if (error) return <ErrorPage error={error} />;
  if (loading) return <LoadingSpinner />;

  const newListLi = newList.map((list, i) => {
    return (
      <li
        className="category-list-item"
        key={i}
        onClick={() => handleLink(list.id)}
      >
        <div className="category-list-image-container">
          {list.imageUrl ? (
            <img src={list.imageUrl} alt="list" className="list-image"></img>
          ) : null}
        </div>
        <div className="category-list-item-name-and-description-container">
          <p className="category-list-item-name">{list.title}</p>
          <p>{list.description}</p>
          {list.numCompletions === 1 ? (
            <p className="category-list-item-num-completions">
              Taken by:
              <span className="num-completions-span">
                {list.numCompletions}
              </span>
              person
            </p>
          ) : (
            <p className="category-list-item-num-completions">
              Taken by:
              <span className="num-completions-span">
                {list.numCompletions}
              </span>
              people
            </p>
          )}
        </div>
      </li>
    );
  });

  return (
    <div>
      <h1>Welcome to {match.params.categoryType}</h1>
      <ul id="category-list-ul">{newListLi}</ul>
    </div>
  );
}
