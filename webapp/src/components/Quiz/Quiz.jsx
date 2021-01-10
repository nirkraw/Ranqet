import React, { useEffect, useState } from "react";
import { fetchList } from "../../util/Endpoints";
import "../../styles/Quiz.css";
import QuizOptions from "./QuizOptions";
import ErrorPage from "../Misc/ErrorPage";
import LoadingSpinner from "../Misc/LoadingSpinner";

export default function Quiz({ match, history, userId }) {
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <QuizOptions listId={match.params.listId} history={history} userId={userId} />
    </div>
  );
}
