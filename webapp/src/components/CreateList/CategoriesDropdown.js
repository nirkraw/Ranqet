import React from 'react';
import { ListCategory } from "../../enums/ListCategory";
import "../../styles/createList/CategoryDropdown.css";

export default function Categories({setCategory}) {
    return (
      <div id="category-selection-container">
        <p id="category-label">Category:</p>
        <select
          name="categories"
          id="category-input"
          onChange={(e) => setCategory(e.currentTarget.value)}
          defaultValue="-- SELECT --"
        >
          <option disabled>-- SELECT --</option>
          {ListCategory.map((category, i) => {
            if(category === "NEW" || category === "POPULAR") return "";
            return (
            <option key={i} value={category} className="category-option">
              {category}
            </option>
          )})}
        </select>
      </div>
    );
}
