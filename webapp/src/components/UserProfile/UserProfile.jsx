import LoadingSpinner from "../Misc/LoadingSpinner";
import { fetchUserPublicList } from "../../util/Endpoints/UserEP";
import "../../styles/UserProfile.css";
import UserInfo from "./UserInfo";
import { useRouteMatch } from "react-router-dom";
import ListIndex from "../ListIndex";
import useCache from "../../util/useCache.js";

export default function UserProfile() {
  const match = useRouteMatch();
  const [userListCacheId, loading] = useCache({
    fn: fetchUserPublicList,
    args: [match.params.userId],
  });
  const data = JSON.parse(localStorage.getItem(userListCacheId));
  if (loading) return <LoadingSpinner />;

  return (
    <div id="user-profile-main-container">
      <UserInfo numCreated={data.lists.length} />
      <ListIndex passedList={data.lists} />
    </div>
  );
}
