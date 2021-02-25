import React, { useState, useEffect } from "react";
import ErrorPage from "../Misc/ErrorPage";
import LoadingSpinner from "../Misc/LoadingSpinner";
import {
  fetchUserLists,
  fetchUserPublicList,
} from "../../util/Endpoints/UserEP";
import "../../styles/UserProfile.css";
import ConfirmationModal from "../ConfirmModal";
import UserInfo from "./UserInfo";
import { useRouteMatch } from "react-router-dom";
import UserTabs from "./UserTabs";
import ListIndex from "../ListIndex";

export default function UserProfile({ tabType, setTabType }) {
  const match = useRouteMatch();
  const [completedLists, setCompletedLists] = useState([]);
  const [inProgressLists, setInProgressLists] = useState([]);
  const [createdLists, setCreatedLists] = useState([]);
  const [publicLists, setPublicLists] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currListId, setCurrListId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [publicFacing, setPublicFacing] = useState(false);

  useEffect(() => {
    fetchLists();
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
      setError(err.message);
    }
  };

  const fetchPublicLists = async () => {
    try {
      const res = await fetchUserPublicList(match.params.userId);
      setPublicLists(res.data.lists);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <ErrorPage error={error} />;
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
        <UserTabs
          inProgressLists={inProgressLists}
          completedLists={completedLists}
          createdLists={createdLists}
          setIsOpen={setIsOpen}
          setCurrListId={setCurrListId}
          tabType={tabType}
          setTabType={setTabType}
        />
      ) : (
        <div id="tabs-container-div">
          <ListIndex passedList={publicLists} />
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
