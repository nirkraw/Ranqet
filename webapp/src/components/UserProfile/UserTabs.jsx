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
          <ListIndex passedList={completedLists} />
        </Tab>
        <Tab
          eventKey="inProgress"
          title="In Progress"
          tabClassName="tab-container"
        >
          <ListIndex passedList={inProgressLists} />
        </Tab>
        <Tab eventKey="created" title="My Lists" tabClassName="tab-container">
          <ListIndex
            passedList={createdLists}
            trash={true}
            setCurrListId={setCurrListId}
            setIsOpen={setIsOpen}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
