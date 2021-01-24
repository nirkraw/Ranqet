import React from "react";
import { fetchListOptionPair } from "../util/Endpoints";
import { useHistory } from "react-router-dom";

export default function ListIndex({ passedList }) {
  const history = useHistory();
  const handleLink = async (listId) => {
    if (await listIsComplete(listId)) {
      history.push(`/${listId}/rankings`);
    } else {
      history.push(`/${listId}/quiz`);
    }
  };

  const listIsComplete = async (listId) => {
    try {
      const res = await fetchListOptionPair(
        listId,
        localStorage.getItem("userId")
      );
      return res.data.isCompleted;
    } catch (err) {
      return false;
    }
  };
  return (
    <ul id="top-list-ul">
      {passedList.map((list, i) => {
        return (
          <li
            className="top-lists-item"
            key={i}
            onClick={() => handleLink(list.id)}
          >
            <div className="top-lists-image-container">
              {list.imageUrl ? (
                <img
                  src={list.imageUrl}
                  alt="list"
                  className="list-image"
                ></img>
              ) : null}
            </div>
            <div className="top-lists-item-name-and-description-container">
              <p className="top-lists-item-name">{list.title}</p>
              <p>{list.description}</p>
              {list.numCompletions === 1 ? (
                <p className="top-lists-item-num-completions">
                  Taken by:
                  <span className="num-completions-span">
                    {list.numCompletions}
                  </span>
                  person
                </p>
              ) : (
                <p className="top-lists-item-num-completions">
                  Taken by:
                  <span className="num-completions-span">
                    {list.numCompletions}
                  </span>
                  people
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
