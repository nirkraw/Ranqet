import React, { useEffect, useState } from "react";
import { fetchList } from "../../util/Endpoints/ListEP";
import "../../styles/Quiz.css";
import QuizOptions from "./QuizOptions";
import LoadingSpinner from "../Misc/LoadingSpinner";
import { useHistory, useRouteMatch } from "react-router-dom";
import { fetchListOptionPair } from "../../util/Endpoints/OptionEP";

export default function Quiz() {
  const match = useRouteMatch();
  const history = useHistory();
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalVoteCount, setTotalVoteCount] = useState(1);
  const [votesCompleted, setVotesCompleted] = useState(1);
  const [options, setOptions] = useState([]);

  if (!localStorage.getItem("sessionToken")) {
    history.push(`/${match.params.listId}/rankings`);
  }

  useEffect(() => {
    fetchNextOptionPair();
    fetchCurrList();
  }, [match.params.listId]);

  const fetchCurrList = async () => {
    try {
      const res = await fetchList(match.params.listId);
      setListName(res.data.title);
      setDescription(res.data.description);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  const fetchNextOptionPair = async () => { //function lives in quiz instead of quizOptions for quick reroute if user already completed quiz
    try {
      const res = await fetchListOptionPair(
        match.params.listId,
        localStorage.getItem("userId")
      );
      if (res.data.isCompleted) {
        history.push(`/${match.params.listId}/rankings`);
      } else {
        setOptions([res.data.first, res.data.second]);
      }
      setVotesCompleted(res.data.numVotesCompleted);
      setTotalVoteCount(res.data.totalVoteCount);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  if (loading) return <LoadingSpinner />;
  const percentFinished = (votesCompleted / totalVoteCount) * 100;
  const divStyle = {
    width: `${percentFinished}%`,
    height: "100%",
    backgroundColor: "var(--pink-3)",
    borderTopLeftRadius: "30px",
    borderBottomLeftRadius: "30px",
  };

  return (
    <div id="quiz-main-div">
      <h1 id="main-quiz-header">{listName}</h1>
      <h2 id="main-quiz-description">{description}</h2>
      <div id="progress-bar-container">
        <div className="progress-bar-progress" style={divStyle}></div>
      </div>
      <div id="options-and-versus-container">
        <QuizOptions
          options={options}
          fetchNextOptionPair={fetchNextOptionPair}
        />
        <div id="versus-container">
          <h3>VS</h3>
        </div>
      </div>
    </div>
  );
}
