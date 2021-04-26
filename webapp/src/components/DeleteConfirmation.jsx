import { useState, useRef } from "react";
import "../styles/DeleteConfirmation.css";
import { useOutsideAlerter } from "../util/useOutsideAlerter";

export default function DeleteConfirmation({ parent, submitFunc, confirmMessage, funcArgs }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const closeModal = () => setIsOpen(false);
  useOutsideAlerter(wrapperRef, setIsOpen, "mousedown");
  return (
    <div className="confirmation-modal-main" ref={wrapperRef}>
      <div onClick={() => setIsOpen(true)}>{parent}</div>
      {isOpen ? (
        <div className="confirmation-modal-box column-center-center">
          <p>{confirmMessage}</p>
          <div className="confirmation-modal-button-container">
            <div className="site-button" onClick={closeModal}>
              Cancel
            </div>
            <div
              className="site-button"
              onClick={(e) => {
                submitFunc(...funcArgs);
                setIsOpen(false);
              }}
            >
              Yes
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
