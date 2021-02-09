import "../styles/App.css";
import Navbar from "./Navbar";
import Home from "./Home/Home";
import CreateList from "./CreateList/CreateList";
import Rankings from "./Rankings";
import Quiz from "./Quiz/Quiz";
import { Switch, Route, Redirect } from "react-router-dom";
import SessionForm from "./SessionForm";
import React from "react";
import UserProfile from "./UserProfile/UserProfile";
import Category from "./Category";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/login" render={() => <SessionForm />} />
        <Route exact path="/create-user" render={() => <SessionForm />} />
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
        <Route path="/category/:categoryType" render={() => <Category />} />
        <Route
          path="/:listId/quiz"
          render={() =>
            localStorage.getItem("sessionToken") ? (
              <Quiz />
            ) : (
              <Redirect to="/:listId/rankings" />
            )
          }
        />
        <Route path="/:listId/rankings" render={() => <Rankings />} />
        <Route path="/profile/:userId" render={() => <UserProfile />} />
        <Route path="/" render={() => <Home />} />
      </Switch>
    </div>
  );
}

export default App;
