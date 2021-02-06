import React from "react";
import { useHistory } from "react-router-dom";
import "./CreateAgencyBtn.css";

function CreateAgencyBtn() {
  let history = useHistory();

  function handleClick() {
    history.push("/agency/new");
  }

  return (
    <button type="button" onClick={handleClick}>
      <div className="res-circle">
        <strong>+</strong>
      </div>
      <span>Create New Agency Profile</span>
    </button>
  );
}

export default CreateAgencyBtn;
