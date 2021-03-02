import React, { useState, useEffect} from "react";
import ListIndex from "./ListIndex";
import "../styles/Tabs.css"

export default function Tabs({ tabs }) {
  const [currTab, setCurrTab] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
     if(!currTab.length && tabs.length) setCurrTab(tabs[0].list)
  }, [tabs])

  const setTab = (i, tabList) => {
    setCurrTab(tabList);
    setActiveIdx(i);
  };

  return (
    <div id="tabs-container-div" className="column-start">
      <ul id="tab-names-ul" className="justify-start">
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
