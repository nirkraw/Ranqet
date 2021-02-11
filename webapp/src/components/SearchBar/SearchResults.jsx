import React from "react";
import { useHistory } from "react-router-dom";
import "../../styles/SearchBar.css";

export default function SearchResults({ results}) {
    const history = useHistory();
    if(results.length === 0) return <div></div>;
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
      //   const res = await fetchListOptionPair(
      //     listId,
      //     localStorage.getItem("userId")
      //   );
      //   return res.data.isCompleted;
    } catch (err) {
      return false;
    }
  };

  return (
    <ul id="search-result-ul">
      {results.map((result, i) => {
        return (
          <li
            className="search-result-item"
            onClick={() => handleLink(result.id)}
            key={i}
          >
            {result.imageUrl ? (
              <img
                className="search-result-item-image"
                src={result.imageUrl}
                alt="list"
              />
            ) : (
              <div className="search-result-item-image"></div>
            )}
            <h2 className="search-result-title">{result.title}</h2>
          </li>
        );
      })}
    </ul>
  );
}
