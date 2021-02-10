import React from 'react'
import "../styles/Modal.css"
import SessionForm from "./SessionForm";

export default function Modal({formType, openModal}) {
     if (!formType) return null;

    return (
        <div className="modal-background" onClick={() => openModal(null)}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                <SessionForm formType={formType} openModal={openModal}/>
            </div>
        </div>
    );

}
