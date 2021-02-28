import React from "react";

export default function PresetOptionsDisplay({ options, setCurrOptions }) {
  if (!options) return <ul id="preset-options-display-container"></ul>;

  const selectBox = (index) => {
    const newOptions = JSON.parse(JSON.stringify(options));
    newOptions[index].selected = !options[index].selected;
    setCurrOptions(newOptions);
  };

  return (
    <ul id="preset-options-display-container">
      <button className="site-button">Select All</button>
      {options.map((option, i) => (
        <li id="preset-options-display-item" key={i}>
          <div className="preset-options-checkbox-container">
            <input
              type="checkbox"
              className="preset-checkbox-input"
              name={option.name}
              value={option.name}
              checked={option.selected}
              onChange={() => selectBox(i)}
            />
            <label className="preset-checkbox-label">{option.name}</label>
          </div>
          <img src={option.photoUrl} alt="option" />
        </li>
      ))}
    </ul>
  );
}
