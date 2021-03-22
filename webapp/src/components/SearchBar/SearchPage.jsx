import React from "react";
import { useRouteMatch } from "react-router-dom";
import ListIndex from "../ListIndex";
import "../../styles/SearchPage.css";

export default function SearchPage() {
  const match = useRouteMatch();

  return (
    <div className="search-page-container column-start">
      <h1 className="search-page-header">{match.params.searchVal}</h1>
      {localStorage.getItem("searchResults") ? <ListIndex cacheId={"searchResults"} /> : null} 
    </div>
  );
}
