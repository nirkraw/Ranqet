import React from 'react'
import "../styles/Rankings.css";

export default function RankingsList({rankings, rankingName}) {
    return (
      <div id="ranking-main-div">
        <h2 className="ranking-header">{rankingName}</h2>
        <ul>
          {rankings.map((ranking, i) => (
            <li className="ranking-name" key={i}>
              <span>{i + 1}.</span>
              <h2>{ranking.name}</h2>
            </li>
          ))}
        </ul>
      </div>
    );
}
