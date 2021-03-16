import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
// import { HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <HashRouter> */}
      <App />
    {/* </HashRouter> */}
  </React.StrictMode>,
  document.getElementById("root")
);


