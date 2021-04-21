import React, { useState, useEffect } from "react";
import {
  fetchPersonalRankings,
  fetchGlobalRankings,
} from "../../util/Endpoints/RankingEP";
import { fetchListOptionPair } from "../../util/Endpoints/OptionEP";
import "../../styles/NewRankings.css";
import LoadingSpinner from "../Misc/LoadingSpinner";
import { useRouteMatch, useHistory } from "react-router-dom";
import Comments from "../Comments";
import RankingsHeader from "./RannkingsHeader";

export default function Rankings({ openModal }) {
  const match = useRouteMatch();
  const history = useHistory();
  const [personalRanking, setPersonalRanking] = useState([]);
  const [globalRanking, setGlobalRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGlobalRankings();
  }, [match.params.listId]);

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
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  const getGlobalRankings = async () => {
    try {
      if (localStorage.getItem("userId")) getPersonalRankings();
      const global = await fetchGlobalRankings(match.params.listId);
      setGlobalRanking(global.data.ranking);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="rankings-main-container column-start">
      <RankingsHeader />
      <div className="rankings-ranking-container justify-start-center">
        <div className="rankings-global-rankings"></div>
        <div className="rankings-personal-rankings"></div>
      </div>
      <Comments />
    </div>
  );
}
