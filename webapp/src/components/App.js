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

function App() {
  const [userId, setUserId] = useState("");
 
  return (
    <Router history={createBrowserHistory} userId={userId}>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path='/create-user' component={() => <SessionForm setUserId={setUserId} />}/>
          <Route path='/login' component={() => <SessionForm setUserId={setUserId} />}/>
          <Route path="/create-list" component={CreateList} />
          <Route path="/:listId/quiz" component={Quiz} />
          <Route path="/:listId/rankings" component={Rankings} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
