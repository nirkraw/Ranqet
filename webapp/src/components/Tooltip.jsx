import React from 'react'
import "../styles/Tooltip.css";

export default function Tooltip({helpText}) {
    return (
      <div className="info-tag tooltip-container">
        <h1>?</h1>
        <span className="tooltiptext">
          {helpText}
        </span>
      </div>
    );
}
