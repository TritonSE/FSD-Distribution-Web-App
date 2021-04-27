import React from "react";
import "./AgencyProfile.css";

/**
 * AgencyTaskItem is a single task box in the task section of the agency profile
 * page.
 *
 * Expected props:
 * - {String} title: Title of the task
 * - {String} dueDate: Due date of the task (format: "MM/DD/YYYY")
 * - {Number} index: Index of the task in the agency's overall task list
 * - {String} color: Border color of this task item (hexadecimal)
 * - {Function} onClick: Callback for when the user clicks on this task item to
 * edit it. Receives index (int) of the task in the overall task list as
 * argument.
 */
function AgencyTaskItem({ title, dueDate, index, color, onClick }) {
  return (
    <div
      className="task-item"
      style={{ borderColor: color }}
      onClick={() => onClick(index)}
    >
      <p className="task-item-title">{title}</p>
      <p className="task-item-date">{`Due: ${dueDate}`}</p>
    </div>
  );
}

export default AgencyTaskItem;
