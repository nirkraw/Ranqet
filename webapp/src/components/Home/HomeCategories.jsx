import React, { useState} from "react";
import Tabs from "../Tabs";
import { ListCategory, ListCategoryToTitle } from "../../enums/ListCategory";
import { fetchCategoryList } from "../../util/Endpoints/ListEP";
import LoadingSpinner from "../Misc/LoadingSpinner";
import { useHistory } from "react-router-dom";
import "../../styles/HomeCategories.css";
import useCache from "../../util/useCache";

export default function HomeCategories() {
  const history = useHistory();
  const [filter, setFilter] = useState("POPULAR");
  const [userListCacheId, loading] = useCache({
    fn: fetchCategoryList,
    args: [
      filter,
      localStorage.getItem("userId"),
      localStorage.getItem("sessionToken"),
    ],
  });

  if (loading) return <LoadingSpinner />;

  const categoryObjects = ListCategory.map((filter) => ({
    name: ListCategoryToTitle[filter],
    filter,
  }));

  return (
    <div id="home-categories-container">
      <Tabs
        tabs={[...categoryObjects]}
        setFilter={setFilter}
        tabDirection="vertical"
        cacheId={userListCacheId}
      />
      {localStorage.getItem("sessionToken") ? (
        <div
          className="home-create-list-button site-button-2"
          onClick={() => history.push("/create-list")}
        >
          Create List
        </div>
      ) : null}
    </div>
  );
}
