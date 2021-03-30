import React from "react";
import "./AgencyProfile.css";

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
