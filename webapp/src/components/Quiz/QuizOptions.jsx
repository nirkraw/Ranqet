import React, { useState, useEffect } from "react";
import {
  fetchListOptionPair,
  submitOptionChoice,
} from "../../util/Endpoints/OptionEP";
import LoadingSpinner from "../Misc/LoadingSpinner";
import "../../styles/Quiz.css";
import { useHistory } from "react-router-dom";

export default function QuizOptions({
  listId,
  setTotalVoteCount,
  setVotesCompleted,
}) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickable, setClickale] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetchNextOptionPair();
  }, []);

  const fetchNextOptionPair = async () => {
    try {
      const res = await fetchListOptionPair(
        listId,
        localStorage.getItem("userId")
      );
      if (res.data.isCompleted) {
        history.push(`/${listId}/rankings`);
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

  const submitOption = async (e) => {
    setClickale(false);
    setTimeout(() => {
      setClickale(true);
    }, 1000);
    const winningOptionId = e.currentTarget.attributes.optionid.value;
    setLoading(true);
    const losingOptionId =
      options[0].id === winningOptionId ? options[1].id : options[0].id;
    try {
      await submitOptionChoice(
        listId,
        localStorage.getItem("userId"),
        winningOptionId,
        losingOptionId
      );
      fetchNextOptionPair();
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div id="main-options-div">
      {options.map((option, i) => {
        if (option.photoUrl)
          return (
            <div
              className="option-div"
              optionid={option.id}
              onClick={clickable ? submitOption : null}
              key={i}
            >
              <h3 className="option-header">{option.name}</h3>
              <img
                className="quiz-option-img"
                src={option.photoUrl}
                alt="option"
              ></img>
            </div>
          );
        else
          return (
            <div
              className="option-div-no-image"
              optionid={option.id}
              onClick={submitOption}
              key={i}
            >
              <h3 className="option-header-no-image">{option.name}</h3>
            </div>
          );
      })}
    </div>
  );
}
