import React, { useEffect, useState } from "react";
import { fetchList } from "../../util/Endpoints/ListEP";
import "../../styles/Quiz.css";
import QuizOptions from "./QuizOptions";
import LoadingSpinner from "../Misc/LoadingSpinner";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function Quiz() {
  const match = useRouteMatch();
  const history = useHistory();
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [votesRemaining, setVotesRemaining] = useState(1);
  const [votesCompleted, setVotesCompleted] = useState(1);

  if (!localStorage.getItem("sessionToken")) {
    history.push(`/${match.params.listId}/rankings`);
  }

  useEffect(() => {
    fetchCurrList();
  }, []);

  const fetchCurrList = async () => {
    try {
      const res = await fetchList(match.params.listId);
      setListName(res.data.title);
      setDescription(res.data.description);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div id="quiz-main-div">
      <h1 id="main-quiz-header">{listName}</h1>
      <h2 id="main-quiz-description">{description}</h2>
      <h2>{votesCompleted}/{votesCompleted}</h2>
      <div id="options-and-versus-container">
        <QuizOptions
          listId={match.params.listId}
          setVotesRemaining={setVotesRemaining}
          setVotesCompleted={setVotesCompleted}
        />
        <div id="versus-container">
          <h3>VS</h3>
        </div>
      </div>
    </div>
  );
}
