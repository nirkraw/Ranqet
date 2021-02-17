import React from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import SearchInput from "./SearchBar/SearchInput";

export default function Navbar({openModal}) {
  
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
      <SearchInput />
      {!localStorage.getItem("sessionToken") ? (
        <div id="navbar-buttons-container">
          <div
            className="nav-session-button"
            onClick={() => openModal(["login"])}
          >
            Login
          </div>
          <div
            className="nav-session-button"
            onClick={() => openModal("signup")}
          >
            Sign Up
          </div>
        </div>
      ) : (
        <div id="navbar-buttons-container">
          <NavLink to="/create-list" className="nav-session-button">
            New List
          </NavLink>
          <NavLink
            to={`/profile/${localStorage.getItem("userId")}`}
            className="nav-session-button"
          >
            Profile
          </NavLink>
          <NavLink to="/login" onClick={logout} className="nav-session-button">
            Logout
          </NavLink>
        </div>
      )}
    </div>
  );
}
