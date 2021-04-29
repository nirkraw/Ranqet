import React, { useState, useEffect } from "react";
import { submitOptionChoice } from "../../util/Endpoints/OptionEP";
import LoadingSpinner from "../Misc/LoadingSpinner";
import "../../styles/Quiz.css";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function QuizOptions({
  options,
  fetchNextOptionPair
}) {
  const listId = useRouteMatch().params.listId;
  const [clickable, setClickale] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submitOption = async (e) => {
    setClickale(false);
    setTimeout(() => {
      setClickale(true);
    }, 1000);
    const winningOptionId = e.currentTarget.attributes.optionid.value;
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
              <div className="header-container justify-center-center">
                <h3 className="option-header">{option.name}</h3>
              </div>
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
              <div className="header-container justify-center-center">
                <h3 className="option-header-no-image">{option.name}</h3>
              </div>
            </div>
          );
      })}
    </div>
  );
}
