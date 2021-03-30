import React from "react";

function AgencyTaskItem({ title, dueDate, color, onClick }) {
  return (
    <div className="">
      <p className="" style={{ borderColor: color }} onClick={onClick}>
        {title}
      </p>
      <p className="">{dueDate}</p>
    </div>
  );
}

export default AgencyTaskItem;
