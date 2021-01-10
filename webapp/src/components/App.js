import "../styles/App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import CreateList from "./CreateList/CreateList";
import Rankings from "./Rankings";
import Quiz from "./Quiz/Quiz";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import SessionForm from "./SessionForm";
import React, {useState} from "react"
import {Protected} from "../util/ProtectedRoute";

function App() {
  const [userId, setUserId] = useState("test");
 
  return (
    <Router history={createBrowserHistory}>
      <div className="App">
        <Navbar />
        <Switch>
          <Route
            path="/create-user"
            component={() => <SessionForm setUserId={setUserId} />}
          />
          <Route
            path="/login"
            component={() => <SessionForm setUserId={setUserId} />}
          />
          <Protected
            path="/create-list"
            component={CreateList}
            userId={userId}
          />
          <Protected path="/:listId/quiz" component={Quiz} userId={userId} />
          <Protected
            path="/:listId/rankings"
            component={Rankings}
            userId={userId}
          />
          <Protected path="/" component={Home} userId={userId} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
