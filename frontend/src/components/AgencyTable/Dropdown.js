import React, { useEffect, useState } from "react";
import "./Dropdown.css";

/**
 * Dropdown is a component that creates a custom dropdown menu for the filter options. 
 * The menu consists of checkboxes and uses the select tag for main functionality.
 * Expected props:
 * - {Object} filters: JSON object that holds all the filter options
 * - {Function} changeFilter: Function that sets filter, a state of the parent component (AgencyTable)
 * - {Array} selected: Array holding all filter options that have been selected thus far
 * - {Function} changeSelected: Function that sets selected, a state of the parent component
 * - {String} The dropdown option for the current multiselect. Ex: Staff
 * - {Function} paginate: Function that changes the page, should execute after filtering
 */
const Dropdown = ({filters, selected, changeSelected, changeFilter, option, paginate}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
  /**
   * close dropdown if user clicks outside
   */
  window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  });
  function showCheckboxes() {
    var checkboxes = document.getElementById(option);
    if(checkboxes !== null){
      if(!expanded) {
        checkboxes.style.display = "block";
        setExpanded(true);
      }
      else {
        checkboxes.style.display = "none";
        setExpanded(false);
      }
    }
  }

  const handleClickOutside = (event) => {
    if (event.target.closest("form") === null 
        || event.target.closest("form").parentElement !== document.getElementsByClassName("selects-container")[0]) {
      if(expanded) {
        showCheckboxes();
      }
    }
  }


  return (
    <form>
      <div className="multiselect">
        <div className="selectBox" onClick={showCheckboxes} id={option.substring(0, 4)}>
          <select textDecoration="none">
            <option>{option}</option>
          </select>
          <div unselectable="on" className="overSelect"></div>
        </div>
      </div>
      <div className="checkboxes" id={option}>
        {   
          Object.keys(filters[option]).map(key => (
            <label htmlFor={key} key={key}>
              <input type="checkbox" key={key} id={key} onChange={(e) =>
                //when checkbox is clicked, add select label, filter, and paginate
                {let newStat = !(filters[option][key]); 
                newStat ? selected[key] = option : delete selected[key]; 
                changeSelected(selected); 
                changeFilter({...filters, [option]: {...filters[option], [key]: newStat,},}); 
                paginate(1)}
              }/>
              {key}
            </label> 
          ))
        }
      </div>
    </form>
  )
}

export default Dropdown;