import React, { useState, useEffect } from "react";
import "../styles/Session.css";
import { createUser, loginUser } from "../util/Endpoints/UserEP";
import { useHistory } from "react-router-dom";

export default function SessionForm({ formType, route }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formHeader, setFormHeader] = useState();

  useEffect(() => {
    setLoginError("");
    setUsernameError("");
    setPasswordError("");
    if (formType === "login") setFormHeader("Log In");
    else setFormHeader("Create Account");
  }, [formType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = false;
    if (!username) {
      setUsernameError("Username must be included");
      error = true;
    }
    if (!password) {
      setPasswordError("Password must be included");
      error = true;
    }
    if (error) return;
    try {
      const endpoint = formHeader === "Create Account" ? createUser : loginUser;
      const res = await endpoint(username, password);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("sessionToken", res.data.sessionToken);
      const openModal = new CustomEvent("openModal", {
        detail: {
          newFormType: "",
          newRoute: "",
        },
      });
      window.dispatchEvent(openModal);
      if (route) {
        history.push(route);
      }
      window.location.reload(); //resets state of whole website with login creds
    } catch (err) {
      if (err.response.status === 403 && formHeader === "Log In") {
        setLoginError("*Username or password not found");
      } else if (
        err.response.status === 400 &&
        formHeader === "Create Account"
      ) {
        setLoginError("*Username already exists");
      } else {
        history.push(`/error/${err.message}`);
      }
    }
  };

  return (
    <form id="session-form">
      <h3>{formHeader}</h3>
      <div id="session-inputs-container" className="justify-column-center">
        <div className="session-input-container">
          <p>Username</p>
          <input
            type="text"
            value={username}
            onChange={(event) => {
              setUsernameError("");
              setUsername(event.target.value);
            }}
            className={
              usernameError ? "login-input input-error" : "login-input"
            }
            maxLength="30"
          />
          {usernameError ? (
            <h2 className="session-info-error">{usernameError}</h2>
          ) : null}
        </div>
        <div className="session-input-container">
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPasswordError("");
              setPassword(event.target.value);
            }}
            className={
              passwordError ? "login-input input-error" : "login-input"
            }
            maxLength="24"
          />
          {passwordError ? (
            <h2 className="session-info-error">{passwordError}</h2>
          ) : null}
        </div>
      </div>
      <div className="session-submit-container">
        <div id="session-submit" type="submit" onClick={handleSubmit}>
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
              const openModal = new CustomEvent("openModal", {
                detail: {
                  newFormType: "signup",
                  newRoute: route,
                },
              });
              window.dispatchEvent(openModal);
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
                 const openModal = new CustomEvent("openModal", {
                   detail: {
                     newFormType: "login",
                     newRoute: route,
                   },
                 });
                 window.dispatchEvent(openModal);
            }}
          >
            Log In.
          </p>
        </div>
      )}
      {loginError ? <h2 className="login-error">{loginError}</h2> : null}
    </form>
  );
}
