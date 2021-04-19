import React from "react";
import edit from "./imgs/edit-icon.png";

function Demographics({agency}) {
  return (
    <>
      <div className="agency-category">
        <img id="edit-icon" src={edit} alt="edit"></img>
        <h1 className="category-title">
          DEMOGRAPHICS
        </h1>
        <ul className="demo-list">
          <li>Homeless</li>
        </ul>
      </div>
    </>
  )
}

export default Demographics;