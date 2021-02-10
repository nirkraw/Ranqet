import React, {useState} from 'react'
import SearchResults from "./SearchResults";
// import {fetchSearchResults} from "../../util/Endpoints";

export default function SearchInput() {
  const [results, setResults] = useState([]);
  
  // const search = async (lookupKey) => {
  //   try {
  //     const res = await fetchSearchResults(lookupKey);
  //     setResults(res.data.results);
  //   } catch(err) {
  //     alert("Unable to search");
  //   }
  // }

    return (
      <div>
        <input
          id="search-input"
          maxLength="32"
          type="text"
          onChange={(e) => search(e.target.value)}
        />
        <SearchResults results={results} />
      </div>
    );
}
