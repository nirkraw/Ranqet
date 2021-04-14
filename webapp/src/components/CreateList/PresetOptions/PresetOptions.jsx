// currently not in use
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../../../styles/createList/PresetOptions.css";
import PresetOptionsDisplay from "./PresetOptionsDisplay";
import PresetOptionsList from "./PresetOptionsList";
import { useHistory } from "react-router-dom";
import { fetchListPresets } from "../../../util/Endpoints/ListEP";
Modal.setAppElement("#root");

export default function PresetOptions({
  isOpen,
  setPresetModalOpen,
  setOptions,
}) {
  const [currOptions, setCurrOptions] = useState(null);
  const [presets, setPresets] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchCurrPresets();
  }, []);

  const fetchCurrPresets = async () => {
    try {
      const res = await fetchListPresets(
        localStorage.getItem("userId"),
        localStorage.getItem("sessionToken")
      );
      setPresets(res.data.presets);
    } catch (err) {
      history.push(`/error/${err}`);
    }
  };

  const setPresetOptions = () => {
    let optionsIdx = 0;
    const newOptions = [];
    for (let i = 0; i < currOptions.length; i++) {
      if (currOptions[i] && currOptions[i].selected) {
        newOptions[optionsIdx] = currOptions[i];
        optionsIdx++;
      }
    }

    setOptions(newOptions);
    setPresetModalOpen(false);
  };

  return (
    <Modal isOpen={isOpen} className="Modal" overlayClassName="Overlay">
      <div id="preset-options-main-container">
        <div id="preset-options-sub-container">
          <PresetOptionsList
            presets={presets}
            setCurrOptions={setCurrOptions}
            fetchCurrPresets={fetchCurrPresets}
          />
          <PresetOptionsDisplay
            options={currOptions}
            setCurrOptions={setCurrOptions}
          />
        </div>
        <div id="preset-options-button-container">
          <button onClick={() => setPresetModalOpen(false)}>Close</button>
          <button onClick={setPresetOptions}>Choose Preset</button>
        </div>
      </div>
    </Modal>
  );
}
