import React from "react";
import "./Selected.css";

/**
 * Custom component for filter labels that appear when a filter option is selected. Same
 * props as the Dropdown component.
 */
const Selected = ({ filters, selected, changeSelected, changeFilter, paginate }) => (
  <div id="selected-filters">
    {Object.keys(selected).map((select) => (
      <div className="select-boxes" key={select}>
        <p className="label-text">{select}</p>
        <button
          type="button"
          className="clear-button"
          onClick={() => {
            delete selected[select];
            changeSelected({ ...selected });
            // create and dispatch custom event to simulate clicking checkbox
            const event = new MouseEvent("click", {
              view: window,
              bubbles: true,
            });
            document.getElementById(select).dispatchEvent(event);
          }}
        >
          X
        </button>
      </div>
    ))}
    <button
      type="button"
      id="clearall"
      onClick={() => {
        // clear all checkmarks, refilter, and paginate
        for (const select in selected) {
          filters[selected[select]][select] = false;
          delete selected[select];
          changeSelected({ ...selected });
          document.getElementById(select).checked = false;
        }
        changeFilter({ ...filters });
        paginate(1);
      }}
    >
      Clear All
    </button>
  </div>
);

export default Selected;
