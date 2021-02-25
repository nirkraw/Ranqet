import React, { useState, useEffect } from "react";
import { fetchPersonalRankings, fetchGlobalRankings } from "../util/Endpoints/RankingEP";
import "../styles/Rankings.css";
import LoadingSpinner from "./Misc/LoadingSpinner";
import { useRouteMatch, useHistory } from "react-router-dom";
import Comments from "./Comments";
import RankingsList from "./RankingsList";

export default function Rankings({ openModal }) {
  const match = useRouteMatch();
  const history = useHistory();
  const [personalRanking, setPersonalRanking] = useState([]);
  const [globalRanking, setGlobalRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

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
      history.push(`/error/${err.message}`);
    }
  };
  
  const getGlobalRankings = async () => {
    try {
      if (localStorage.getItem("userId")) getPersonalRankings();
      const global = await fetchGlobalRankings(match.params.listId);
      setTitle(global.data.title)
      setGlobalRanking(global.data.ranking);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div id="completed-list-main-div">
      <h1 id="main-ranking-header">{title}</h1>
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
