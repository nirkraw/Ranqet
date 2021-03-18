import React from 'react'
import "../styles/ErrorPage.css";
import Homer from "../assets/homer-simpsons-155238_1280.png";
import { useHistory } from "react-router-dom";

export default function NotFound() {
    const history = useHistory();
    return (
      <div className="column-center-center" style={{ height: "500px" }}>
        <h1 id="error-page-title">Link is broken or has been removed</h1>
        <div className="site-button-3" onClick={() => history.push("/")}>
          Return Home
        </div>
        <img id="error-image" src={Homer} alt="homer" />
      </div>
    );
}
