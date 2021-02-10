import React from "react";
import { useHistory, fetchListOptionPair } from "react-router-dom";

export default function SearchResults({ results }) {
  const history = useHistory();

  const handleLink = async (listId) => {
    if (!localStorage.getItem("userId")) history.push(`/${listId}/rankings`);
    else {
      if (await listIsComplete(listId)) {
        history.push(`/${listId}/rankings`);
      } else {
        history.push(`/${listId}/quiz`);
      }
    }
  };

  const listIsComplete = async (listId) => {
    try {
      const res = await fetchListOptionPair(
        listId,
        localStorage.getItem("userId")
      );
      return res.data.isCompleted;
    } catch (err) {
      return false;
    }
  };

  return (
    <ul id="search-result-ul">
      {results.map((result, i) => (
        <li
          className="search-result-item"
          onClick={() => handleLink(result.id)}
          key={i}
        >
          <img
            className="search-result-item-image"
            src={result.image}
            alt="list"
          />
          <h2>{result.name}</h2>
        </li>
      ))}
    </ul>
  );
}
