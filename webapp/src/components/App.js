import "../styles/App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import CreateList from "./CreateList/CreateList";
import Rankings from "./Rankings";
import Quiz from "./Quiz/Quiz";
import { Switch, Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile/UserProfile";
import Category from "./Category";
import Modal from "./Modal";
import SearchPage from "./SearchBar/SearchPage";
import ErrorPage from "./Misc/ErrorPage";
import ListCompleted from "./CreateList/ListCompleted";

import { fetchUser } from "../util/Endpoints/UserEP";
import useCache from "./useCache";

function App() {
  const [formType, openModal] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [user, loading] = useCache({
    fn: fetchUser,
    args: [localStorage.getItem("userId"), imageLoading],
    defaultValue: [],
    blocking: true,
  });

  function useOutsideAlerter(ref, setActive) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActive(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);
  }

  return (
    <div className="App">
      <Navbar
        openModal={openModal}
        useOutsideAlerter={useOutsideAlerter}
        user={user}
        loading={loading}
      />
      <Modal formType={formType} openModal={openModal} />
      <Switch>
        <Route exact path="/error/:errorMessage" render={() => <ErrorPage />} />
        <Route
          exact
          path="/list/new/:listId"
          render={() => <ListCompleted />}
        />
        <Route
          exact
          path="/create-list"
          render={() =>
            localStorage.getItem("sessionToken") ? (
              <CreateList />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          exact
          path="/category/:categoryType"
          render={() => <Category openModal={openModal} />}
        />
        <Route exact path="/:listId/quiz" render={() => <Quiz />} />
        <Route
          exact
          path="/:listId/rankings"
          render={() => <Rankings openModal={openModal} />}
        />
        <Route
          exact
          path="/profile/:userId"
          render={() => (
            <UserProfile
              imageLoading={imageLoading}
              setImageLoading={setImageLoading}
              user={user}
              loading={loading}
            />
          )}
        />
        <Route exact path="/search/:searchVal" render={() => <SearchPage />} />
        <Route exact path="/" render={() => <Home openModal={openModal} />} />
      </Switch>
    </div>
  );
}

export default App;
