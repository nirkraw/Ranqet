import React from 'react';
import { ListCategory, ListCategoryToTitle } from "../../enums/ListCategory";
import "../../styles/createList/CategoryDropdown.css";

export default function Categories({setCategory}) {
    return (
      <div id="category-selection-container">
        <select
          name="categories"
          id="category-input"
          onChange={(e) => setCategory(e.currentTarget.value)}
          defaultValue="Select a category"
        >
          <option disabled>Select a category</option>
          {ListCategory.map((category, i) => {
            if (category === "NEW" || category === "POPULAR") return "";
            return (
              <option key={i} value={category} className="category-option">
                {ListCategoryToTitle[category]}
              </option>
            );
          })}
        </select>
      </div>
    );
}
