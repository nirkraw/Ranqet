import React, { useState, useEffect } from "react";
import "../styles/Session.css";
import { createUser, loginUser } from "../util/Endpoints";
import ErrorPage from "./Misc/ErrorPage";

export default function SessionForm({formType, openModal}) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [userError, setUserError] = useState();
  const [formHeader, setFormHeader] = useState();

  useEffect(() => {
    setUserError("");
    if (formType === "login") setFormHeader("Log In");
    else setFormHeader("Sign Up");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setUserError("*Name and password must be included");
      return;
    }
    try {
      const endpoint = formHeader === "Sign Up" ? createUser : loginUser;
      const res = await endpoint({
        name: name,
        username: username,
        password: password,
      });
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("sessionToken", res.data.sessionToken);
      openModal(null);
    } catch (err) {
      if (err.response.status=== 403 && formHeader === "Log In") {
        setUserError("*Username or password not found");
      } else if (err.response.status=== 400 && formHeader === "Sign Up") {
        setUserError("*Username already exists")
      } else {
        setError(err.response.status);
      }
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
