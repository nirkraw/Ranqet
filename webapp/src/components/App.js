import "../styles/App.css";
import Navbar from "./Navbar";
import Home from "./Home/Home";
import CreateList from "./CreateList/CreateList";
import Rankings from "./Rankings";
import Quiz from "./Quiz/Quiz";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import SessionForm from "./SessionForm";
import React from "react";
import UserProfile from "./UserProfile";
import Category from "./Category";

function App() {
  return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/create-user" render={() => <SessionForm />} />
          <Route path="/login" render={() => <SessionForm />} />
          <Route
            path="/create-list"
            render={() =>
              localStorage.getItem("sessionToken") ? (
                <CreateList />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/category/:categoryType"
            render={() =>
              localStorage.getItem("sessionToken") ? (
                <Category />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/:listId/quiz"
            render={() =>
              localStorage.getItem("sessionToken") ? (
                <Quiz />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/:listId/rankings"
            render={() =>
              localStorage.getItem("sessionToken") ? (
                <Rankings />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/profile/:userId"
            render={() =>
              localStorage.getItem("sessionToken") ? (
                <UserProfile />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/"
            render={() =>
              localStorage.getItem("sessionToken") ? (
                <Home />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </div>
  );
}

export default App;
