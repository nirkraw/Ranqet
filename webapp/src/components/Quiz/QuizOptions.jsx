import React, { useState, useEffect } from "react";
import {
  fetchListOptionPair,
  submitOptionChoice,
  sampleUserId,
} from "../../Util/Endpoints";
import ErrorPage from "../Misc/ErrorPage";
import LoadingSpinner from "../Misc/LoadingSpinner";
import "../../styles/Quiz.css";

export default function QuizOptions({ listId, history }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNextOptionPair();
  }, []);

  const fetchNextOptionPair = async () => {
    try {
      const res = await fetchListOptionPair(listId, sampleUserId);
      if (res.data.isCompleted) {
        history.push(`/${listId}/rankings`);
      }
      else {
        setOptions([res.data.first, res.data.second]);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const submitOption = async (e) => {
    setLoading(true);
    const winningOptionId = e.currentTarget.attributes.optionid.value;
    const losingOptionId =
      options[0].id === winningOptionId ? options[1].id : options[0].id;
    try {
      await submitOptionChoice(listId, {
        userId: sampleUserId,
        winningOptionId,
        losingOptionId,
      });
      fetchNextOptionPair();
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <ErrorPage error={error} />;
  if (loading) return <LoadingSpinner />;
  return (
    <div id="main-options-div">
      {options.map((option, i) => (
        <div
          id="option-div"
          optionid={option.id}
          onClick={submitOption}
          key={i}
        >
          <h3 className="option-header">{option.name}</h3>
          {option.photoUrl ? (
            <img src={option.photoUrl} alt="option"></img>
          ) : null}
        </div>
      ))}
    </div>
  );
}
