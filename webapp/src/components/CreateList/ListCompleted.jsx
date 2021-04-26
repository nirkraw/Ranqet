import React, { useState, useEffect, useRef } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { fetchList } from "../../util/Endpoints/ListEP";
import LoadingSpinner from "../Misc/LoadingSpinner";
import "../../styles/createList/listCompleted.css";

export default function ListCompleted() {
  const linkRef = useRef(null);
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [authorId, setAuthorId] = useState("");
  const history = useHistory();
  const match = useRouteMatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    try {
      const res = await fetchList(match.params.listId);
      debugger
      if (res.data.createdBy.id !== localStorage.getItem("userId"))
        history.push("/");
      setTitle(res.data.title);
      setDescription(res.data.description);
      setImageUrl(res.data.imageUrl);
      setAuthor(res.data.createdBy.username);
      setAuthorId(res.data.createdBy.id);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(linkRef.current.value);
    setActive(true);
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="list-completed-main column-start">
      <h1 className="list-completed-main-header">List Created!</h1>
      <div className="list-completed-sub justify-start">
        <div className="list-completed-info-and-button">
          <div id="list-completed-info-and-image">
            <div id="list-completed-info">
              <p>{title}</p>
              <div
                className="list-index-author"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/profile/${authorId}`);
                }}
              >
                <span>By: </span>
                <p>{author}</p>
              </div>
              <p>{description}</p>
            </div>
          </div>
          <div className="list-completed-buttons">
            <input
              ref={linkRef}
              id="share-url-input"
              disabled
              value={`${window.location.origin}/${match.params.listId}/quiz`}
            />
            <button className="site-button" onClick={copyToClipboard}>
              Copy Link
            </button>
            <div
              className="site-button-2"
              onClick={() => history.push(`/${match.params.listId}/quiz`)}
            >
              Ranqet
            </div>
            <p
              className={
                !active
                  ? "copied-message"
                  : "copied-message copied-message-active"
              }
            >
              Copied!
            </p>
          </div>
        </div>
        {imageUrl ? (
          <img
            className="list-completed-list-image"
            src={imageUrl}
            alt="list"
          ></img>
        ) : null}
      </div>
    </div>
  );
}
