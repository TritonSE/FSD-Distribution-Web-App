  
import React from "react";
import "./NotesModal.css";
import FormButton from "../FormComponents/FormButton";
import trash from "./trashcan.png";

/**
 * Functional component for the delete agency modal
 *
 * @param {*} showModal
 * @param {*} toggleModal
 * @param {*} agencyName
 * @param {*} agencyNumber
 * @param {*} agencyId
 * @returns {*} Delete Agency Modal Component
 */
function NotesModal({
  showModal,
  toggleModal,
  selectedEvent,
}) {

  return (
    <>
      {showModal ? (
        <div className="modal-background">
          <div className="notes-container">
            <div className="notes-info">
              <h2>Agency X</h2>
              <p>Date, Time</p>
              <p>Occurrence</p>
            </div>
            <div className="notes-options">
              <div className="option-color">
                <h2>Change color</h2>
                <select className="color-select">
                  <option>Red</option>
                  <option>Blue</option>
                </select>
              </div>
              <div className="option-remove">
                <h2>Remove event</h2>
                <div className="remove-wrapper">
                  <select className="remove-select">
                    <option>Remove this event</option>
                    <option>All future events</option>
                  </select>
                </div>
                <img className="trash-image" src={trash} alt="trash"></img>
              </div>
            </div>
            <div className="notes-message">
              <h2>Note</h2>
              <textarea></textarea>
            </div>
            <div className="form-buttons">
              <FormButton
                title="Confirm"
                type="primary"
                style={{ width: "45%", height: "30px", fontSize: "18px"}}
              />
              <FormButton
                title="Cancel"
                type="secondary"
                style={{ width: "45%", height: "30px", fontSize: "18px", lineHeight: "25px"}}
                onClick={toggleModal}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default NotesModal;