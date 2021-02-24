import React, { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function SavePresetOptions({
  isOpen,
  setSavePresetModalOpen,
  options,
}) {
  const [privacy, setPrivacy] = useState("Public");
  const [title, setTitle] = useState("");

  return (
    <Modal isOpen={isOpen} className="Modal-Save" overlayClassName="Overlay">
      <div id="save-preset-container">
        <div className="preset-input-container">
          <label className="preset-input-label">Preset Name</label>
          <input
            id="preset-privacy-input"
            maxLength="32"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="preset-input-container">
          <label className="preset-input-label">Preset Privacy</label>
          <select
            name="preset-privacy"
            id="preset-privacy"
            onChange={(e) => setPrivacy(e.currentTarget.value)}
            defaultValue="Public"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div id="save-preset-options-button-container">
          <button onClick={() => setSavePresetModalOpen(false)}>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    </Modal>
  );
}
