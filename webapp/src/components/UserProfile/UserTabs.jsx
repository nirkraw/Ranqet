import React from 'react'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ListIndex from "../ListIndex";

export default function UserTabs({completedLists, createdLists, inProgressLists, setCurrListId, setIsOpen}) {
    return (
      <div id="tabs-container-div">
        <Tabs defaultActiveKey="completed" id="tabs-container">
          <Tab
            eventKey="completed"
            title="Completed"
            tabClassName="tab-container"
          >
            <ListIndex passedList={completedLists} />
          </Tab>
          <Tab eventKey="created" title="Created" tabClassName="tab-container">
            <ListIndex
              passedList={createdLists}
              trash={true}
              setCurrListId={setCurrListId}
              setIsOpen={setIsOpen}
            />
          </Tab>
          <Tab
            eventKey="inProgress"
            title="In Progress"
            tabClassName="tab-container"
          >
            <ListIndex passedList={inProgressLists} />
          </Tab>
        </Tabs>
      </div>
    );
}
