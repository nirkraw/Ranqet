import "../../styles/LoadingSpinner.css";
import React from "react";
import Spinner from "react-bootstrap/Spinner";

export default function LoadingSpinner() {
    return (
      <div id="spinner">
        <Spinner className="red-spinner-border" animation="border" size="sm" />
        <Spinner className="red-spinner-border" animation="border" />
        <Spinner className="red-spinner-fill" animation="grow" />
        <Spinner className="red-spinner-fill" animation="grow" size="sm" />
      </div>
    );
}
