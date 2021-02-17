import React from 'react'
import "../styles/Modal.css"
import SessionForm from "./SessionForm";

export default function Modal({formType, openModal}) {
     if (formType.length === 0) return null;

    return (
        <div className="modal-background" onClick={() => openModal([])}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                <SessionForm formType={formType[0]} openModal={openModal} route={formType[1]}/>
            </div>
        </div>
    );

}
