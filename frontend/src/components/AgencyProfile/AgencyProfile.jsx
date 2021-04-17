import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AgencyBar from "./AgencyBar";
import "./AgencyProfile.css";
import AgencySideBar from "./AgencySideBar";
import AgencyTaskSection from "./TaskSection/AgencyTaskSection";
import TaskForm from "../TaskForm/TaskForm";
import edit from "./imgs/edit-icon.png";
import { getJWT } from "../../auth";
import LocationAndDistributions from "./LocationAndDistributions";

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

    // Update database with new task data
    fetch(`http://localhost:8000/agency/${data}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJWT(),
      },
      body: JSON.stringify(updatedAgency),
    })
      .then((response) => {
        response.json().then((data) => {
          // Check for valid response
          if (!response.ok) {
            // Indicate number of invalid fields
            if (data.fields) {
              let errors = data.fields.filter((x) => x !== null);
              let message = `${errors.length} error(s) found!`;
              alert(message);
            }
          }
          // If valid response, reset state and rerender page
          else {
            setSelectedTask(null);
            setAgency(updatedAgency);
          }
        });
      })
      .catch((error) => console.error(error));
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
            <LocationAndDistributions agency={agency} />
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
