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

function App() {
  return (
    <Router history={createBrowserHistory}>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/create-user" component={() => <SessionForm />} />
          <Route path="/login" component={() => <SessionForm />} />
          <Route
            path="/create-list"
            component={() =>
              localStorage.getItem("userId") ? (
                <CreateList  />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/:listId/quiz"
            component={() =>
              localStorage.getItem("userId") ? (
                <Quiz />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/:listId/rankings"
            component={() =>
              localStorage.getItem("userId") ? (
                <Rankings />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/"
            component={() => {
              return localStorage.getItem("userId") ? (
                <Home />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
