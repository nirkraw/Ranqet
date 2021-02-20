import React from "react";
import "../styles/Rankings.css";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function RankingsList({ rankings, rankingName, openModal }) {
  const history = useHistory();
  const match = useRouteMatch();

  const handleTakeQuiz = () => {
    if (localStorage.getItem("userId"))
      history.push(`/${match.params.listId}/quiz`);
    else openModal(["login", `/${match.params.listId}/quiz`]);
  };

  if (rankings.length === 0) {
    if (rankingName !== "Global Rankings") {
      return (
        <div id="ranking-main-div">
          <h2 className="ranking-header">{rankingName}</h2>
          <div className="ranking-quiz-button-container">
            <button id="rankings-quiz-button" onClick={handleTakeQuiz}>
              Take the Quiz!
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div id="ranking-main-div">
          <h2 className="ranking-header">No {rankingName} Yet</h2>
        </div>
      );
    }
  }
  return (
    <div id="ranking-main-div">
      <h2 className="ranking-header">{rankingName}</h2>
      <ul>
        {rankings.map((ranking, i) => (
          <li className="ranking-name" key={i}>
            <span>{i + 1}.</span>
            <h2>{ranking.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
