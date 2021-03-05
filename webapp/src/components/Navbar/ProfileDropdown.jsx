import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchUser } from "../../util/Endpoints/UserEP";
import useEndpoint from "../useEndpoint";
import LoadingSpinner from "../Misc/LoadingSpinner";

export default function ProfileDropdown({ useOutsideAlerter }) {
  const [active, setActive] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);
  const [user, loadingOrError] = useEndpoint(fetchUser, [
    localStorage.getItem("userId"),
  ]);
  useOutsideAlerter(wrapperRef, setActive);

  useEffect(() => {
    if (loadingOrError === "loading") setLoading(true);
    else if (loadingOrError === "Not loading") setLoading(false);
    else history.push(`/error/${loadingOrError}`);
  }, [loadingOrError]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear("userId");
    localStorage.clear("sessionToken");
    window.location.reload();
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div id="profile-dropdown-main" className="justify-start-center">
      <div id="nav-user-profile-picture">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="profile-pic"></img>
        ) : null}
      </div>
      <h3 className="nav-session-button" onClick={() => setActive(!active)}>
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
        <div className="profile-dropdown-item-container" onClick={logout}>
          <p>Log Out</p>
        </div>
      </div>
    </div>
  );
}
