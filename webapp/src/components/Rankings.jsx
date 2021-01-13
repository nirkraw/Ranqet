import React, { useState, useEffect } from "react";
import { fetchRankings} from "../util/Endpoints";
import "../styles/Rankings.css";
import LoadingSpinner from "./Misc/LoadingSpinner";
import ErrorPage from "./Misc/ErrorPage";
import { useRouteMatch } from "react-router-dom";

export default function Rankings() {
  const match = useRouteMatch();
  const [error, setError] = useState(null);
  const [personalRanking, setPersonalRanking] = useState([]);
  const [globalRanking, setGlobalRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   fetchCurrRankings();
  }, []);

  const fetchCurrRankings = async () => {
      try {
      const res = await fetchRankings(match.params.listId, localStorage.getItem("userId"));
      const currPersonalRanking = [];
      const currGlobalRanking = [];

      for (let i = 0; i < res.data.personalRanking.length; i++) {
        currPersonalRanking.push(res.data.personalRanking[i].name);
        currGlobalRanking.push(res.data.globalRanking[i].name)
      }
      setPersonalRanking(currPersonalRanking);
      setGlobalRanking(currGlobalRanking);
      setLoading(false);
    } catch (err) {
      setError(err.response.status);
    }
  }

  if (error) return <ErrorPage error={error} />
  if (loading) return <LoadingSpinner />;

  const personalRankingList = personalRanking.map((personalRanking, i) => (
    <li className="ranking-name" key={i}>
      {i + 1}: {personalRanking}
    </li>
  ));

   const globalRankingList = globalRanking.map((globalRanking, i) => (
     <li className="ranking-name" key={i}>
       {i + 1}: {globalRanking}
     </li>
   ));

  return (
    <div id="completed-list-main-div">
      <h1 id="main-ranking-header">Rankings</h1>
      <div id="personal-and-global-ranking-main-div">
        <div id="personal-ranking-main-div">
          <h2 className="ranking-header">Personal Ranking</h2>
          <ul>{personalRankingList}</ul>
        </div>
        <div id="global-ranking-main-div">
          <h2 className="ranking-header">Global Ranking</h2>
          <ul>{globalRankingList}</ul>
        </div>
      </div>
    </div>
  );
}
