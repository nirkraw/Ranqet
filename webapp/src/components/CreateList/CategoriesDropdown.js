import React from 'react';
import { ListCategory } from "../../enums/ListCategory";
import "../../styles/createList/CategoryDropdown.css";

export default function Categories({setCategory}) {
    return (
      <div id="category-selection-container">
        <p id="category-label">Category:</p>
        <select
          name="categories"
          id="categories"
          onChange={(e) => setCategory(e.currentTarget.value)}
        >
          <option disabled selected value>
            --SELECT--
          </option>
          {ListCategory.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    );
}
