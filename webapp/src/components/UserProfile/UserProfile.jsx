import React, { useState, useEffect } from "react";
import LoadingSpinner from "../Misc/LoadingSpinner";
import { fetchUserPublicList } from "../../util/Endpoints/UserEP";
import "../../styles/UserProfile.css";
import UserInfo from "./UserInfo";
import { useRouteMatch, useHistory } from "react-router-dom";
import ListIndex from "../ListIndex";
import useEndpoint from "../useEndpoint.js";

export default function UserProfile() {
  const match = useRouteMatch();
  const history = useHistory();
  const [publicLists, setPublicLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, loadingOrError] = useEndpoint(fetchUserPublicList, [
    match.params.userId,
  ]);

  useEffect(() => {
    if (loadingOrError === "loading") setLoading(true);
    else if (loadingOrError === "Not loading") setLoading(false);
    else history.push(`/error/${loadingOrError}`);

    if(data.lists && data.lists.length) setPublicLists(data.lists)
  }, [loadingOrError, data]);


  if (loading) return <LoadingSpinner />;

  return (
    <div id="user-profile-main-container">
      <UserInfo numCreated={publicLists.length} />
      <div id="tabs-container-div">
        <ListIndex passedList={publicLists} />
      </div>
    </div>
  );
}
