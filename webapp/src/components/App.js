import "../styles/App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import CreateList from "./CreateList/CreateList";
import Rankings from "./NewRankings/RankingsMain";
import Quiz from "./Quiz/Quiz";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import UserProfile from "./UserProfile/UserProfile";
import Modal from "./Modal";
import SearchPage from "./SearchBar/SearchPage";
import ErrorPage from "./Misc/ErrorPage";
import ListCompleted from "./CreateList/ListCompleted";
import NotFound from "./NotFound";

function App() {
  window.onunload = () => { //resets cache on refresh or window/tab close
    const userId = localStorage.getItem("userId");
    const sessionToken = localStorage.getItem("sessionToken");
    localStorage.clear();
    if (userId && sessionToken) {
      localStorage.setItem("userId", userId);
      localStorage.setItem("sessionToken", sessionToken);
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar  />
        <Modal />
        <Switch>
          <Route path="/error/:errorMessage" render={() => <ErrorPage />} />
          <Route
            path="/list/new/:listId"
            render={() =>
              localStorage.getItem("sessionToken") ? (
                <ListCompleted />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/create-list"
            render={() =>
              localStorage.getItem("sessionToken") ? (
                <CreateList />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route exact path="/:listId/quiz" render={() => <Quiz />} />
          <Route
            path="/:listId/rankings"
            render={() => <Rankings  />}
          />
          <Route exact path="/profile/:userId" render={() => <UserProfile />} />
          <Route path="/search/:searchVal" render={() => <SearchPage />} />
          <Route exact path="/" render={() => <Home />} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
