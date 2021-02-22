import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { fetchList } from "../../util/Endpoints/ListEP";
import ErrorPage from "../Misc/ErrorPage";
import LoadingSpinner from "../Misc/LoadingSpinner";

export default function ListCompleted() {
  const history = useHistory();
  const match = useRouteMatch();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurrList();
  }, []);

  const fetchCurrList = () => {
    try {
      fetchList();
      setLoading(false);
    } catch (err) {}
  };

  if (error) return <ErrorPage error={error} />;
  if (loading) return <LoadingSpinner />;

  return <div>
      <div>
          
      </div>
  </div>;
}
