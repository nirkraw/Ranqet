import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function RankingsList({ rankings, rankingName, openModal }) {
  const history = useHistory();
  const match = useRouteMatch();

  const handleTakeQuiz = () => {
    if (localStorage.getItem("userId"))
      history.push(`/${match.params.listId}/quiz`);
    else
      openModal({ formType: "login", route: `/${match.params.listId}/quiz` });
  };

  if (rankings.length === 0) {
    return (
      <div id="ranking-main-div-container">
        <div id="ranking-main-div-with-blur">
          <h2 className="ranking-header-absolute">{rankingName}</h2>
          <div className="ranking-quiz-button-container">
            <button id="rankings-quiz-button" onClick={handleTakeQuiz}>
              Rank This List
            </button>
          </div>
        </div>
        <div id="ranking-main-div-no-background"></div>
      </div>
    );
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
