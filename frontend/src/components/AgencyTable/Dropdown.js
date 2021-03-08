import React from 'react';
import './Dropdown.css';

const Dropdown = ({filters, changeFilter, option, paginate, expanded}) => {
    function showCheckboxes() {
        var checkboxes = document.getElementById(option);
        if(!expanded){
          checkboxes.style.display = "block";
          expanded = true;
        }
        else{
          checkboxes.style.display = "none";
          expanded = false;
        }
      }
return (
    <form>
    <div className = "multiselect">
      <div className = "selectBox" onClick = {showCheckboxes}>
        <select disabled="disabled" textDecoration="none">
          <option>{option}</option>
        </select>
      </div>
      <div className ="overSelect"></div>
    </div>
    <div className = "checkboxes" id={option}>
      {   
        Object.keys(filters[option]).map(key => (
          <label htmlFor={key} key = {key}>
          <input type="checkbox" key={key} onChange={(e) => {let newStat = !(filters[option][key]); console.log(newStat); changeFilter({...filters, [option]: {...filters[option], [key]: newStat,},}); console.log(filters); paginate(1)}}/>{key}
          </label> 
        ))
      }
    </div>
  </form>
  )
}

export default Dropdown