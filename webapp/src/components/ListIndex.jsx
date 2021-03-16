import React, { useState } from "react";
import { getFormattedDate } from "../util/DateCalc";
import { useHistory } from "react-router-dom";
import "../styles/listIndex.css";
import ConfirmationModal from "./ConfirmModal";

export default function ListIndex({
  cacheId,
  includeDelete,
}) {
  const [currListId, setCurrListId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const passedList = cacheId
    ? JSON.parse(localStorage.getItem(cacheId)).lists
    : [];


  if (!passedList || !passedList.length)
    return (
      <div className="justify-center-center" style={{ width: "100%" }}>
        <h1 id="no-lists">No Lists Yet</h1>
      </div>
    );

  const deleteList = (listId) => {
    setCurrListId(listId);
    setIsOpen(true);
  };

  return (
    <ul id="list-index-ul">
      <ConfirmationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        listId={currListId}
      />
      {passedList.map((list, i) => {
        return (
          <div className="list-index-item" key={i}>
            <li className="list-index-item-li">
              <div className="list-index-item-info column-start">
                <div className="title-and-completion-container justify-start-center">
                  <p className="list-index-item-name">{list.title}</p>
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
                <p className={"created-date"}>
                  {getFormattedDate(list.createdOn)}
                </p>
                <div className="list-index-item-description">
                  <p>{list.description}</p>
                </div>
                <div className="justify-start">
                  {list.isCompleted ? (
                    <div
                      className="list-index-button site-button-3"
                      onClick={() => history.push(`/${list.id}/rankings`)}
                    >
                      View Results
                    </div>
                  ) : (
                    <div
                      className="list-index-button site-button-2"
                      onClick={() => history.push(`/${list.id}/quiz`)}
                    >
                      Rank It!
                    </div>
                  )}
                  {includeDelete ? (
                    <div
                      className="site-button-3"
                      onClick={() => deleteList(list.id)}
                    >
                      Delete
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="list-index-image-container">
                {list.imageUrl ? (
                  <img
                    src={list.imageUrl}
                    alt="list"
                    className="list-image"
                  ></img>
                ) : null}
              </div>
            </li>
          </div>
        );
      })}
    </ul>
  );
}
