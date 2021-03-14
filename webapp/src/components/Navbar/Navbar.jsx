import React from "react";
import "../../styles/Navbar.css";
import SearchInput from "../SearchBar/SearchInput";
import ProfileDropdown from "./ProfileDropdown";
import { useHistory } from "react-router-dom";

export default function Navbar({ openModal, userInfo }) {
  const history = useHistory();

  return (
    <div id="nav-main">
      <h3 onClick={() => history.push(`/`)} id="navbar-title">
        ranqet
      </h3>
      <SearchInput />
      {!localStorage.getItem("sessionToken") ? (
        <div id="navbar-buttons-container">
          <div
            className="nav-session-button"
            onClick={() => openModal({ formType: "login", route: "" })}
          >
            Login
          </div>
          <div
            className="nav-session-button"
            onClick={() => openModal({ formType: "signup", route: "" })}
          >
            Sign Up
          </div>
        </div>
      ) : (
        <div id="navbar-buttons-container">
          <ProfileDropdown userInfo={userInfo} />
        </div>
      )}
    </div>
  );
}
