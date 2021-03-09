import React, { useState } from "react";
import { fetchUserLists } from "../../util/Endpoints/UserEP";
import Tabs from "../Tabs";
import LoadingSpinner from "../Misc/LoadingSpinner";
import "../../styles/Home.css";
import { UserFilterToTitle, UserFilter } from "../../enums/UserListFilter";
import useCache from "../useCache";

export default function Home() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [filter, setFilter] = useState("");
  //returnDefault of false prevents fetch on first render since we don't need a userList
  const [data, loading] = useCache({
    fn: fetchUserLists,
    args: [
      filter,
      localStorage.getItem("userId"),
      localStorage.getItem("sessionToken"),
    ],
    defaultValue: [],
    running: Boolean(filter),
  });

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
        currList={data.lists}
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
        setFilter={setFilter}
      />
    </div>
  );
}
