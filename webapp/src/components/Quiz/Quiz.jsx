import React, { useEffect, useState } from "react";
import { fetchList } from "../../util/Endpoints";
import "../../styles/Quiz.css";
import QuizOptions from "./QuizOptions";
import ErrorPage from "../Misc/ErrorPage";
import LoadingSpinner from "../Misc/LoadingSpinner";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function Quiz() {
  const match  = useRouteMatch();
  const history = useHistory();
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  if(!localStorage.getItem("userId")) {
    history.push(`/${match.params.listId}/rankings`);
  }

  useEffect(() => {
   fetchCurrList();
  },[]);

  const fetchCurrList = async () => {
    try {
      const res = await fetchList(match.params.listId);
      setListName(res.data.title);
      setDescription(res.data.description);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <ErrorPage error={error} />;
  if (loading) return <LoadingSpinner />;

  return (
    <div id="quiz-main-div">
      <h1 id="main-quiz-header">{listName}</h1>
      <h2 id="main-quiz-description">{description}</h2>
      <QuizOptions listId={match.params.listId} history={history} />
      <div id="versus-container">
        <h3>VS</h3>
      </div>
    </div>
  );
}
