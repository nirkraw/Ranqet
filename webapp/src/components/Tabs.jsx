import React from "react";
import "../styles/Tabs.css";
import HomeCategories from "./Home/HomeCategories";
import ListIndex from "./ListIndex";

export default function Tabs({
  tabs,
  tabDirection,
  currList,
  activeIdx,
  setActiveIdx,
  setFilter,
}) {
  const setTab = (i, tab) => {
    if (i === activeIdx) return;
    setActiveIdx(i);
    //for the HomeCategories tab we don't need to call an endpoint so doesn't have tab.filter
    if (tab.filter) setFilter(tab.filter)
  };

  let currTab;
  if (tabDirection === "horizontal" && activeIdx === 0) {
    currTab = <HomeCategories />;
  } else if (tabDirection === "horizontal" && activeIdx === 1) {
    currTab = (
      <ListIndex
        passedList={currList}
        trash={true}
        getCreatedLists={tabs[1].endpoint}
      />
    );
  } else {
    currTab = <ListIndex passedList={currList} />;
  }

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
      {currTab}
    </div>
  );
}
