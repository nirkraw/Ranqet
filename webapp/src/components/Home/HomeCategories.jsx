import React, { useState } from "react";
import Tabs from "../Tabs";
import { ListCategory, ListCategoryToTitle } from "../../enums/ListCategory";
import { fetchCategoryList } from "../../util/Endpoints/ListEP";
import LoadingSpinner from "../Misc/LoadingSpinner";
import { useHistory } from "react-router-dom";
import "../../styles/HomeCategories.css";
import useCache from "../useCache";

export default function HomeCategories() {
  const [activeIdx, setActiveIdx] = useState(0);
  const history = useHistory();
  const [filter, setFilter] = useState("POPULAR");
  const [data, loading] = useCache({
    fn: fetchCategoryList,
    args: [
      filter,
      localStorage.getItem("userId"),
      localStorage.getItem("sessionToken"),
    ],
    defaultValue: []
  });

  const categoryObjects = ListCategory.map((filter) => ({
    name: ListCategoryToTitle[filter],
    filter,
  }));

  if (loading) return <LoadingSpinner />;

  return (
    <div id="home-categories-container">
      <Tabs
        tabs={[...categoryObjects]}
        setFilter={setFilter}
        tabDirection="vertical"
        currList={data.lists}
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
      />
      <div
        className="home-create-list-button site-button-2"
        onClick={() => history.push("./create-list")}
      >
        Create List
      </div>
    </div>
  );
}
