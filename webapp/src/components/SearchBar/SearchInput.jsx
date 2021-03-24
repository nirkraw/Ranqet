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
  const debounceSave = useCallback(
    debounce((lookupKey) => search(lookupKey), 500),
    []
  );
  const history = useHistory();
  const searchWrapper = useRef(null);
  useOutsideAlerter(searchWrapper, setActive);

  useEffect(() => {
    if(!searchVal) setShowResults(false);
    else setShowResults(true);
  }, [searchVal]);

  const handleChange = (e) => {
    const lookupKey = e.target.value;
    debounceSave(lookupKey);
  };

  const search = async (lookupKey) => {
    if (!lookupKey) localStorage.removeItem("searchResults");
    else {
      let res;
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
        localStorage.setItem("searchResults", JSON.stringify(res.data));
      } catch (err) {
        history.push(`/error/${err.message}`);
      }
    }
    setSearchVal(lookupKey);
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
