import LoadingSpinner from "../Misc/LoadingSpinner";
import { fetchUserPublicList } from "../../util/Endpoints/UserEP";
import "../../styles/UserProfile.css";
import UserInfo from "./UserInfo";
import { useRouteMatch } from "react-router-dom";
import ListIndex from "../ListIndex";
import useCache from "../../util/useCache.js";

export default function UserProfile() {
  const match = useRouteMatch();
  const [userListCacheId] = useCache({
    fn: fetchUserPublicList,
    args: [match.params.userId],
  });

  if (!userListCacheId) return <LoadingSpinner />;
  const data = JSON.parse(localStorage.getItem(userListCacheId));
  
  return (
    <div className="user-profile-main-container column-start-center">
      <UserInfo lists={data.lists} />
      <ListIndex cacheId={userListCacheId} />
    </div>
  );
}
