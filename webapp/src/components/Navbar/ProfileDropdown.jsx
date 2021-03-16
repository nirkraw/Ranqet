import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../Misc/LoadingSpinner";
import { useOutsideAlerter } from "../../util/useOutsideAlerter";
import { fetchUser } from "../../util/Endpoints/UserEP";
import useCache from "../../util/useCache";
import { getCacheId } from "../../util/getCacheId";

export default function ProfileDropdown() {
  const [userInfoCacheId] = useCache({
    fn: fetchUser,
    args: [localStorage.getItem("userId")]
  });
  const [active, setActive] = useState(false);
  const history = useHistory();
  const wrapperRef = useRef(null);
  const [cacheId] = useState(
    getCacheId(fetchUser, [localStorage.getItem("userId")])
  );
  useOutsideAlerter(wrapperRef, setActive);

  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const updateUserInfo = () => {
      setUserInfo(JSON.parse(localStorage.getItem(cacheId)));
    };
    window.addEventListener("editStorage", updateUserInfo);
    return () => {
      window.removeEventListener("editStorage", updateUserInfo);
    };
  }, []);


  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem(userInfoCacheId)));
  }, [userInfoCacheId]);

  if (!userInfo) return <LoadingSpinner />;

  const { username, avatarUrl } = userInfo;

  const logout = (e) => {
    e.preventDefault();
    window.location.reload();
    localStorage.removeItem("userId");
    localStorage.removeItem("sessionToken");
  };

  return (
    <div
      id="profile-dropdown-main"
      className="justify-start-center"
      onClick={() => setActive(!active)}
    >
      <div id="nav-user-profile-picture">
        {avatarUrl ? <img src={avatarUrl} alt="profile-pic"></img> : null}
      </div>
      <h3 className="nav-session-button">
        {username} <span>{String.fromCharCode(9660)}</span>
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
            history.push(`./profile/${localStorage.getItem("userId")}`);
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
