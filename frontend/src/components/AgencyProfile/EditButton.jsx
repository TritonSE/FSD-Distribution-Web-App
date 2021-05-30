import React from "react";
import editIcon from "./imgs/edit-icon.png";
import "./AgencyProfile.css";
import { HashLink } from "react-router-hash-link";

/**
 * EditButtons are the buttons on the agency profile page which take the user
 * to the edit form.
 *
 * Expected props:
 * - {Object} agency: The agency object to edit
 * - {String} section: Anchor name for the section
 *
 * Available section names:
 * - location
 * - contacts
 * - compliance
 * - distribution
 * - capacity
 * - retail-rescue
 * - demographics
 * - staff
 */
function EditButton({ agency, section }) {
  return (
    <div className="edit-button">
      <HashLink to={`/agency-profile/${agency._id}/edit#${section}`}>
        <img src={editIcon} alt="edit" />
      </HashLink>
    </div>
  );
}

export default EditButton;
