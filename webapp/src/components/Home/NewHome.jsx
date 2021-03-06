import React, { useState } from "react";
import { fetchUserLists } from "../../util/Endpoints/UserEP";
import Tabs from "../Tabs";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../Misc/LoadingSpinner";
import "../../styles/newHome.css";
import { UserFilterToTitle, UserFilter } from "../../enums/UserListFilter";

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
      }
      const res = await fetchUserLists(
        type,
        localStorage.getItem("userId"),
        localStorage.getItem("sessionToken")
      );
      setCurrList(res.data.lists);
      const cacheCopy = JSON.parse(JSON.stringify(cache));
      cacheCopy[type] = res.data.lists;
      setCache(cacheCopy);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  const userLists = UserFilter.map((filter) => ({
    name: UserFilterToTitle[filter],
    type: filter,
  }));

  return (
    <div id="newhome-main-container">
      <Tabs
        tabs={[
          {
            name: "All Lists",
          },
          ...userLists,
        ]}
        tabDirection="horizontal"
        currList={currList}
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
        getLists={getLists}
      />
    </div>
  );
}
