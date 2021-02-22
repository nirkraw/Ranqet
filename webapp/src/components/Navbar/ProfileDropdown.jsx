import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function ProfileDropdown() {
  const [active, setActive] = useState(false);
  const history = useHistory();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear("userId");
    localStorage.clear("sessionToken");
    window.location.reload();
  };

  useEffect(() => {
    function handleClickOutside() {
      setActive(false);
    }
    if (active) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [active]);

  return (
    <div id="profile-dropdown-main">
      <h3 className="nav-session-button" onClick={() => setActive(!active)}>
        Profile {String.fromCharCode(9660)}
      </h3>
      <div
        className={
          active
            ? "profile-dropdown-content active"
            : "profile-dropdown-content"
        }
      >
        <div className="profile-dropdown-item-container">
          <p
            onClick={() =>
              history.push(`/profile/${localStorage.getItem("userId")}`)
            }
          >
            Profile
          </p>
        </div>
        <div className="profile-dropdown-item-container">
          {" "}
          <p>Public Profile</p>
        </div>
        <div className="profile-dropdown-item-container">
          {" "}
          <p>My Lists</p>
        </div>
        <div className="profile-dropdown-item-container">
          <p>Completed Lists</p>
        </div>
        <div className="profile-dropdown-item-container">
          {" "}
          <p>In Progress Lists</p>
        </div>
      </div>
    </div>
  );
}
