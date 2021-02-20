import React from 'react'

export default function PresetOptionsTab({presets, setCurrOptions}) {
    return (
      <ul>
        {presets.map((preset, i) => (
          <li key={i} onClick={() => setCurrOptions(presets[i].options)}>
            <h1>{preset.title}</h1>
          </li>
        ))}
      </ul>
    );
}
