import React, { useState, useEffect } from "react";
import { getFormattedDate } from "../util/DateCalc";
import { useHistory } from "react-router-dom";
import "../styles/listIndex.css";
import { getCacheId } from "../util/getCacheId";
import { fetchUserLists } from "../util/Endpoints/UserEP";
import { deleteList } from "../util/Endpoints/ListEP";
import DeleteConfirmation from "./DeleteConfirmation";

export default function ListIndex({ cacheId, includeDelete }) {
  const history = useHistory();
  const [passedList, setPassedList] = useState([]);

  useEffect(() => {
    if (cacheId) setPassedList(JSON.parse(localStorage.getItem(cacheId)).lists);
  }, [cacheId]);

  if (!passedList || !passedList.length)
    return (
      <div
        className="justify-center-center"
        style={{ width: "100%", minHeight: "400px" }}
      >
        <h1 id="no-lists">No Lists Yet</h1>
      </div>
    );

  const confirmDeleteList = async (listId) => {
    try {
      await deleteList(
        window.localStorage.getItem("userId"),
        listId,
        window.localStorage.getItem("sessionToken")
      );
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
    const cacheId = getCacheId(fetchUserLists, [
      "CREATED",
      localStorage.getItem("userId"),
      localStorage.getItem("sessionToken"),
    ]);
    const cachedUserLists = JSON.parse(localStorage.getItem(cacheId)).lists;
    const newCachedUserLists = { lists: [] };
    for (let i = 0; i < cachedUserLists.length; i++) {
      const list = cachedUserLists[i];
      if (list.id === listId) continue;
      newCachedUserLists.lists.push(list);
    }
    localStorage.setItem(cacheId, JSON.stringify(newCachedUserLists));
    setPassedList(JSON.parse(localStorage.getItem(cacheId)).lists);
  };

  return (
    <ul id="list-index-ul">
      {passedList.map((list, i) => {
        return (
          <div className="list-index-item" key={i}>
            <li className="list-index-item-li">
              <div className="list-index-item-info column-start">
                <div className="title-and-completion-container justify-start-center">
                  <p className="list-index-item-name">{list.title}</p>
                  {list.numCompletions === 1 ? (
                    <p className="list-index-item-num-completions">
                      Ranked by
                      <span className="num-completions-span">
                        {list.numCompletions}
                      </span>
                      person
                    </p>
                  ) : (
                    <p className="list-index-item-num-completions">
                      Ranked by
                      <span className="num-completions-span">
                        {list.numCompletions}
                      </span>
                      people
                    </p>
                  )}
                </div>
                <div className="list-author-and-date-container justify-start-center">
                  <div
                    className="list-index-author"
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/profile/${list.createdBy.id}`);
                    }}
                  >
                    <span>By: </span>
                    <p>{list.createdBy.username}</p>
                    <span>·</span>
                  </div>
                  <p className={"created-date"}>
                    {getFormattedDate(list.createdOn)}
                  </p>
                </div>
                <div className="list-index-item-description">
                  <p>{list.description}</p>
                </div>
                <div className="justify-start-center">
                  {list.isCompleted ? (
                    <div
                      className="list-index-button site-button-3"
                      onClick={() => history.push(`/${list.id}/rankings`)}
                    >
                      View Results
                    </div>
                  ) : (
                    <div className="justify-start-center">
                      <div
                        className="list-index-button site-button-2"
                        onClick={() => history.push(`/${list.id}/quiz`)}
                      >
                        Rank It!
                      </div>
                      <div
                        className="list-index-button site-button-3"
                        onClick={() => history.push(`/${list.id}/rankings`)}
                      >
                        View Results
                      </div>
                    </div>
                  )}
                  {includeDelete ? (
                    <DeleteConfirmation
                      parent={
                        <div className="list-index-delete">
                          Delete this list
                        </div>
                      }
                      submitFunc={() => confirmDeleteList(list.id)}
                      confirmMessage="Are you sure you want to delete this list?"
                    />
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
