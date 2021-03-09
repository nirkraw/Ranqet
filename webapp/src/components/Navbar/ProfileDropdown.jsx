import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../Misc/LoadingSpinner";
import { useOutsideAlerter } from "../../util/useOutsideAlerter";
import { fetchUser } from "../../util/Endpoints/UserEP";
import useCache from "../../util/useCache";

export default function ProfileDropdown() {
  const [active, setActive] = useState(false);
  const history = useHistory();
  const wrapperRef = useRef(null);
  const [userInfoCacheId, loading] = useCache({
    fn: fetchUser,
    args: [localStorage.getItem("userId")],
    defaultValue: [],
    blocking: true,
  });
  const user = JSON.parse(localStorage.getItem(userInfoCacheId))
  useOutsideAlerter(wrapperRef, setActive);


  const logout = (e) => {
    e.preventDefault();
    localStorage.clear("userId");
    localStorage.clear("sessionToken");
    window.location.reload();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div
      id="profile-dropdown-main"
      className="justify-start-center"
      onClick={() => setActive(!active)}
    >
      <div id="nav-user-profile-picture">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="profile-pic"></img>
        ) : null}
      </div>
      <h3 className="nav-session-button">
        {user.name} <span>{String.fromCharCode(9660)}</span>
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
            history.push(`/create-list`);
            setActive(false);
          }}
        >
          <p>Create List</p>
        </div>
        <div className="profile-dropdown-item-container" onClick={logout}>
          <p>Log Out</p>
        </div>
      </div>
    </div>
  );
}
