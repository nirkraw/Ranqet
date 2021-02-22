import React from "react";
import { fetchListOptionPair } from "../../util/Endpoints/OptionEP";
import { useHistory } from "react-router-dom";
import "../../styles/NewLists.css";
import Star from "../../assets/star.ico";

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
      <div id="new-list-title-and-icon">
        <h3 id="new-lists-header">New</h3>
        <img src={Star} alt="star" id="top-lists-icon"></img>
      </div>
      <ul id="new-lists-ul">
        {newLists.map((list, i) => {
          return (
            <li
              className="new-lists-item"
              key={i}
              onClick={() => handleLink(list.id)}
            >
              <div className="new-lists-image-container">
                {list.imageUrl ? (
                  <img
                    src={list.imageUrl}
                    alt="list"
                    className="list-image"
                  ></img>
                ) : null}
              </div>
              <p className="new-lists-item-name">{list.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
