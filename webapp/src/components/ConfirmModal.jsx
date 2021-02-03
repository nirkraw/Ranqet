import React from "react";
import Modal from "react-modal";
import "../styles/ConfirmationModal.css";
import {deleteList} from "../util/Endpoints";

Modal.setAppElement("#root");

export default function ConfirmModal({isOpen, setIsOpen, listId}) {

  const confirmDeleteList = async () => {
    try {
      await deleteList(
      window.localStorage.getItem("userId"),
      listId,
      window.localStorage.getItem("sessionToken")
    );
    } catch (err) {
      alert(JSON.stringify(err))
    }
    setIsOpen(false);
  }  
  return (
    <Modal isOpen={isOpen} style={{ overlay: { backgroundColor: "grey" } }}>
      <div id="confirmation-modal-container">
        <h1>Are you sure you want to delete this list?</h1>
        <div id="confirmation-modal-button-container">
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={confirmDeleteList}>Yes</button>
        </div>
      </div>
    </Modal>
  );
}
