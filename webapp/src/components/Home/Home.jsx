import React, { useState, useEffect } from "react";
import LoadingSpinner from "../Misc/LoadingSpinner";
import "../../styles/Home.css";
import { fetchTopLists, fetchNewLists } from "../../util/Endpoints/ListEP";
import { useHistory } from "react-router-dom";
import ListIndex from "../ListIndex";
import { ListCategory, ListCategoryToTitle } from "../../enums/ListCategory";
import NewLists from "./NewLists";
import Flame from "../../assets/flame.png";
import Home2 from "./NewHome";

export default function Home({ openModal }) {
  return <Home2 />
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [topLists, setTopLists] = useState([]);
  const [newLists, setNewLists] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const topListsRes = await fetchTopLists();
      setTopLists(topListsRes.data.lists);
      const newListsRes = await fetchNewLists();
      setNewLists(newListsRes.data.lists);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div id="home-main">
      <div id="category-container">
        {ListCategory.map((category, i) => (
          <div
            onClick={() => history.push(`/category/${category}`)}
            className="category-container-item"
            key={i}
          >
            <p>{ListCategoryToTitle[category]}</p>
          </div>
        ))}
      </div>
      <div id="top-and-new-lists-container">
        <div id="top-list-container">
          <div id="top-list-title-and-icon">
            <h3 id="home-title">Most Popular</h3>
            <img src={Flame} alt="flame" id="top-lists-icon"></img>
          </div>
          <ListIndex passedList={topLists} />
        </div>
        <div id="create-button-and-new-list-container">
          <div id="home-create-list-container">
            <button
              className="site-button"
              onClick={() =>
                localStorage.getItem("sessionToken")
                  ? history.push("/create-list")
                  : openModal(["login", "/create-list"])
              }
            >
              Create List
            </button>
          </div>
          <NewLists newLists={newLists} />
        </div>
      </div>
    </div>
  );
}
