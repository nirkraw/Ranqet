import React from "react";
import Modal from "react-modal";
import "../styles/ConfirmationModal.css";
import { deleteList } from "../util/Endpoints/ListEP";
import { useHistory } from "react-router-dom";
import { getCacheId } from "../util/getCacheId";
import { fetchUserLists } from "../util/Endpoints/UserEP";

Modal.setAppElement("#root");

export default function ConfirmModal({ isOpen, setIsOpen, listId, setFilter }) {
  const history = useHistory();
  const confirmDeleteList = async () => {
    try {
      await deleteList(
        window.localStorage.getItem("userId"),
        listId,
        window.localStorage.getItem("sessionToken")
      );
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
    const cacheId = getCacheId(fetchUserLists, [
      "CREATED",
      localStorage.getItem("userId"),
      localStorage.getItem("sessionToken"),
    ]);
    const cachedUserLists = JSON.parse(localStorage.getItem(cacheId)).lists;
    const newCachedUserLists = {lists: []};
    for (let i = 0; i < cachedUserLists.length; i++) {
      const list = cachedUserLists[i];
      if(list.id === listId) continue;
      newCachedUserLists.lists.push(list);
    }
    localStorage.setItem(cacheId, JSON.stringify(newCachedUserLists));
    setIsOpen(false);
  };
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
