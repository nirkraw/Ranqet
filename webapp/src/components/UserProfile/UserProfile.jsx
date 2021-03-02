import React, { useState, useEffect } from "react";
import LoadingSpinner from "../Misc/LoadingSpinner";
import {
  fetchUserLists,
  fetchUserPublicList,
} from "../../util/Endpoints/UserEP";
import "../../styles/UserProfile.css";
import ConfirmationModal from "../ConfirmModal";
import UserInfo from "./UserInfo";
import { useRouteMatch, useHistory } from "react-router-dom";
import UserTabs from "./UserTabs";
import ListIndex from "../ListIndex";
import Tabs from "../Tabs";

export default function UserProfile({ tabType, setTabType }) {
  const match = useRouteMatch();
  const history = useHistory();
  const [completedLists, setCompletedLists] = useState([]);
  const [inProgressLists, setInProgressLists] = useState([]);
  const [createdLists, setCreatedLists] = useState([]);
  const [publicLists, setPublicLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currListId, setCurrListId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [publicFacing, setPublicFacing] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userId") === match.params.userId) fetchLists();
  }, [match.params.userId]);

  useEffect(() => {
    setLoading(true);
    fetchPublicLists();
  }, [publicFacing]);

  const fetchLists = async () => {
    try {
      const res = await fetchUserLists(
        match.params.userId,
        localStorage.getItem("sessionToken")
      );
      setInProgressLists(res.data.inProgressLists);
      setCompletedLists(res.data.completedLists);
      setCreatedLists(res.data.createdLists);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  const fetchPublicLists = async () => {
    try {
      const res = await fetchUserPublicList(match.params.userId);
      setPublicLists(res.data.lists);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div id="user-profile-main-container">
      <UserInfo
        numCompleted={completedLists.length}
        numCreated={createdLists.length}
        publicFacing={publicFacing}
        setPublicFacing={setPublicFacing}
      />
      {localStorage.getItem("userId") === match.params.userId &&
      !publicFacing ? (
        // <UserTabs
        //   inProgressLists={inProgressLists}
        //   completedLists={completedLists}
        //   createdLists={createdLists}
        //   setIsOpen={setIsOpen}
        //   setCurrListId={setCurrListId}
        //   tabType={tabType}
        //   setTabType={setTabType}
        // />
        <Tabs
          tabs={[
            { name: "Completed", list: completedLists },
            { name: "In Progress", list: inProgressLists },
            { name: "My Lists", list: createdLists },
          ]}
        />
      ) : (
        <div id="tabs-container-div">
          {publicLists.length ? (
            <ListIndex passedList={publicLists} />
          ) : (
            <div id="empty-list-container">
              <h1>No Lists</h1>
            </div>
          )}
        </div>
      )}
      <ConfirmationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        listId={currListId}
        fetchLists={fetchLists}
      />
    </div>
  );
}
