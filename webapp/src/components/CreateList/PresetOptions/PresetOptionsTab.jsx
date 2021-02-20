import React, { useState } from "react";

export default function PresetOptionsTab({ presets, setCurrOptions }) {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <ul className="preset-tab-ul">
      {presets.map((preset, i) => (
        <li
          className={activeIndex === i ? "active-preset" : "preset-tab-item"}
          key={i}
          onClick={() => {
            setCurrOptions(presets[i].options);
            setActiveIndex(i);
          }}
        >
          <h1 className="preset-tab-title">{preset.title}</h1>
        </li>
      ))}
    </ul>
  );
}
