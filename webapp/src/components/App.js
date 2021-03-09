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

function App() {
  const [formType, openModal] = useState([]);
  window.onunload = () => {
    const userId = localStorage.getItem("userId");
    const sessionToken = localStorage.getItem("sessionToken");
    localStorage.clear();
    localStorage.setItem("userId", userId);
    localStorage.setItem("sessionToken", sessionToken);
  };

  return (
    <div className="App">
      <Navbar openModal={openModal} />
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
        <Route exact path="/profile/:userId" render={() => <UserProfile />} />
        <Route exact path="/search/:searchVal" render={() => <SearchPage />} />
        <Route exact path="/" render={() => <Home openModal={openModal} />} />
      </Switch>
    </div>
  );
}

export default App;
