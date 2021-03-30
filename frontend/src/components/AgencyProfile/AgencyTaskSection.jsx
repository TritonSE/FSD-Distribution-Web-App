import React from "react";
import AgencyTaskColumn from "./AgencyTaskColumn";

function AgencyTaskSection({ taskList }) {
  let pendingTasks = [];
  let inProgressTasks = [];
  let reviewTasks = [];
  let completedTasks = [];
  for (let task of taskList) {
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
    <div className="">
      <AgencyTaskColumn
        header="Pending Assignment"
        tasks={pendingTasks}
        onEditTask={}
        onCreateTask={}
      />
      <AgencyTaskColumn
        header="In Progress"
        tasks={inProgressTasks}
        onEditTask={}
        onCreateTask={}
      />
      <AgencyTaskColumn
        header="Under Review"
        tasks={reviewTasks}
        onEditTask={}
        onCreateTask={}
      />
      <AgencyTaskColumn
        header="Completed"
        tasks={completedTasks}
        onEditTask={}
        onCreateTask={}
      />
    </div>
  );
}

export default AgencyTaskSection;
