import React, { useState } from 'react';
import './Dropdown.css';

const Dropdown = ({filters, selected, changeSelected, changeFilter, option, paginate}) => {
  const [expanded, setExpanded] = useState(false);


    function showCheckboxes() {
        var checkboxes = document.getElementById(option);
        if(!expanded){
          checkboxes.style.display = "block";
          setExpanded(true);
        }
        else{
          checkboxes.style.display = "none";
          setExpanded(false);
        }
      }
return (
    <form>
    <div className = "multiselect">
      <div className = "selectBox" onClick = {showCheckboxes}>
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