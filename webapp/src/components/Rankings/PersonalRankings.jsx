import React, { useState, useEffect } from "react";
import { fetchPersonalRankings } from "../../util/Endpoints/RankingEP";
import { useRouteMatch, useHistory } from "react-router-dom";
import LoadingSpinner from "../Misc/LoadingSpinner";

export default function PersonalRankings() {
  const match = useRouteMatch();
  const history = useHistory();
  const [personalRanking, setPersonalRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPersonalRankings();
  }, [match.params.listId]);

  const getPersonalRankings = async () => {
    if (!localStorage.getItem("userId")) {
      setLoading(false);
      return;
    }

    try {
      const personal = await fetchPersonalRankings(
        match.params.listId,
        localStorage.getItem("userId")
      );
      setPersonalRanking(personal.data.ranking);
      setLoading(false);
    } catch (err) {
      if (err.response.status === 403) {
        setLoading(false); //for when user doesn't have personal rankings
      } else {
        history.push(`/error/${err.message}`);
      }
    }
  };
  if (loading) return <LoadingSpinner />;
  if (!localStorage.getItem("userId")) {
    return (
      <div className="rankings-personal-rankings">
        <h1 className="rankings-title">Your Rankings</h1>
        <div
          className="list-index-button site-button-2"
          onClick={() => {
            const openModal = new CustomEvent("openModal", {
              detail: {
                newFormType: "login",
                newRoute: `/${match.params.listId}/quiz`,
              },
            });
            window.dispatchEvent(openModal); //opens login window
          }}
        >
          Ranqet
        </div>
      </div>
    );
  }
  if (!personalRanking.length)
    return (
      <div className="rankings-personal-rankings">
        <h1 className="rankings-title">Your Rankings</h1>
        <div
          className="list-index-button site-button-2"
          onClick={() => history.push(`/${match.params.listId}/quiz`)}
        >
          Ranqet
        </div>
      </div>
    );

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
