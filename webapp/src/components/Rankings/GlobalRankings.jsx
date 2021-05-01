import React, { useState, useEffect } from "react";
import { fetchGlobalRankings } from "../../util/Endpoints/RankingEP";
import { useRouteMatch, useHistory } from "react-router-dom";
import LoadingSpinner from "../Misc/LoadingSpinner";

export default function RankingsGlobal() {
  const match = useRouteMatch();
  const history = useHistory();
  const [globalRanking, setGlobalRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGlobalRankings();
  }, [match.params.listId]);

  const getGlobalRankings = async () => {
    try {
      const global = await fetchGlobalRankings(match.params.listId);
      setGlobalRanking(global.data.ranking);
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
