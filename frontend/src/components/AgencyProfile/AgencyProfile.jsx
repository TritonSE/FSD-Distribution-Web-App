import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AgencyBar from "./AgencyBar";
import "./AgencyProfile.css";
import AgencySideBar from "./AgencySideBar";
import AgencyTaskSection from "./AgencyTaskSection";
import TaskForm from "../TaskForm/TaskForm";
import edit from "./imgs/edit-icon.png";

function AgencyProfile({ data }) {
  const [agency, setAgency] = useState(undefined);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskFormSubmit = (task, index) => {
    let updatedTaskList = agency.tasks.slice(); // shallow copy
    if (index === undefined) {
      // creating a new task
      updatedTaskList.push(task);
    } else {
      // modifying an existing task
      updatedTaskList[index] = task;
    }
    let updatedAgency = { ...agency };
    updatedAgency.tasks = updatedTaskList;
    // TODO: send POST request to server with updatedAgency
    // --> if successful, call setSelectedTask(null) to close the task form
    //     and setAgency(updatedAgency) to re-render this page
    // --> otherwise, handle the error somehow
    setSelectedTask(null);
    setAgency(updatedAgency);
  };

  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/agency/${data}`, { method: "GET" })
      .then((res) => res.json())
      .then((agency) => {
        setAgency(agency.agency);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!data) {
    history.push("/agency");
  }

  if (agency) {
    return (
      <>
        <AgencyBar agency={agency} />
        <div className="agency-profile-container">
          <AgencySideBar />
          <div className="agency-profile-info">
            <div className="agency-category">
              <img id="edit-icon" src={edit} alt="edit"></img>
              <h1 className="category-title">
                LOCATION AND DISTRIBUTION HOURS
              </h1>
            </div>
            <AgencyTaskSection
              taskList={agency.tasks}
              onEditTask={(index) =>
                setSelectedTask({ ...agency.tasks[index], index: index })
              }
              onCreateTask={(status) =>
                setSelectedTask({ title: "", dueDate: "", status: status })
              }
            />
          </div>
        </div>
        {selectedTask && (
          <TaskForm
            data={selectedTask}
            editIndex={selectedTask.index}
            onSubmit={handleTaskFormSubmit}
            onCancel={() => setSelectedTask(null)}
          />
        )}
      </>
    );
  } else {
    return null;
  }
}

export default AgencyProfile;
