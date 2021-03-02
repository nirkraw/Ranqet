import React, { useState} from "react";
import ListIndex from "./ListIndex";
import "../styles/Tabs.css"

export default function Tabs({ tabs }) {
  const [currTab, setCurrTab] = useState(tabs.length ? tabs[0].list : []);
  const [activeIdx, setActiveIdx] = useState(0);

  const setTab = (i, tabList) => {
    setCurrTab(tabList);
    setActiveIdx(i);
  };

  return (
    <div id="tabs-container-div">
      <ul id="tab-names-ul">
        {tabs.map((tab, i) => (
          <li
            className={
              activeIdx === i ? "tab-names-li activeTab" : "tab-names-li"
            }
            onClick={() => setTab(i, tab.list)}
            key={i}
          >
            <h1
              className={
                activeIdx === i ? "activeTabText" : ""
              }
            >
              {tab.name}
            </h1>
          </li>
        ))}
      </ul>

      <ListIndex passedList={currTab} />
    </div>
  );
}
