import React from "react";
import "../../styles/createList/UnlistedCheckbox.css";
import Tooltip from "../Tooltip";

export default function Unlisted({ setUnlisted, unlisted }) {
  return (
    <div id="unlisted-container">
      <input
        type="checkbox"
        id="unlisted-input"
        name="unlisted"
        onChange={() => setUnlisted(!unlisted)}
      />
      <label id="unlisted-label">Private</label>
      <Tooltip
        helpText={
          "List will not show up on any public page and can only be shared with a URL"
        }
      />
    </div>
  );
}
