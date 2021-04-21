import React, { useState, useEffect } from "react";
import { fetchGlobalRankings } from "../../util/Endpoints/RankingEP";
import { useRouteMatch, useHistory } from "react-router-dom";
import LoadingSpinner from "../Misc/LoadingSpinner";

export default function RankingsGlobal() {
  const match = useRouteMatch();
  const history = useHistory();
  const [globalRanking, setGlobalRanking] = useState([]);
  const [maxScore, setMaxScore] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGlobalRankings();
  }, [match.params.listId]);

  const getGlobalRankings = async () => {
    try {
      const global = await fetchGlobalRankings(match.params.listId);
      setGlobalRanking(global.data.ranking);
      let max = 0;
      for (let i = 0; i < global.data.ranking.length; i++) {
        if (global.data.ranking[i].score > max)
          max = global.data.ranking[i].score;
      }
      setMaxScore(max);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="rankings-global-rankings">
      <h1 className="rankings-global-title">Overall Rankings</h1>
      <ul className="rankings-global-options">
        {globalRanking.map((ranking, i) => (
          <li className="rankings-global-item justify-start-center" key={i}>
            <div className="rankings-global-item-title justify-start-center">
              <span># {i + 1}</span>
              <h2>{ranking.name}</h2>
            </div>
            <div className="ranking-global-visual-container">
              <div
                className="rankings-global-item-visual"
                style={{ width: `${(ranking.score / maxScore) * 100}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
