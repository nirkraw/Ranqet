import React, { useState, useEffect } from "react";
import "../styles/Session.css";
import { createUser, loginUser } from "../util/Endpoints/UserEP";
import { useHistory } from "react-router-dom";

export default function SessionForm({ formType, openModal, route }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState();
  const [formHeader, setFormHeader] = useState();

  useEffect(() => {
    setUserError("");
    if (formType === "login") setFormHeader("Log In");
    else setFormHeader("Sign Up");
  }, [formType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setUserError("*Name and password must be included");
      return;
    }
    try {
      const endpoint = formHeader === "Sign Up" ? createUser : loginUser;
      const res = await endpoint(name, username, password);
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
    <div className="session-form-container">
      <form id="login-form" onSubmit={handleSubmit}>
        <h3>{formHeader}</h3>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
          className="login-input"
        />
        {formHeader === "Sign Up" ? (
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
            className="login-input"
          />
        ) : (
          <div></div>
        )}
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          className="login-input"
        />
        <div className="session-buttons-container">
          {formType === "login" ? (
            <div
              className="switch-session-button"
              onClick={(e) => {
                e.preventDefault();
                openModal({ formType: "signup", route: route});
              }}
            >
              Sign Up
            </div>
          ) : (
            <div
              className="switch-session-button"
              onClick={(e) => {
                e.preventDefault();
                openModal({ formType: "login", route: route });
              }}
            >
              Log In
            </div>
          )}
          <button id="session-submit" type="submit">
            Continue
          </button>
        </div>
        <h2 className="session-errors">{userError}</h2>
      </form>
    </div>
  );
}
