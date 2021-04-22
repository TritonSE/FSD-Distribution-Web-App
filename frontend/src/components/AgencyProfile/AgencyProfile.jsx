import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import AgencyBar from "./AgencyBar";
import "./AgencyProfile.css";
import AgencySideBar from "./AgencySideBar";
import AgencyTaskSection from "./AgencyTaskSection";
import TaskForm from "../TaskForm/TaskForm";
import edit from "./imgs/edit-icon.png";
import { getJWT } from "../../auth";
import LocationAndDistributions from './LocationAndDistributions';
import Contacts from "./Contacts";
import Capacity from "./Capacity";
import Compliance from "./Compliance";
import Demographics from "./Demographics";
import RetailRescue from "./RetailRescue";

const CONFIG = require("../../config");

function AgencyProfile() {
  const { id } = useParams();
  const [agency, setAgency] = useState(undefined);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const getScrollPositions = () => {
    let positions = [];
    positions.push(document.getElementById("location-container").getBoundingClientRect().top);
    positions.push(document.getElementById("contacts-container").getBoundingClientRect().top);
    positions.push(document.getElementById("capacity-container").getBoundingClientRect().top );
    positions.push(document.getElementById("compliance-container").getBoundingClientRect().top);
    positions.push(document.getElementById("demographics-container").getBoundingClientRect().top);
    positions.push(document.getElementById("retail-container").getBoundingClientRect().top );
    positions.push(document.getElementById("task-container").getBoundingClientRect().top );
    console.log(document.getElementById("task-container").getBoundingClientRect().top);
    return positions;
  }

  const handleTaskFormSubmit = (task, index) => {
    let url = `${CONFIG.backend.uri}/task/`;
    let method = "PUT";
    if (index === undefined) {
      // creating a new task
      task.agencyID = agency._id;
    } else {
      // modifying an existing task
      url += task._id;
      method = "POST";
    }

    if (task.status === "Completed") {
      // dateCompleted field is for TTL
      task.dateCompleted = Date.now();
    }

    // Update database with new task data
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJWT(),
      },
      body: JSON.stringify(task),
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
            console.log(data.task);
            let updatedTaskList = tasks.slice(); // shallow copy
            if (index === undefined) {
              // creating a new task
              updatedTaskList.push(data.task);
            } else {
              // modifying an existing task
              updatedTaskList[index] = data.task;
            }
            setSelectedTask(null);
            setTasks(updatedTaskList);
          }
        });
      })
      .catch((error) => console.error(error));
  };

  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/agency/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setAgency(data.agency);
        return data.agency._id;
      })
      .then((agencyID) => {
        return fetch(`${CONFIG.backend.uri}/task/agency/${agencyID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getJWT(),
          },
        });
      })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setTasks(data.tasks);
      })
      .catch((err) => {
        console.error(err);
      }); 
  }, []);

  if (!id) {
    history.push("/agency");
  }

  if (agency) {
    return (
      <>
        <AgencyBar agency={agency} />
        <div className="agency-profile-container">
          <div className="agency-sidebar-container">
            <AgencySideBar getScrollPositions={getScrollPositions}/>
          </div>
          <div className="agency-profile-info">
            <div id="location-container" className="Test">
              <LocationAndDistributions agency={agency} />
            </div>
            <div id="contacts-container">
              <Contacts agency={agency} />
            </div>
            <div id="capacity-container">
              <Capacity agency={agency} />
            </div>
            <div id="compliance-container">
              <Compliance agency={agency} />
            </div>
            <div id="demographics-container">
              <Demographics agency={agency} />
            </div>
            <div id="retail-container">
              <RetailRescue agency={agency} />
            </div>
            <div id="task-container">
              <AgencyTaskSection
                taskList={tasks}
                onEditTask={(index) =>
                  setSelectedTask({ ...tasks[index], index: index })
                }
                onCreateTask={(status) =>
                  setSelectedTask({ title: "", dueDate: "", status: status })
                }
              />
            </div>
          </div>
          <div>
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
