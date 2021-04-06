import React from "react";
import "./Selected.css";

/**
 * Custom component for filter labels that appear when a filter option is selected. Same
 * props as the Dropdown component.
 */
const Selected = ({filters, selected, changeSelected, changeFilter, paginate}) => {
  return (
    <div id="selected-filters">
    {
      Object.keys(selected).map(select =>
        <div className="select-boxes" key={select}>
          <p className="label-text">{select}</p>
          <button className="clear-button" onClick={(e) =>
          {
            delete selected[select];
            changeSelected({...selected});
            //create and dispatch custom event to simulate clicking checkbox
            const event = new MouseEvent('click', {
              view: window,
              bubbles: true,
            })
            document.getElementById(select).dispatchEvent(event);
          }}>X</button>
        </div>
      )
    }
    <button id="clearall" onClick={(e) =>
    {
      //clear all checkmarks, refilter, and paginate
      for(let select in selected) {
        filters[selected[select]][select] = false;
        delete selected[select];
        changeSelected({...selected});
        document.getElementById(select).checked = false;
      }
      changeFilter({...filters});
      paginate(1);
  }}>Clear All</button>
  </div>
  )
}

export default Selected;