import React, { useState, useEffect } from "react";
import Tabs from "../Tabs";
import { ListCategory, ListCategoryToTitle } from "../../enums/ListCategory";
import { fetchCategoryList } from "../../util/Endpoints/ListEP";
import LoadingSpinner from "../Misc/LoadingSpinner";
import { useHistory } from "react-router-dom";
import { fetchTopLists, fetchNewLists } from "../../util/Endpoints/ListEP";
import "../../styles/HomeCategories.css";

export default function HomeCategories() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [currList, setCurrList] = useState([]);

  useEffect(() => {
    getTopLists();
    return () => setCache({});
  }, []);

  const getLists = async (type, endpoint, args) => {
    try {
      setLoading(true);
      if (cache[type]) {
        setCurrList(cache[type]);
        setLoading(false);
      } else {
        const res = await endpoint(...args);
        setCurrList(res.data.lists);
        const cacheCopy = JSON.parse(JSON.stringify(cache));
        cacheCopy[type] = res.data.lists;
        setCache(cacheCopy);
        setLoading(false);
      }
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  const getCategoryLists = (categoryType) =>
    getLists(categoryType, fetchCategoryList, [categoryType]);

  const getTopLists = () => getLists("fetchTopLists", fetchTopLists, []);

  const getNewLists = () => getLists("getNewLists", fetchNewLists, []);

  const categoryObjects = ListCategory.map((category, i) => ({
    name: ListCategoryToTitle[category],
    type: category,
    endpoint: getCategoryLists,
  }));

  if (loading) return <LoadingSpinner />;

  return (
    <div id="home-categories-container">
      <Tabs
        tabs={[
          {
            name: "Popular",
            endpoint: getTopLists,
          },
          {
            name: "New",
            endpoint: getNewLists,
          },
          ...categoryObjects,
        ]}
        tabDirection="vertical"
        currList={currList}
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
      />
      <div className="home-create-list-button site-button-2">Create List</div>
    </div>
  );
}
