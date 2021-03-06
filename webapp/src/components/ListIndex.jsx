import React, { useState } from "react";
import { getFormattedDate } from "../util/DateCalc";
import { useHistory } from "react-router-dom";
import "../styles/listIndex.css";
import ConfirmationModal from "./ConfirmModal";

export default function ListIndex({ passedList, trash, getCreatedLists }) {
  const [currListId, setCurrListId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  if (!passedList || !passedList.length)
    return (
      <div id="list-index-ul">
        <h1 id="no-lists">No Lists</h1>
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
        getCreatedLists={getCreatedLists}
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
                  {list.complete ? (
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
                  {trash ? (
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
