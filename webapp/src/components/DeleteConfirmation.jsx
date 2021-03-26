import { useState, useRef } from "react";
import "../styles/DeleteConfirmation.css";
import { useOutsideAlerter } from "../util/useOutsideAlerter";

export default function DeleteConfirmation({
  parent,
  submitFunc,
  confirmMessage,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsOpen, "mousedown");
  return (
    <div className="confirmation-modal-main" ref={wrapperRef}>
      <div onClick={() => setIsOpen(true)}>{parent}</div>
      {isOpen ? (
        <div className="confirmation-modal-box column-center-center">
          <p>{confirmMessage}</p>
          <div className="confirmation-modal-button-container">
            <div className="site-button" onClick={() => setIsOpen(false)}>
              Cancel
            </div>
            <div className="site-button" onClick={submitFunc}>
              Yes
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
