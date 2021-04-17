import React from "react";
import editIcon from "./imgs/edit-icon.png";
import "./AgencyProfile.css";

/**
 * EditButtons are the buttons on the agency profile page which take the user
 * to the edit form.
 *
 * Expected props:
 * - {String} section: Anchor name for the section
 * - {Function} onClick: Handler for when the button is clicked. Should take a
 * string (section)
 */
function EditButton({ section, onClick }) {
  return (
    <button
      type="button"
      className="edit-button"
      onClick={() => onClick(section)}
    >
      <img src={editIcon} alt="edit" />
    </button>
  );
}

export default EditButton;
