import React from "react";
import AgencyTaskItem from "./AgencyTaskItem";
import "./AgencyTasks.css";

/**
 * AgencyTaskColumn is a column of task items, plus an add button, in the
 * task section of the agency profile page.
 *
 * Expected props:
 * - {String} header: Text at the top of the column (status type)
 * - {Array} tasks: Array of task objects to display
 * - {String} color: Color for the border of this column's task items
 * (hexadecimal)
 * - {Function} onEditTask: Callback for when the user clicks on a task item to
 * edit it. Receives index (int) of the task in the overall task list as
 * argument.
 * - {Function} onCreateTask: Callback for when the user clicks on the add
 * button. Receives status (string) associated with this column as argument.
 */
function AgencyTaskColumn({ header, tasks, color, onEditTask, onCreateTask }) {
  return (
    <div className="tasks-column">
      <div>
        <h2 className="tasks-column-header">{header}</h2>
      </div>
      <div>
        {tasks.map((task, index) => (
          <AgencyTaskItem
            key={index}
            {...task}
            color={color}
            onClick={onEditTask}
          />
        ))}
        <button
          type="button"
          className="add-task-button"
          onClick={() => onCreateTask(header)}
        >
          <svg
            className="icon-plus"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            aria-hidden="true"
            focusable="false"
          >
            <line x1="11" y1="0" x2="11" y2="22" />
            <line x1="0" y1="11" x2="22" y2="11" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default AgencyTaskColumn;
