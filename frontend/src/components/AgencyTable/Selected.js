import React from 'react';
import './Selected.css';

const Selected = ({filters, selected, changeSelected, changeFilter, paginate}) => {

return (
    <div id="selected-filters">
    {
      Object.keys(selected).map(select =>
        <div key = {select}>
            {select}
            <button onClick = {(e) =>
            {
                //changeFilter({...filters, [selected[select]]: {...filters[selected[select]], [select]: false,},});
                delete selected[select];
                changeSelected({...selected});
                //paginate(1);
                //clear the corresponding checkmark
                const event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                })
                document.getElementById(select).dispatchEvent(event);
            }}>X</button>
        </div>
      )
    }
    <button id="clearall" onClick = {(e) =>
    {
        //clear all checkmarks
        for(let select in selected){
            filters[selected[select]][select] = false;
            delete selected[select];
            changeSelected({...selected});
            document.getElementById(select).checked = false;
            
        }
        changeFilter({...filters});
        
    }}>Clear All</button>
  </div>
  )
}

export default Selected