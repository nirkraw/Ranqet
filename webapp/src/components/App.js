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

function App() {
  const [formType, openModal] = useState([]);
  const [tabType, setTabType] = useState("completed");

  function useOutsideAlerter(ref, setActive) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActive(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);
  }

  return (
    <div className="App">
      <Navbar
        openModal={openModal}
        useOutsideAlerter={useOutsideAlerter}
        setTabType={setTabType}
      />
      <Modal formType={formType} openModal={openModal} />
      <Switch>
        <Route
          exact path="/create-list"
          render={() =>
            localStorage.getItem("sessionToken") ? (
              <CreateList />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route exact path="/category/:categoryType" render={() => <Category />} />
        <Route exact path="/:listId/quiz" render={() => <Quiz />} />
        <Route
          exact path="/:listId/rankings"
          render={() => <Rankings openModal={openModal} />}
        />
        <Route
          exact path="/profile/:userId"
          render={() => <UserProfile tabType={tabType} />}
        />
        <Route exact path="/search/:searchVal" render={() => <SearchPage />} />
        <Route exact path="/" render={() => <Home openModal={openModal} />} />
      </Switch>
    </div>
  );
}

export default App;
