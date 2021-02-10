import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { fetchUser } from "../util/Endpoints";
import LoadingSpinner from "./Misc/LoadingSpinner";

export default function Navbar({ openModal }) {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear("userId");
    localStorage.clear("sessionToken");
    window.location.reload();
  };

  const fetchUserInfo = async () => {
    try {
      const res = await fetchUser(localStorage.getItem("userId"));
      setName(res.data.name);
      if (res.data.avatarUrl) setAvatarUrl(res.data.avatarUrl);
      setLoading(false);
    } catch (err) {
      alert("No User Info Found");
    }
  };

  return (
    <div id="nav-main">
      <NavLink to="/" id="navbar-title">
        rankit
      </NavLink>
      {!localStorage.getItem("sessionToken") ? (
        <div id="navbar-buttons-container">
          <div
            className="nav-session-button"
            onClick={() => openModal("login")}
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
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div id="navbar-image-and-name-container">
              <img
                src={avatarUrl}
                alt="user-profile"
                id="user-profile-image-navbar"
              ></img>
              <NavLink
                to={`/profile/${localStorage.getItem("userId")}`}
                className="nav-session-button"
              >
                Profile
              </NavLink>
            </div>
          )}
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
