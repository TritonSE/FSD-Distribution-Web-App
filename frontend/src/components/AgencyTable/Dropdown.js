import React, { useState } from 'react';
import './Dropdown.css';

const Dropdown = ({filters, selected, changeSelected, changeFilter, option, paginate}) => {
  const [expanded, setExpanded] = useState(false);


  function showCheckboxes() {
    var checkboxes = document.getElementById(option);
    console.log(expanded);
    if(!expanded){
      console.log(expanded);
      checkboxes.style.display = "block";
      setExpanded(true);
    }
    else{
      checkboxes.style.display = "none";
      setExpanded(false);
    }
  }

  /**
   * close dropdown if user clicks outside
   */
  window.addEventListener("click", function(event) {
    if (event.target.closest("form") == null 
        || event.target.closest("form").parentElement != document.getElementsByClassName("selects-container")[0]) {
      if(expanded){
        showCheckboxes();
      }
    }
  });

return (
    <form>
    <div className = "multiselect">
      <div className = "selectBox" onClick = {showCheckboxes} id = {option.substring(0, 4)}>
        <select textDecoration="none">
          <option>{option}</option>
        </select>
        <div unselectable = "on" className="overSelect"></div>
      </div>
    </div>
    <div className = "checkboxes" id={option}>
      {   
        Object.keys(filters[option]).map(key => (
          <label htmlFor={key} key = {key}>
            <input type="checkbox" key={key} id={key} onChange={(e) =>
            //when checkbox is clicked, add select label, filter, and paginate
            {let newStat = !(filters[option][key]); 
            newStat ? selected[key] = option : delete selected[key]; 
            changeSelected(selected); 
            changeFilter({...filters, [option]: {...filters[option], [key]: newStat,},}); 
            paginate(1)}}/>
            {key}
          </label> 
        ))
      }
    </div>
  </form>
  )
}

export default Dropdown