  
import React from "react";
import "./NotesModal.css";
import FormButton from "../FormComponents/FormButton";
import { useHistory } from "react-router-dom";

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
}) {

    console.log(showModal);
  return (
    <>
      {showModal ? (
        <div className="modal-background">
          <div className="delete-form">
            <div className="delete-form-row">
              <p id="confirm-text">
                Are you sure you want to delete{" "}
                <b id="agency-text">
                  "hello"
                </b>
                ?
              </p>
              <p id="warning">
                Note: All files and data will be lost and non restorable
              </p>
            </div>
            <div className="button-row">
              <div className="delete-form-col">
                <div className="button-pos">
                  <FormButton
                    title="Confirm"
                    type="primary"
                    style={{ width: "315px", height: "60px" }}
                  />
                </div>
              </div>
              <div className="delete-form-col">
                <div className="button-pos">
                  <FormButton
                    title="Cancel"
                    type="secondary"
                    style={{ width: "315px", height: "60px" }}
                    onClick={toggleModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default NotesModal;