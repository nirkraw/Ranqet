import LoadingSpinner from "../Misc/LoadingSpinner";
import { fetchUserPublicList } from "../../util/Endpoints/UserEP";
import "../../styles/UserProfile.css";
import UserInfo from "./UserInfo";
import { useRouteMatch } from "react-router-dom";
import ListIndex from "../ListIndex";
import useCache from "../../util/useCache.js";

export default function UserProfile({ userInfo, setUserInfo }) {
  const match = useRouteMatch();
  const [userListCacheId, userListloading] = useCache({
    fn: fetchUserPublicList,
    args: [match.params.userId]
  });
  const data = JSON.parse(localStorage.getItem(userListCacheId));
  if (userListloading) return <LoadingSpinner />;

  return (
    <div id="user-profile-main-container">
      <UserInfo
        numCreated={data.lists.length}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <div id="tabs-container-div">
        <ListIndex passedList={data.lists} />
      </div>
    </div>
  );
}
