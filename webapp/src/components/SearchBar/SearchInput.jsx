import React, { useState, useRef, useCallback, useEffect } from "react";
import SearchResults from "./SearchResults";
import { useHistory } from "react-router-dom";
import "../../styles/SearchBar.css";
import SearchIcon from "../../assets/searchIcon.png";
import { searchForLists } from "../../util/Endpoints/ListEP";
import debounce from "lodash.debounce";
import { useOutsideAlerter } from "../../util/useOutsideAlerter";

export default function SearchInput() {
  const [active, setActive] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [showResults, setShowResults] = useState(false)
  //stops from making backend calls with every new key and instead searches for amounts of new keys inputed in half a second
  const debounceSave = useCallback(
    debounce((lookupKey) => search(lookupKey), 500),
    []
  );
  const history = useHistory();
  const searchWrapper = useRef(null);
  useOutsideAlerter(searchWrapper, setActive, "mousedown"); // deactives results if user clicks outside input

  useEffect(() => {
    if(!searchVal) setShowResults(false); //if input is empty do not show results
    else setShowResults(true);
  }, [searchVal]);

  const handleChange = (e) => {
    const lookupKey = e.target.value;
    debounceSave(lookupKey);
  };

  const search = async (lookupKey) => {
    if (!lookupKey) localStorage.removeItem("searchResults"); //clears search cache if user erases their type
    else {
      let res;
      //search results from logged in user will take them to quiz or rankings based on whether they've completed
      //search results for not logged in user authomatically will send to rankings
      try {
        if (localStorage.getItem("sessionToken")) {
          res = await searchForLists(
            lookupKey,
            localStorage.getItem("sessionToken"),
            localStorage.getItem("userId")
          );
        } else {
          res = await searchForLists(lookupKey, "", "");
        }
        localStorage.setItem("searchResults", JSON.stringify(res.data)); //stores result in cache
      } catch (err) {
        history.push(`/error/${err.message}`);
      }
    }
    setSearchVal(lookupKey); //update input with typed keys
  };

  const handleSubmit = () => {
    if (!searchVal) return;
    setSearchVal("");
    history.push(`/search/${searchVal}`);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) handleSubmit();
  };

  return (
    <div id="search-bar-container">
      <div id="search-input-and-icon">
        <input
          id="search-input"
          placeholder="Search"
          maxLength="32"
          type="text"
          onKeyDown={handleKeyDown}
          onChange={(e) => handleChange(e)}
          onClick={() => setActive(true)}
        />
        <div id="search-icon-container">
          <img
            onClick={handleSubmit}
            id="search-icon"
            src={SearchIcon}
            alt="search"
          />
        </div>
      </div>
      <SearchResults
        searchWrapper={searchWrapper}
        active={active}
        setActive={setActive}
        showResults={showResults} 
      />
    </div>
  );
}
