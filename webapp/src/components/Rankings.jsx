import React, { useState, useEffect } from "react";
import { fetchRankings, sampleUserId } from "../Util/Endpoints";
import "../styles/Rankings.css";
import LoadingSpinner from "./Misc/LoadingSpinner";
import ErrorPage from "./Misc/ErrorPage";

export default function CompletedList({ match }) {
  const [error, setError] = useState(null);
  const [personalRanking, setPersonalRanking] = useState([]);
  const [globalRanking, setGlobalRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   fetchCurrRankings();
  }, []);

  const fetchCurrRankings = async () => {
      try {
      const res = await fetchRankings(match.params.listId, sampleUserId);
      const rankings = [];
      for (let i = 0; i < res.data.options.length; i++) {
        rankings.push(res.data.options[i].name);
      }
      setPersonalRanking(rankings);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <ErrorPage error={error} />
  if (loading) return <LoadingSpinner />;

  const personalRankingList = personalRanking.map((personalRanking, i) => (
    <li className="personal-ranking-name">
      {i + 1}: {personalRanking}
    </li>
  ));

  return (
    <div id="completed-list-main-div">
      <h1 id="main-ranking-header">Rankings</h1>
      <div id="personal-and-global-ranking-main-div">
        <div id="personal-ranking-main-div">
          <h2 id="personal-ranking-header">Personal Ranking</h2>
          <ul>{personalRankingList}</ul>
        </div>
        <div id="global-ranking-main-div">
          <h2 id="global-ranking-header">Global Ranking</h2>
        </div>
      </div>
    </div>
  );
}
