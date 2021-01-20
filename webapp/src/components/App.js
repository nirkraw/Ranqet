import "../styles/App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import CreateList from "./CreateList/CreateList";
import Rankings from "./Rankings";
import Quiz from "./Quiz/Quiz";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import SessionForm from "./SessionForm";
import React from "react";
import UserProfile from "./UserProfile";

function App() {
  return (
    <Router history={createBrowserHistory}>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/create-user" render={() => <SessionForm />} />
          <Route path="/login" render={() => <SessionForm />} />
          <Route
            path="/create-list"
            render={() =>
              localStorage.getItem("userId") ? (
                <CreateList />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/:listId/quiz"
            render={() =>
              localStorage.getItem("userId") ? (
                <Quiz />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/:listId/rankings"
            render={() =>
              localStorage.getItem("userId") ? (
                <Rankings />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/profile/:userId"
            render={() =>
              localStorage.getItem("userId") ? (
                <UserProfile />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/"
            render={() => 
              localStorage.getItem("userId") ? (
                <Home />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
