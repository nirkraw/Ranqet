import React from "react";
import { fetchListOptionPair } from "../util/Endpoints/OptionEP";
import {formatUploadTime} from "../util/DateCalc";
import { useHistory } from "react-router-dom";
import "../styles/listIndex.css";
import TrashImage from "../assets/trash-icon.png";

export default function ListIndex({
  passedList,
  trash,
  setCurrListId,
  setIsOpen
}) {
  const history = useHistory();
  if(!passedList) return null;

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

  const deleteList = (listId) => {
    setCurrListId(listId);
    setIsOpen(true);
  };

  return (
    <ul id="list-index-ul">
      {passedList.map((list, i) => {
        return (
          <div className="list-index-item" key={i}>
            <li className="list-index-item-li">
              <div className="list-index-image-container">
                {list.imageUrl ? (
                  <img
                    src={list.imageUrl}
                    alt="list"
                    className="list-image"
                  ></img>
                ) : null}
              </div>
              <div className="list-index-item-name-and-description-container">
                <p
                  className="list-index-item-name"
                  onClick={() => handleLink(list.id)}
                >
                  {list.title}
                </p>
                <p
                  className="list-index-author"
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/profile/${list.createdBy.id}`);
                  }}
                >
                  <span>By: </span>
                  {list.createdBy.name}
                </p>
                <p
                  className="list-index-category"
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/category/${list.category}`);
                  }}
                >
                  {list.category}
                </p>
                <p>Created {formatUploadTime(list.createdOn)}</p>
                <p className="list-index-item-description">
                  {list.description}
                </p>
                {list.numCompletions === 1 ? (
                  <p className="list-index-item-num-completions">
                    Taken by:
                    <span className="num-completions-span">
                      {list.numCompletions}
                    </span>
                    person
                  </p>
                ) : (
                  <p className="list-index-item-num-completions">
                    Taken by:
                    <span className="num-completions-span">
                      {list.numCompletions}
                    </span>
                    people
                  </p>
                )}
              </div>
            </li>
            {trash ? (
              <img
                className="delete-list-button"
                src={TrashImage}
                alt="trash"
                onClick={() => deleteList(list.id)}
              ></img>
            ) : null}
          </div>
        );
      })}
    </ul>
  );
}
