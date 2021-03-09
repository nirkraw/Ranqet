import React, { useState } from "react";

export default function PresetOptionsTabs({ presets, setCurrOptions }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div id="options-tabs-container">
      <h1>My Presets</h1>
      <ul className="preset-tab-ul">
        {presets.map((preset, i) => (
          <li
            className={activeIndex === i ? "active-preset" : "preset-tab-item"}
            key={i}
            onClick={() => {
              setCurrOptions(presets[i].presetOptions);
              setActiveIndex(i);
            }}
          >
            <h1 className="preset-tab-title">{preset.title}</h1>
          </li>
        ))}
      </ul>
    </div>
  );
}
