import React from "react";
import "../../styles/createList/UnlistedCheckbox.css";
import Tooltip from "../Tooltip";

export default function Unlisted({ setUnlisted, unlisted }) {
  return (
    <div id="unlisted-container">
      <label id="unlisted-label">Unlisted:</label>
      <input
        type="checkbox"
        id="unlisted-input"
        name="unlisted"
        onChange={() => setUnlisted(!unlisted)}
      />
      <Tooltip
        helpText={
          "List will not show up on any public page and can only be shared with a URL"
        }
      />
    </div>
  );
}
