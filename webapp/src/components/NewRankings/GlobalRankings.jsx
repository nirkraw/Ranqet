import React, { useState, useEffect } from "react";
import { fetchGlobalRankings } from "../../util/Endpoints/RankingEP";
import { useRouteMatch, useHistory } from "react-router-dom";
import LoadingSpinner from "../Misc/LoadingSpinner";

export default function RankingsGlobal() {
  const match = useRouteMatch();
  const history = useHistory();
  const [globalRanking, setGlobalRanking] = useState([]);
  const [maxScore, setMaxScore] = useState(1);
  const[minScore, setMinScore] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGlobalRankings();
  }, [match.params.listId]);

  const getGlobalRankings = async () => {
    try {
      const global = await fetchGlobalRankings(match.params.listId);
      setGlobalRanking(global.data.ranking);
      let max = 0;
      let min = Infinity;
      for (let i = 0; i < global.data.ranking.length; i++) {
        if (global.data.ranking[i].score > max) {
          max = global.data.ranking[i].score;
        }
        if (global.data.ranking[i].score < min) {
          min = global.data.ranking[i].score;
        }
      }
      setMaxScore(max);
      setMinScore(min);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  const getRankingBarWidth = (currScore) => {
    const lowPossibleRating = 1400 - 30*(globalRanking.length - 1)/2;
    const highPossibleRating = 1400 + 30*(globalRanking.length - 1)/2;
    const possibleRange = highPossibleRating - lowPossibleRating;
    const adjustedScore = currScore - lowPossibleRating;
    const width = (adjustedScore / possibleRange) * 100;
    return width;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="rankings-global-rankings">
      <h1 className="rankings-title">Overall Rankings</h1>
      {globalRanking.length ? (
        <ul className="rankings-options">
          {globalRanking.map((ranking, i) => (
            <li className="rankings-global-item justify-start-center" key={i}>
              <div className="rankings-global-item-title justify-start-center">
                <span># {i + 1}</span>
                <h2>{ranking.name}</h2>
              </div>
              <div className="ranking-global-visual-container">
                <div
                  className="rankings-global-item-visual"
                  style={{ width: `${getRankingBarWidth(ranking.score)}%`}}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rankings-no-ranking-header">
          This list has no current rankings
        </p>
      )}
    </div>
  );
}
