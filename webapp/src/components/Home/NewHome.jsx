import React, { useState } from "react";
import { fetchUserLists } from "../../util/Endpoints/UserEP";
import Tabs from "../Tabs";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../Misc/LoadingSpinner";
import "../../styles/newHome.css";

export default function NewHome() {
  const history = useHistory();
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [currList, setCurrList] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);

  const getLists = async (type) => {
    try {
      setLoading(true);
      if (cache[type]) {
        setCurrList(cache[type]);
        setLoading(false);
      } else {
        const res = await fetchUserLists(
          localStorage.getItem("userId"),
          localStorage.getItem("sessionToken")
        );
        setCurrList(res.data[type]);
        const cacheCopy = JSON.parse(JSON.stringify(cache));
        cacheCopy[type] = res.data[type];
        setCache(cacheCopy);
        setLoading(false);
      }
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  const getInProgressLists = () => getLists("inProgressLists");
  const getCreatedLists = () => getLists("createdLists");
  const getCompletedLists = () => getLists("completedLists");

  if (loading) return <LoadingSpinner />;

  return (
    <div id="newhome-main-container">
      <Tabs
        tabs={[
          {
            name: "All Lists",
          },
          {
            name: "My Lists",
            endpoint: getCreatedLists,
          },
          {
            name: "In Progress",
            endpoint: getInProgressLists,
          },
          {
            name: "Completed",
            endpoint: getCompletedLists,
          },
        ]}
        tabDirection="horizontal"
        currList={currList}
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
      />
    </div>
  );
}
