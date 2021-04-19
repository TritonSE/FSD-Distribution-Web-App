import React from "react";
import editIcon from "./imgs/edit-icon.png";
import "./AgencyProfile.css";
import { HashLink } from "react-router-hash-link";

/**
 * EditButtons are the buttons on the agency profile page which take the user
 * to the edit form.
 *
 * Expected props:
 * - {String} section: Anchor name for the section
 * - {Function} onClick: Handler for when the button is clicked. Should take a
 * string (section)
 */
function EditButton({ agency, section }) {
  return (
    <HashLink
      to={{
        pathname: "/agency-profile/edit",
        hash: `#${section}`,
        state: {
          agencyData: agency,
          editSection: section,
          onEndEditing: null,
        }
      }}
    >
      <img src={editIcon} alt="edit" />
    </HashLink>
  );
}

export default EditButton;
