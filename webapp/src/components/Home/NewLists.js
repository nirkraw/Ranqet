import React from "react";
import { fetchListOptionPair } from "../../util/Endpoints/OptionEP";
import { useHistory } from "react-router-dom";
import "../../styles/NewLists.css";

export default function NewLists({ newLists }) {
  const history = useHistory();

  const handleLink = async (listId) => {
    if (!localStorage.getItem("userId")) history.push(`/${listId}/rankings`);
    else {
      if (await listIsComplete(listId)) {
        history.push(`/${listId}/rankings`);
      } else {
        history.push(`/${listId}/quiz`);
      }
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
    <div id="new-lists-container">
      <h1 id="new-lists-header">New Lists</h1>
      <ul id="new-lists-ul">
        {newLists.map((list, i) => {
          return (
            <li
              className="new-lists-item"
              key={i}
              onClick={() => handleLink(list.id)}
            >
              <p className="new-lists-item-name">{list.title}</p>
              <div className="new-lists-image-container">
                {list.imageUrl ? (
                  <img
                    src={list.imageUrl}
                    alt="list"
                    className="list-image"
                  ></img>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
