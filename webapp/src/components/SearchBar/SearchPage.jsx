import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import LoadingSpinner from "../Misc/LoadingSpinner";
import ListIndex from "../ListIndex";
import "../../styles/SearchPage.css";
// import {fetchResults} from "../../util/Endpoints";

export default function SearchPage() {
  const match = useRouteMatch();
  const history = useHistory();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchFullResults();
  }, []);

  const fetchFullResults = async () => {
    try {
      //   const res = fetchResults(match.params.searchVal);
      //   setResults(res.data.results);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div id="search-page-container">
      <ListIndex passedList={results} />
    </div>
  );
}
