import React from "react";
import edit from "./imgs/edit-icon.png";

/**
 * Functional component for the demographics category
 * 
 * @param {*} agency 
 * @returns {*} Demographics component
 */
function Demographics({agency}) {

  const groups = {
    'Youth': agency.youth,
    'Senior': agency.senior,
    'Homeless': agency.homeless,
    'Veteran': agency.veteran,
    'Healthcare': agency.healthcare,
    'College': agency.college,
    'Disability Specific': agency.disabilitySpecific,
    'Residential': agency.residential,
    'Immigrant': agency.immigrant,
  }

  /**
   * Function takes in an object and returns a list of li elems of the keys
   * if their values are true
   * 
   * @param {*} items 
   * @returns {Array} Array of li elements based of the keys given in param
   */
  function displayList(items) {
    let listItems = [];
    for(let [key,value] of Object.entries(items)) {
      if(value) {
        listItems.push(key);
      }
    }
    let returnList = listItems.map((key) => 
      <li>{key}</li>
    );
    return returnList;
  }

  return (
    <>
      <div className="agency-category">
        <img id="edit-icon" src={edit} alt="edit"></img>
        <h1 className="category-title">
          DEMOGRAPHICS
        </h1>
        <ul className="demo-list">
          {displayList(groups)}
        </ul>
      </div>
    </>
  )
}

export default Demographics;