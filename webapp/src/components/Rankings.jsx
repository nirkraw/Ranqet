import React, { useState, useEffect } from "react";
import { fetchPersonalRankings, fetchGlobalRankings } from "../util/Endpoints/RankingEP";
import "../styles/Rankings.css";
import LoadingSpinner from "./Misc/LoadingSpinner";
import ErrorPage from "./Misc/ErrorPage";
import { useRouteMatch } from "react-router-dom";
import Comments from "./Comments";
import RankingsList from "./RankingsList";

export default function Rankings({ openModal }) {
  const match = useRouteMatch();
  const [error, setError] = useState(null);
  const [personalRanking, setPersonalRanking] = useState([]);
  const [globalRanking, setGlobalRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGlobalRankings();
  }, []);

  const getPersonalRankings = async () => {
    try {
      const personal = await fetchPersonalRankings(
        match.params.listId,
        localStorage.getItem("userId")
      );
      setPersonalRanking(personal.data.ranking);
    } catch (err) {
      setError(err.message);
    }
  };

  const getGlobalRankings = async () => {
    try {
      if (localStorage.getItem("userId")) getPersonalRankings();
      const global = await fetchGlobalRankings(match.params.listId);
      setGlobalRanking(global.data.ranking);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <ErrorPage error={error} />;
  if (loading) return <LoadingSpinner />;

  return (
    <div id="completed-list-main-div">
      <h1 id="main-ranking-header">Rankings</h1>
      <div id="personal-and-global-ranking-main-div">
        <RankingsList
          rankings={personalRanking}
          rankingName="Personal Rankings"
          openModal={openModal}
        />
        <div id="space-div"></div>
        <RankingsList rankings={globalRanking} rankingName="Global Rankings" />
      </div>
      <Comments openModal={openModal} />
    </div>
  );
}
