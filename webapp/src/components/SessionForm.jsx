import React, { useState, useEffect } from "react";
import "../styles/Session.css";
import { createUser, loginUser } from "../util/Endpoints/UserEP";
import { useHistory } from "react-router-dom";

export default function SessionForm({ formType, openModal, route }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState();
  const [formHeader, setFormHeader] = useState();

  useEffect(() => {
    setUserError("");
    if (formType === "login") setFormHeader("Log In");
    else setFormHeader("Create Account");
  }, [formType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setUserError("*Name and password must be included");
      return;
    }
    try {
      const endpoint = formHeader === "Sign Up" ? createUser : loginUser;
      const res = await endpoint(username, password);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("sessionToken", res.data.sessionToken);
      openModal({ formType: "", route: "" });
      if (route) {
        history.push(route);
      } else {
        window.location.reload();
      }
    } catch (err) {
      if (err.response.status === 403 && formHeader === "Log In") {
        setUserError("*Username or password not found");
      } else if (err.response.status === 400 && formHeader === "Sign Up") {
        setUserError("*Username already exists");
      } else {
        history.push(`/error/${err.message}`);
      }
    }
  };

  return (
    <form id="session-form" onSubmit={handleSubmit}>
      <h3>{formHeader}</h3>
      <div id="session-inputs-container" className="justify-column-center">
        <div className="session-input-container">
          <p>Username</p>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="login-input"
            maxlength="30"
          />
        </div>
        <div className="session-input-container">
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="login-input"
            maxlength="24"
          />
        </div>
      </div>
      <div className="session-submit-container">
        <div id="session-submit" type="submit">
          {formType === "login" ? "Log In" : "Sign Up"}
        </div>
      </div>
      {formType === "login" ? (
        <div className="justify-center-center switch-session-container">
          <p className="switch-session-text">New to Ranqet?</p>
          <p
            className="switch-session-button"
            onClick={(e) => {
              e.preventDefault();
              openModal({ formType: "signup", route: route });
            }}
          >
            Create an account.
          </p>
        </div>
      ) : (
        <div className="justify-center-center switch-session-container">
          <p className="switch-session-text">Already a Ranqet user?</p>
          <p
            className="switch-session-button"
            onClick={(e) => {
              e.preventDefault();
              openModal({ formType: "login", route: route });
            }}
          >
            Log In.
          </p>
        </div>
      )}
      <h2 className="session-errors">{userError}</h2>
    </form>
  );
}
