import React from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear("userId");
    localStorage.clear("sessionToken");
    window.location.reload();
  };

  return (
    <div id="nav-main">
      <NavLink to="/" id="navbar-title">
        rankit
      </NavLink>
      {!localStorage.getItem("sessionToken") ? (
        <div id="navbar-buttons-container">
          <NavLink to="/create-user" className="nav-session-button">
            Sign-Up
          </NavLink>
          <NavLink to="/login" className="nav-session-button" >
            Login
          </NavLink>
        </div>
      ) : (
        <div id="navbar-buttons-container">
          <NavLink
            to={`/profile/${localStorage.getItem("userId")}`}
            className="nav-session-button"
          >
            Profile
          </NavLink>
          <NavLink to="/create-list" className="nav-session-button">
            New List
          </NavLink>
          <NavLink to="/login" onClick={logout} className="nav-session-button">
            Logout
          </NavLink>
        </div>
      )}
    </div>
  );
}
