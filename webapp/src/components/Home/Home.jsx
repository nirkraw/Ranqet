import React, { useState } from "react";
import { fetchUserLists } from "../../util/Endpoints/UserEP";
import Tabs from "../Tabs";
import LoadingSpinner from "../Misc/LoadingSpinner";
import "../../styles/Home.css";
import { UserFilterToTitle, UserFilter } from "../../enums/UserListFilter";
import useCache from "../../util/useCache";

export default function Home() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [filter, setFilter] = useState("");
  //enabled:false on first render because we don't need a userList for HomeCategories 
  const [userListCacheId, loading] = useCache({
    fn: fetchUserLists,
    args: [
      filter,
      localStorage.getItem("userId"),
      localStorage.getItem("sessionToken"),
    ],
    enabled: Boolean(filter),
  });

  const data = JSON.parse(localStorage.getItem(userListCacheId));
  if (loading) return <LoadingSpinner />;

  const userLists = UserFilter.map((filter) => ({
    name: UserFilterToTitle[filter],
    filter,
  }));

  return (
    <div id="home-main-container">
      <Tabs
        tabs={[
          {
            name: "All Lists",
          },
          ...userLists,
        ]}
        tabDirection="horizontal"
        currList={data ? data.lists : []}
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
        setFilter={setFilter}
      />
    </div>
  );
}
