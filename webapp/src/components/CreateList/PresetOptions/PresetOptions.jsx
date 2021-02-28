import React, { useState } from "react";
import Modal from "react-modal";
import "../../../styles/createList/PresetOptions.css";
import PresetOptionsDisplay from "./PresetOptionsDisplay";
import PresetOptionsTabs from "./PresetOptionsTabs";
Modal.setAppElement("#root");

export default function PresetOptions({
  isOpen,
  setPresetModalOpen,
  setOptions,
  options,
}) {
  const [currOptions, setCurrOptions] = useState(null);
  const basketballPlayers = [
    {
      name: "Lebron James",
      photoUrl:
        "https://media2.giphy.com/media/26vUGuV1WxhbkEKZy/200.gif?cid=51413b55f8rtbt1infu60hkdzgm7dit636vfuyu3lo8pdaar&rid=200.gif",
      selected: false,
    },
    {
      name: "Kevin Durant",
      photoUrl:
        "https://media2.giphy.com/media/Yl5i129jGy6eblZdAb/200.gif?cid=51413b55800kt6mirecawcjjo3p74pig192j00j5qppocdow&rid=200.gif",
      selected: false,
    },
    {
      name: "Kyrie Irving",
      photoUrl:
        "https://media4.giphy.com/media/l3V0IEJ0TLPbCCkDK/200.gif?cid=51413b55qywzlzm4j1fx34n95vx5zwhgpf73lmbsxzmktpfg&rid=200.gif",
      selected: false,
    },
  ];

  const politicians = [
    {
      name: "Barak Obama",
      photoUrl:
        "https://media3.giphy.com/media/3ohA2M1VhQtitqzLP2/200.gif?cid=51413b55ulrifit245qhro016nfd68blva6iup04uxmmruat&rid=200.gif",
      selected: false,
    },
    {
      name: "Joe Biden",
      photoUrl:
        "https://media0.giphy.com/media/HRyEK9KBJGswKuccof/200.gif?cid=51413b55y2gde4ol4n981vr8mzqx0wjsce3kj784jl0lmabc&rid=200.gif",
      selected: false,
    },
  ];

  const myPresets = [
    { title: "Politicians", options: politicians },
    { title: "Basketball Players", options: basketballPlayers },
  ];

  const setPresetOptions = () => {
    let optionsIdx = 0;
    for (let i = 0; i < currOptions.length; i++) {
      if (currOptions[i] && currOptions[i].selected) {
        options[optionsIdx] = currOptions[i];
        optionsIdx++;
      } 
    }
    for (let i = optionsIdx; i < options.length; i++) {
      options[i] = {name: "", photoUrl: ""};
      
    }
    setOptions(options);
    setPresetModalOpen(false);
  };

  return (
    <Modal isOpen={isOpen} className="Modal" overlayClassName="Overlay">
      <div id="preset-options-main-container">
        <div id="preset-options-sub-container">
          <PresetOptionsTabs
            presets={myPresets}
            setCurrOptions={setCurrOptions}
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
