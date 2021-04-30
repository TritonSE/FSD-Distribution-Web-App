import React from "react";
import { useHistory } from "react-router-dom";
import "./CreateAgencyBtn.css";

/**
 * Component produces a button that directs the user to the AgencyForm page
 */
function CreateAgencyBtn() {
  let history = useHistory();

  function handleClick() {
    history.push("/create-agency");
  }

  return (
    <button type="button" className="create-agency-btn" onClick={handleClick}>
      <svg
        className="icon-circle-plus"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="11" />
        <line x1="6" y1="12" x2="18" y2="12" />
        <line x1="12" y1="6" x2="12" y2="18" />
      </svg>
      <span>Create New Agency Profile</span>
    </button>
  );
}

export default CreateAgencyBtn;