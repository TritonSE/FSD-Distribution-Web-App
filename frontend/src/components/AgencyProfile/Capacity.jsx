import React from "react";
import edit from "./imgs/edit-icon.png";

function Capacity({agency}) {
  return (
    <>
      <div className="agency-category">
        <img id="edit-icon" src={edit} alt="edit"></img>
        <h1 className="category-title">
          CAPACITY
        </h1>
        <p>
          <strong>Storage and Type:</strong>
        </p>
        <p>
          <strong>Transportation and Type:</strong>
        </p>
      </div>
    </>
  )
}

export default Capacity;
