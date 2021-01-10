import React from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {

  const logout = () => {
    localStorage.setItem("userId", "");
  }
  return (
    <div id="nav-main">
      <NavLink to="/" id="navbar-title">
        Ranker
      </NavLink>
      <div id="navbar-buttons-container">
        <NavLink to="/create-list" id="nav-create-new-list">
          + Create List
        </NavLink>
        <NavLink to="/create-user" className="nav-session-button">
          + New User
        </NavLink>
        {localStorage.getItem("userId") === "" ? (
          <NavLink to="/login" className="nav-session-button">
            Login
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            onClick={logout}
            className="nav-session-button"
          >
            Logout
          </NavLink>
        )}
      </div>
    </div>
  );
}
