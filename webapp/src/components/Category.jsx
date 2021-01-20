import React from 'react';
import {useRouteMatch } from "react-router-dom";

export default function Category() {
    const match = useRouteMatch();
    return (
      <div>
        <h1>Welcome to {match.params.categoryType}</h1>
      </div>
    );
}
