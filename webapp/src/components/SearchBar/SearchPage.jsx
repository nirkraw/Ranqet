import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import ErrorPage from "../Misc/ErrorPage";
import LoadingSpinner from "../Misc/LoadingSpinner";
import ListIndex from "../ListIndex";
// import {fetchResults} from "../../util/Endpoints";

export default function SearchPage() {
  const match = useRouteMatch();
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
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
      setError(err.message);
    }
  };

  if (error) return <ErrorPage error={error} />;
  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1> Results for {match.params.searchVal} </h1>
      <ListIndex passedList={results} />
    </div>
  );
}
