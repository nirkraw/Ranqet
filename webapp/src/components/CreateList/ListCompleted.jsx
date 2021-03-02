import React, { useState, useEffect, useRef } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { fetchList } from "../../util/Endpoints/ListEP";
import LoadingSpinner from "../Misc/LoadingSpinner";

export default function ListCompleted() {
  const linkRef = useRef(null);
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const match = useRouteMatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadList();
  }, [])

  const loadList = async () =>  {
    try {
      const res = await fetchList(match.params.listId);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setImageUrl(res.data.imageUrl);
      setLoading(false);
    } catch(err) {
      history.push(`/error/${err.message}`);
    }
  }

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(linkRef.current.value);
    setActive(true);
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div id="list-completed-main">
      <div id="list-completed-sub">
        <div id="list-completed-info-and-image">
          {imageUrl ? <img className="list-image" src={imageUrl} alt="list"></img> : null}
          <div id="list-completed-info">
            <p>{title}</p>
            <p>{description}</p>
          </div>
        </div>
        <div id="list-completed-buttons">
          <input
            ref={linkRef}
            id="share-url-input"
            disabled
            value={`${window.location.origin}/#/${match.params.listId}/quiz`}
          />
          <button className="site-button" onClick={copyToClipboard}>
            Copy Link
          </button>
          <button
            className="site-button"
            onClick={() => history.push(`/${match.params.listId}/quiz`)}
          >
            Rank it!
          </button>
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
    </div>
  );
}
