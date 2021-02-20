import React from "react";

export default function PresetOptionsDisplay({ options }) {
  if (!options) return <ul id="preset-options-display-container"></ul>
  return (
    <ul id="preset-options-display-container">
      {options.map((option, i) => (
        <li key={i}>
          <h1>{option.name}</h1>
          <img src={option.photoUrl} alt="option" />
        </li>
      ))}
    </ul>
  );
}
