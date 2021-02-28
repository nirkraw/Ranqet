import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

export default function ListCompleted({
  listId,
  title,
  imageUrl,
  description,
}) {
  const history = useHistory();
  const linkRef = useRef(null);
  const [active, setActive] = useState(false);

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(linkRef.current.value);
    setActive(true);
  };

  return (
    <div id="list-completed-main">
      <div id="list-completed-sub">
        <div id="list-completed-info-and-image">
          <img className="list-image" src={imageUrl} alt="list"></img>
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
            value={`${window.location.origin}/#/${listId}/quiz`}
          />
          <button className="site-button" onClick={copyToClipboard}>
            Copy Link
          </button>
          <button
            className="site-button"
            onClick={() => history.push(`/${listId}/quiz`)}
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
