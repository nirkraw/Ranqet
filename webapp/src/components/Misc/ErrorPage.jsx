import React from "react";
import "../../styles/ErrorPage.css";
import Homer from "../../assets/homer-simpsons-155238_1280.png";
import { useRouteMatch } from "react-router-dom";

export default function ErrorPage() {
  const match = useRouteMatch();
  if (!match.params.errorMessage) return null;

  return (
    <div id="error-page-container">
      <h1 id="error-page-title">Woops! Something went wrong ):</h1>
      <img id="error-image" src={Homer} alt="homer" />
      <p id="error-page-description">{match.params.errorMessage}</p>
    </div>
  );
}
