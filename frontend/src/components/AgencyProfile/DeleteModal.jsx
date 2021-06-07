import React from "react";
import "./DeleteModal.css";
import FormButton from "../FormComponents/FormButton";
import { useHistory } from "react-router-dom";
import { getJWT } from "../../auth";

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
function DeleteModal({ showModal, toggleModal, agencyName, agencyNumber, agencyId }) {
  const history = useHistory();

  /**
   * Function deletes the given agency and returns the user back to the agency page
   */
  function deleteAgency() {
    fetch(`/agency/${agencyId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJWT(),
      },
    })
      .then((response) => response.json())
      .then(() => {
        fetch(`/notes/all/${agencyId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getJWT(),
          },
        });
      })
      .then(() => {
        if (history) {
          history.push("/agency");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {showModal ? (
        <div className="modal-background">
          <div className="delete-form">
            <div className="delete-form-row">
              <p id="confirm-text">
                Are you sure you want to delete{" "}
                <b id="agency-text">
                  "{agencyNumber} - {agencyName}"
                </b>
                ?
              </p>
              <p id="warning">Note: All files and data will be lost and non restorable</p>
            </div>
            <div className="button-row">
              <div className="delete-form-col">
                <div className="button-pos">
                  <FormButton
                    title="Confirm"
                    type="primary"
                    style={{ width: "315px", height: "60px" }}
                    onClick={deleteAgency}
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

export default DeleteModal;
