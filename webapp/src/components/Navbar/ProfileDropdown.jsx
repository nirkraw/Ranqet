import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

export default function ProfileDropdown({ useOutsideAlerter, setTabType }) {
  const [active, setActive] = useState(false);
  const history = useHistory();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setActive);

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear("userId");
    localStorage.clear("sessionToken");
    window.location.reload();
  };

  return (
    <div id="profile-dropdown-main">
      <h3 className="nav-session-button" onClick={() => setActive(true)}>
        Profile {String.fromCharCode(9660)}
      </h3>
      <div
        className={
          active
            ? "profile-dropdown-content active"
            : "profile-dropdown-content"
        }
        ref={wrapperRef}
      >
        <div
          className="profile-dropdown-item-container"
          onClick={() => {
            history.push(`/profile/${localStorage.getItem("userId")}`);
            setActive(false);
          }}
        >
          <p>View Profile</p>
        </div>
        <div
          className="profile-dropdown-item-container"
          onClick={() => {
            history.push(`/profile/${localStorage.getItem("userId")}`);
            setActive(false);
            setTabType("created");
          }}
        >
          <p>My Lists</p>
        </div>
        <div
          className="profile-dropdown-item-container"
          onClick={() => {
            history.push(`/profile/${localStorage.getItem("userId")}`);
            setActive(false);
            setTabType("completed");
          }}
        >
          <p>Completed Lists</p>
        </div>
        <div
          className="profile-dropdown-item-container"
          onClick={() => {
            history.push(`/profile/${localStorage.getItem("userId")}`);
            setActive(false);
            setTabType("inProgress");
          }}
        >
          <p>In Progress Lists</p>
        </div>
        <div className="profile-dropdown-item-container" onClick={logout}>
          <p>Log Out</p>
        </div>
      </div>
    </div>
  );
}
