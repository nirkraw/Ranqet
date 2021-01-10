import React, { useState, useEffect } from "react";
import "../styles/Session.css";
import { createUser, loginUser } from "../util/Endpoints";
import ErrorPage from "./Misc/ErrorPage";

export default function SessionForm({history, setUserId}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [userError, setUserError] = useState();
  const [formHeader, setFormHeader] = useState();

  useEffect(() => {
    setUserError("");
    if (window.location.pathname === "/login") setFormHeader("Log In");
    else setFormHeader("Sign Up");
  }, [window.location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setUserError("*Name and password must be included");
      return;
    }
    try {
      const endpoint = formHeader === "Sign Up" ? createUser : loginUser;
      //not using password yet but add later
      const res = await endpoint({name: username});
      localStorage.setItem("userId", res.data.id);
      // history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <ErrorPage error={error} />;

  return (
    <div className="session-form-container">
      <form className="login-form">
        <h3>{formHeader}</h3>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
          className="login-input"
        />
        <input
          type="password"
          value={password}
          placeholder="Your Password"
          onChange={(event) => setPassword(event.target.value)}
          className="login-input"
        />
        <button id="session-submit" onClick={handleSubmit}>
          Continue
        </button>
        <h2 className="session-errors">{userError}</h2>
      </form>
    </div>
  );
}
