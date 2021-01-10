import React from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div id="nav-main">
      <NavLink to="/" id="navbar-title">
        Ranker
      </NavLink>
      <div id="navbar-buttons-container">
        <NavLink to="/create-list" id="nav-create-new-list">
          + Create List
        </NavLink>
        <NavLink to="create-user" className="nav-session-button">
          + New User
        </NavLink>
        <NavLink to="login" className="nav-session-button">
          Login
        </NavLink>
      </div>
    </div>
  );
}
