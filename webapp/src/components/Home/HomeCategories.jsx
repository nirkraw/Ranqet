import React, { useState, useEffect } from "react";
import Tabs from "../Tabs";
import { ListCategory, ListCategoryToTitle } from "../../enums/ListCategory";
import { fetchCategoryList } from "../../util/Endpoints/ListEP";
import LoadingSpinner from "../Misc/LoadingSpinner";
import { useHistory } from "react-router-dom";
// import { fetchTopLists, fetchNewLists } from "../../util/Endpoints/ListEP";
import { fetchListOptionPair } from "../../util/Endpoints/OptionEP";
import "../../styles/HomeCategories.css";

export default function HomeCategories() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [currList, setCurrList] = useState([]);

  useEffect(() => {
    getLists("POPULAR");
    return () => setCache({});
  }, []);

  const getLists = async (category) => {
    try {
      setLoading(true);
      if (cache[category]) {
        setCurrList(cache[category]);
        setLoading(false);
      } else {
        const res = await fetchCategoryList(
          category,
          localStorage.getItem("userId"),
          localStorage.getItem("sessionToken")
        );

        setCurrList(res.data.lists);
        const cacheCopy = JSON.parse(JSON.stringify(cache));
        cacheCopy[category] = res.data.lists;
        setCache(cacheCopy);
        setLoading(false);
      }
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  const categoryObjects = ListCategory.map((category, i) => ({
    name: ListCategoryToTitle[category],
    type: category,
  }));

  if (loading) return <LoadingSpinner />;

  return (
    <div id="home-categories-container">
      <Tabs
        tabs={[...categoryObjects]}
        getLists={getLists}
        tabDirection="vertical"
        currList={currList}
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
