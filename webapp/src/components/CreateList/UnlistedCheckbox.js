import React from 'react';
import "../../styles/createList/UnlistedCheckbox.css";

export default function Unlisted({setUnlisted, unlisted}) {
    return (
      <div id="unlisted-container">
        <div className="info-tag tooltip-container">
          i
          <span className="tooltiptext">
            List will not show up on any public page and can only be shared with
            a URL
          </span>
        </div>
        <label id="unlisted-label">Unlisted</label>
        <input
          type="checkbox"
          id="unlisted-input"
          name="unlisted"
          onChange={() => setUnlisted(!unlisted)}
        />
      </div>
    );
}