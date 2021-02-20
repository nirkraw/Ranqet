import React from 'react'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PresetOptionsTab from "./PresetOptionsTab"

export default function PresetOptionsTabs({presets, setCurrOptions}) {
    return (
      <div id="options-tabs-container">
        <Tabs defaultActiveKey="Personal" id="tabs-container">
          <Tab
            eventKey="Personal"
            title="Personal"
            tabClassName="tab-container"
          >
            <PresetOptionsTab
              presets={presets} //change to correct list when endpoint is available
              setCurrOptions={setCurrOptions}
            />
          </Tab>
          <Tab eventKey="Public" title="Public" tabClassName="tab-container">
            <PresetOptionsTab
              presets={presets} //change to correct list when endpoint is available
              setCurrOptions={setCurrOptions}
            />
          </Tab>
        </Tabs>
      </div>
    );
}
