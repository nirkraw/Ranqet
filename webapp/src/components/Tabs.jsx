import React, { useState, useEffect } from "react";
import "../styles/Tabs.css";
import HomeCategories from "./Home/HomeCategories";
import ListIndex from "./ListIndex";

export default function Tabs({ tabs, tabDirection, currList, activeIdx, setActiveIdx }) {
  const [currTabContent, setCurrTabContent] = useState(null);

  useEffect(() => {
    if(tabDirection === "horizontal" && activeIdx === 0) setCurrTabContent(<HomeCategories />);
  }, [activeIdx]);

  const setTab = (i, tab) => {
    if(i === activeIdx) return;
    setActiveIdx(i);
    if (tab.endpoint && tab.type) tab.endpoint(tab.type);
    else if (tab.endpoint) tab.endpoint(i);
  };

  return (
    <div
      id="tabs-container-div"
      className={
        tabDirection === "horizontal" ? "justify-start" : "column-start"
      }
    >
      <ul
        className={
          tabDirection === "horizontal"
            ? "column-start tab-names-ul-horizontal"
            : "justify-start tab-names-ul"
        }
      >
        {tabs.map((tab, i) => (
          <li
            className={
              activeIdx === i ? "tab-names-li activeTab" : "tab-names-li"
            }
            id={tabDirection === "horizontal" ? "tab-names-li-horizontal" : ""}
            onClick={() => setTab(i, tab)}
            key={i}
          >
            <h1 className={activeIdx === i ? "activeTabText" : ""}>
              {tab.name}
            </h1>
          </li>
        ))}
      </ul>
      {currTabContent ? currTabContent : <ListIndex passedList={currList} />}
    </div>
  );
}
