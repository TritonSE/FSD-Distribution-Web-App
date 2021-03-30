import React from "react";
import AgencyTaskItem from "./AgencyTaskItem";

function AgencyTaskColumn({ header, tasks, onEditTask, onCreateTask }) {
  return (
    <div className="">
      <div className="">
        <h2 className="">{header}</h2>
      </div>
      <div className="">
        {tasks.map((task) => (
          <AgencyTaskItem {...task} color={} onClick={onEditTask} />
        ))}
        <button type="button" className="" onClick={onCreateTask} />
      </div>
    </div>
  );
}

export default AgencyTaskColumn;
