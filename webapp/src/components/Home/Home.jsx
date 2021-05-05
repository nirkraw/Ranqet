import React, { useState, useEffect } from "react";
import { fetchUserLists } from "../../util/Endpoints/UserEP";
import { fetchCategoryList } from "../../util/Endpoints/ListEP";
import Tabs from "../Tabs";
import LoadingSpinner from "../Misc/LoadingSpinner";
import "../../styles/Home.css";
import { UserFilterToTitle, UserFilter } from "../../enums/UserListFilter";
import { ListCategory } from "../../enums/ListCategory";
import useCache from "../../util/useCache";
import { clearEndpointCache } from "../../util/clearEndpointCache";

export default function Home() {
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
  
  //clears cache upon leaving home page
  useEffect(() => {
    return () => {
      for (let filter of UserFilter) {
        clearEndpointCache(fetchUserLists, [
          filter,
          localStorage.getItem("userId"),
          localStorage.getItem("sessionToken"),
        ]);
      }
      for (let filter of ListCategory) {
        clearEndpointCache(fetchCategoryList, [
          filter,
          localStorage.getItem("userId"),
          localStorage.getItem("sessionToken"),
        ]);
      }
    };
  }, []);

  if (loading) return <LoadingSpinner />;

  const userLists = localStorage.getItem("sessionToken")
    ? UserFilter.map((filter) => ({
        name: UserFilterToTitle[filter],
        filter, //filter sets which list is loaded from the useCache function's loadEndpoint()
      }))
    : [];

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
        cacheId={userListCacheId}
        setFilter={setFilter}
      />
    </div>
  );
}
