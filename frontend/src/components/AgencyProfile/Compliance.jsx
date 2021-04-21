import React from "react";
import edit from "./imgs/edit-icon.png";

function Compliance({agency}) {
  return (
    <>
      <div className="agency-category">
        <img id="edit-icon" src={edit} alt="edit"></img>
        <h1 className="category-title">
          COMPLIANCE
        </h1>
      </div>
    </>
  )
}

export default Compliance;