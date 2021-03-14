import React from "react";
import "../styles/Modal.css";
import SessionForm from "./SessionForm";

export default function Modal({ modalSettings, openModal }) {
  if (!modalSettings.formType) return null;
  return (
    <div
      className="modal-background"
      onClick={() => openModal({ formType: "", route: "" })}
    >
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        <SessionForm
          formType={modalSettings.formType}
          openModal={openModal}
          route={modalSettings.route}
        />
      </div>
    </div>
  );
}
