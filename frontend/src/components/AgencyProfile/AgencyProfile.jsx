import React, { useState, useEffect } from "react";
import { BrowserRouter, useHistory, useParams } from "react-router-dom";
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

let positions = [];

function AgencyProfile() {
  const { id } = useParams();
  const [agency, setAgency] = useState(undefined);
  const [selectedTask, setSelectedTask] = useState(null);

  const getScrollPositions = () => {
    let positions = [];
    if(document.getElementById("location-container") !== null){
      positions.push(document.getElementById("location-container").getBoundingClientRect().top);
    }
    if(document.getElementById("contacts-container") !== null){
      positions.push(document.getElementById("contacts-container").getBoundingClientRect().top);
    }
    if(document.getElementById("capacity-container") !== null){
      positions.push(document.getElementById("capacity-container").getBoundingClientRect().top);
    }
    if(document.getElementById("compliance-container") !== null){
      positions.push(document.getElementById("compliance-container").getBoundingClientRect().top);
    }
    if(document.getElementById("demographics-container") !== null){
      positions.push(document.getElementById("demographics-container").getBoundingClientRect().top);
    }
    if(document.getElementById("retail-container") !== null){
      positions.push(document.getElementById("retail-container").getBoundingClientRect().top);
    }
    if(document.getElementById("task-container") !== null){
      positions.push(document.getElementById("task-container").getBoundingClientRect().top);
    }
    return positions;
  }

  function ScrollTo(el){
    let scrollNum;
    if(el === "task-container"){
      let body = document.body,
      html = document.documentElement;
      scrollNum = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight);
    }
    else{
      if(document.getElementById(el) !== null){
        scrollNum = document.getElementById(el).getBoundingClientRect().top - 159;
      }
    }
    console.log("This is " + el);
    window.scrollBy(0, scrollNum);
  }
  
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
    fetch(`http://localhost:8000/agency/${id}`, {
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
    fetch(`http://localhost:8000/agency/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((agency) => {
        setAgency(agency.agency);
      })
      .catch((err) => {
        console.log(err);
      });
      
  }, [agency]);

  if (!id) {
    history.push("/agency");
  }

  if (agency) {
    return (
      <>
        <AgencyBar agency={agency} />
        <div className="agency-profile-container">
          <div className="agency-sidebar-container">
            <AgencySideBar getScrollPositions={getScrollPositions} id = {id} positions = {positions} ScrollTo={ScrollTo}/>
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
