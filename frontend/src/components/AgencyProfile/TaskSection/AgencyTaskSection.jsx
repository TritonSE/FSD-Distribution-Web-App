import React from "react";
import AgencyTaskColumn from "./AgencyTaskColumn";
import "./AgencyTasks.css";

/**
 * AgencyTaskSection encapsulates the task section of the agency profile page.
 *
 * Expected props:
 * - {Array} taskList: Array of task objects to display
 * - {Function} onEditTask: Callback for when the user clicks on a task item to
 * edit it. Receives index (int) of the task in the overall task list as
 * argument.
 * - {Function} onCreateTask: Callback for when the user clicks on the add
 * button. Receives status (string) associated with this column as argument.
 */
function AgencyTaskSection({ taskList, onEditTask, onCreateTask }) {
  let pendingTasks = [];
  let inProgressTasks = [];
  let reviewTasks = [];
  let completedTasks = [];
  for (let i = 0; i < taskList.length; i++) {
    let task = {
      ...taskList[i],
      index: i,
    };
    switch (task.status) {
      case "Pending Assignment":
        pendingTasks.push(task);
        break;
      case "In Progress":
        inProgressTasks.push(task);
        break;
      case "Under Review":
        reviewTasks.push(task);
        break;
      case "Completed":
        completedTasks.push(task);
        break;
    }
  }

  return (
    <div className="tasks-wrapper">
      <AgencyTaskColumn
        header="Pending Assignment"
        tasks={pendingTasks}
        color="#e98300"
        onEditTask={onEditTask}
        onCreateTask={onCreateTask}
      />
      <AgencyTaskColumn
        header="In Progress"
        tasks={inProgressTasks}
        color="#0377ff"
        onEditTask={onEditTask}
        onCreateTask={onCreateTask}
      />
      <AgencyTaskColumn
        header="Under Review"
        tasks={reviewTasks}
        color="#b90651"
        onEditTask={onEditTask}
        onCreateTask={onCreateTask}
      />
      <AgencyTaskColumn
        header="Completed"
        tasks={completedTasks}
        color="#a40fff"
        onEditTask={onEditTask}
        onCreateTask={onCreateTask}
      />
    </div>
  );
}

export default AgencyTaskSection;
