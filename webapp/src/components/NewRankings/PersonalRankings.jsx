import React, { useState, useEffect } from "react";
import { fetchPersonalRankings } from "../../util/Endpoints/RankingEP";
import { fetchListOptionPair } from "../../util/Endpoints/OptionEP";
import { useRouteMatch, useHistory } from "react-router-dom";
import LoadingSpinner from "../Misc/LoadingSpinner";

export default function PersonalRankings() {
  const match = useRouteMatch();
  const history = useHistory();
  const [personalRanking, setPersonalRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPersonalRankings();
  }, []);

  const getPersonalRankings = async () => {
    try {
      const res = await fetchListOptionPair(
        match.params.listId,
        localStorage.getItem("userId")
      );
      if (!res.data.isCompleted) return;
      const personal = await fetchPersonalRankings(
        match.params.listId,
        localStorage.getItem("userId")
      );
      setPersonalRanking(personal.data.ranking);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };
  if (loading) return <LoadingSpinner />;
  return (
    <div className="rankings-personal-rankings">
      <h1 className="rankings-title">Your Rankings</h1>
      <ul className="rankings-options">
        {personalRanking.map((ranking, i) => (
          <li className="rankings-personal-item justify-start-center" key={i}>
            <span># {i + 1}</span>
            <h2>{ranking.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
