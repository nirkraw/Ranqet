import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ListIndex from "../ListIndex";

export default function UserTabs({
  completedLists,
  createdLists,
  inProgressLists,
  setCurrListId,
  setIsOpen,
  tabType,
  setTabType,
}) {
  const handleSelect = (key) => {
    setTabType(key);
  };

  return (
    <div id="tabs-container-div">
      <Tabs
        defaultActiveKey={tabType}
        activeKey={tabType}
        onSelect={handleSelect}
        id="tabs-container"
      >
        <Tab
          eventKey="completed"
          title="Completed"
          tabClassName="tab-container"
        >
          {completedLists.length ? (
            <ListIndex passedList={completedLists} />
          ) : (
            <div id="empty-list-container">
              <h1>No Lists</h1>
            </div>
          )}
        </Tab>
        <Tab
          eventKey="inProgress"
          title="In Progress"
          tabClassName="tab-container"
        >
          {inProgressLists.length ? (
            <ListIndex passedList={inProgressLists} />
          ) : (
            <div id="empty-list-container">
              <h1>No Lists</h1>
            </div>
          )}
        </Tab>
        <Tab eventKey="created" title="My Lists" tabClassName="tab-container">
          {createdLists.length ? (
            <ListIndex
              passedList={createdLists}
              trash={true}
              setCurrListId={setCurrListId}
              setIsOpen={setIsOpen}
            />
          ) : (
            <div id="empty-list-container">
              <h1>No Lists</h1>
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
