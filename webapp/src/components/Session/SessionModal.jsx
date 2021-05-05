import React, { useEffect, useState } from "react";
import "../../styles/Session.css";
import SessionForm from "./SessionForm";

export default function Modal() {
  const [formType, setFormType] = useState("");
  const [route, setRoute] = useState("");

  useEffect(() => {//eventListener across app
    const updateModalState = (event) => {
      setFormType(event.detail.newFormType);
      setRoute(event.detail.newRoute);
    };
    window.addEventListener("openModal", updateModalState);
    return () => {
      window.removeEventListener("openModal", updateModalState);
    };
  }, []);

  if (!formType) return null;

  return (
    <div
      className="modal-background"
      onClick={() => {
        setFormType("");
        setRoute("");
      }}
    >
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        <SessionForm
          formType={formType}
          route={route}
        />
      </div>
    </div>
  );
}
