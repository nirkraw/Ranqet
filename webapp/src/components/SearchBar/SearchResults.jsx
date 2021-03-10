import React from "react";
import { useHistory } from "react-router-dom";
import "../../styles/SearchBar.css";

export default function SearchResults({ results, searchWrapper, setActive, active }) {
  const history = useHistory();
  if (results.length === 0) return null;

  return (
    <ul
      className={active ? "search-result-ul active" : "search-result-ul"}
      ref={searchWrapper}
    >
      {results.map((result, i) => {
        return (
          <li
            className="search-result-item"
            onClick={
              result.isCompleted
                ? () => {
                    history.push(`/${result.id}/rankings`);
                    setActive(false);
                  }
                : () => {
                    history.push(`/${result.id}/quiz`);
                    setActive(false);
                  }
            }
            key={i}
          >
            <h2 className="search-result-title">{result.title}</h2>
            {result.imageUrl ? (
              <img
                className="search-result-item-image"
                src={result.imageUrl}
                alt="list"
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
