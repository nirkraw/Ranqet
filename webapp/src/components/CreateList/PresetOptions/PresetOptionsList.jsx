import React, { useState } from "react";
import { deletePreset } from "../../../util/Endpoints/ListEP";

export default function PresetOptionsTabs({
  presets,
  setCurrOptions,
  fetchCurrPresets,
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const deleteCurrPreset = async (presetId) => {
    await deletePreset(
      localStorage.getItem("userId"),
      localStorage.getItem("sessionToken"),
      presetId
    );
    fetchCurrPresets();
  };

  return (
    <div id="options-tabs-container">
      <h1>My Presets</h1>
      <ul className="preset-tab-ul">
        {presets.map((preset, i) => (
          <li
            className={
              activeIndex === i
                ? "preset-tab-item active-preset"
                : "preset-tab-item"
            }
            key={i}
            onClick={() => {
              setCurrOptions(presets[i].presetOptions);
              setActiveIndex(i);
            }}
          >
            <h1 className="preset-tab-title">{preset.title}</h1>
            <button
              onClick={() => deleteCurrPreset(preset.id)}
              className="delete-preset site-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
