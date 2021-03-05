import LoadingSpinner from "../Misc/LoadingSpinner";
import { fetchUserPublicList } from "../../util/Endpoints/UserEP";
import "../../styles/UserProfile.css";
import UserInfo from "./UserInfo";
import { useRouteMatch } from "react-router-dom";
import ListIndex from "../ListIndex";
import useEndpoint from "../useEndpoint.js";

export default function UserProfile() {
  const match = useRouteMatch();
  const [data, loading] = useEndpoint(fetchUserPublicList, [
    match.params.userId,
  ]);

  if (loading) return <LoadingSpinner />;

  if (!data.lists) return null;
  return (
    <div id="user-profile-main-container">
      <UserInfo numCreated={data.lists.length} />
      <div id="tabs-container-div">
        <ListIndex passedList={data.lists} />
      </div>
    </div>
  );
}
