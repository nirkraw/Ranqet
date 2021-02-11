import React, { useState } from "react";
import SearchResults from "./SearchResults";
import { useHistory } from "react-router-dom";
// import {fetchSearchResults} from "../../util/Endpoints";
import "../../styles/SearchBar.css";
import SearchIcon from "../../assets/searchIcon.png"

export default function SearchInput() {
  const history = useHistory();
  const sampleResults = [
    {
      id: "beb0903a-fdeb-46b6-861f-dfd8972fa8a3",
      title: "Best TV Shows of 2020",
      imageUrl:
        "https://ranker-dev.s3.us-east-1.amazonaws.com/1611028699671-tv.jpeg",
    },
    {
      id: "655201c5-7884-4843-9c44-6002dbd65109",
      title: "some list",
      imageUrl: null,
    },
    {
      id: "e81acbea-39d0-4691-908b-99527699153e",
      title: "Best TV Shows",
      imageUrl:
        "https://ranker-dev.s3.us-east-1.amazonaws.com/1611109364794-tv.jpeg",
    },
  ];
  const [results, setResults] = useState([]);
  const [searchVal, setSearchVal] = useState("");


  const search = async (lookupKey) => {
    setSearchVal(lookupKey);
    try {
      // const res = await fetchSearchResults(lookupKey);
      // setResults(res.data.results);
      setResults(sampleResults);
    } catch (err) {
      alert("Unable to search");
    }
  };

  const handleKeyDown = (e) => {
    if(e.keyCode === 13) history.push(`/search/${searchVal}`);
  }

  return (
    <div id="search-bar-container">
      <div id="search-input-and-icon">
        <input
          id="search-input"
          placeholder="Search"
          maxLength="32"
          type="text"
          onKeyDown={handleKeyDown}
          onChange={(e) => search(e.target.value)}
        />
        <img
          onClick={() => history.push(`/search/${searchVal}`)}
          id="search-icon"
          src={SearchIcon}
          alt="search"
        />
      </div>
      <SearchResults results={results} />
    </div>
  );
}
