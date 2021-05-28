  
import React, { useState, useEffect } from "react";
import "./NotesModal.css";
import FormButton from "../FormComponents/FormButton";
import { getJWT } from "../../auth";
import trash from "./trashcan.png";

/**
 * Functional component for the delete agency modal
 *
 * @param {*} showModal
 * @param {*} toggleModal
 * @param {*} agencyName
 * @param {*} agencyNumber
 * @param {*} agencyId
 * @returns {*} Delete Agency Modal Component
 */


function NotesModal({
  showModal,
  toggleModal,
  selectedEvent,
  deleted,
  changeDeleted,
}) {

  const [note, setNote] = useState("");
  const [exist, setExist] = useState(false);
  const [agencyID, setAgencyID] = useState(undefined);

  function getFreq() {
    let freq;
    let interval;
    if(selectedEvent && selectedEvent.event._def.recurringDef) {
      interval = selectedEvent.event._def.recurringDef.typeData.rruleSet._rrule[0].options.interval;
    } else{
      return "";
    }
    if(interval == 2) {
      freq = "Biweekly on "
    } else if(interval == 1) {
      freq = "Weekly on "
    } else {
      freq = "Every " + interval + " Weeks on "
    }
    
    return freq;
  }

  function getDate() {
    let date = "";
    let options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    if(selectedEvent) {
      date = new Date(selectedEvent.event.startStr);
      date = String(new Intl.DateTimeFormat('en-US', options).format(date));
    }
    return date;
  }

  function getDay() {
    let date = "";
    if(selectedEvent && selectedEvent.event._def.recurringDef){
      console.log(selectedEvent.event.startStr);
      //dayOfWeek = selectedEvent.event._def.recurringDef.typeData.rruleSet._rrule[0].options.wkst;
      date = new Date(selectedEvent.event.startStr);
      date = String(new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date));
    }
    return date;
  }

  function updateEvent() {
    let eventID = String(selectedEvent.event._instance.range.start) + String(selectedEvent.event._instance.range.end) + (selectedEvent.event._def.title) + (selectedEvent.event._def.extendedProps.distribution) + (selectedEvent.event._def.extendedProps.retailrescue);
    let removeEvent = document.getElementById('remove');
    if(selectedEvent.event._def.recurringDef == null) {
      if(removeEvent.value != "None") {
        fetch(`http://localhost:8000/agency/${agencyID}`, { //delete a user selected event
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getJWT(),
          },
        })
        .then((res) => res.json())
        .then((data) => {
          return data.agency;
        })
        .then((agency) => {
          fetch(`http://localhost:8000/agency/${agencyID}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getJWT(),
            },
            body: JSON.stringify({
              ...agency,
              userSelectedDates: agency.userSelectedDates.filter((date) => 
                date != selectedEvent.event.startStr
              )
            }),
          });
          changeDeleted(++deleted);
        })
        .then(() => {
          fetch(`http://localhost:8000/notes/${eventID}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getJWT(),  
            },
          });
        });
      }
    } else { //delete a recurring event

      if(removeEvent.value == "Remove this event") { //delete a single recurring event
        fetch(`http://localhost:8000/agency/${agencyID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getJWT(),
          },
        })
        .then((res) => res.json())
        .then((data) => {
          return data.agency;
        })
        .then((agency) => {
          fetch(`http://localhost:8000/agency/${agencyID}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getJWT(),
            },
            body: JSON.stringify({
              ...agency,
              userExcludedDates: agency.userExcludedDates.concat([selectedEvent.event.startStr]),
            }),
          });
          changeDeleted(++deleted);
        })
        .then(() => {
          fetch(`http://localhost:8000/notes/${eventID}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getJWT(),
            },
          });
        });
      }
      
      if(removeEvent.value == "All future events") { //delete event and all future events
        fetch(`http://localhost:8000/agency/${agencyID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getJWT(),
          },
        })
        .then((res) => res.json())
        .then((data) => {
          return data.agency;
        })
        .then((agency) => {
          if(agency.distributionExcludedTimes){
            console.log(agency.distributionExcludedTimes);
            let newDistributionExclude = agency.distributionExcludedTimes;
            newDistributionExclude[getDay().toLowerCase()] = selectedEvent.event.startStr;
            console.log(getDay().toLowerCase());
            fetch(`http://localhost:8000/agency/${agencyID}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getJWT(),
              },
              body: JSON.stringify({
                ...agency,
                distributionExcludedTimes: newDistributionExclude,
              }),
            });
            changeDeleted(++deleted);
          }
        })


      }
    }

    //handle adding or changing a note
    if(exist) {
      fetch(`http://localhost:8000/notes/${eventID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getJWT(),
        },
        body: JSON.stringify({
          _id: eventID,
          message: note,
        })
      });
    } else {
      fetch(`http://localhost:8000/notes/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getJWT(),
        },
        body: JSON.stringify({
          _id: eventID,
          message: note,
        })
      });
    }
    toggleModal();
  }
  
  useEffect(() => {
    if(selectedEvent) {
      let eventID = String(selectedEvent.event._instance.range.start) + String(selectedEvent.event._instance.range.end) + (selectedEvent.event._def.title) + (selectedEvent.event._def.extendedProps.distribution) + (selectedEvent.event._def.extendedProps.retailrescue);
      fetch(`http://localhost:8000/notes/${eventID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getJWT(),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAgencyID(selectedEvent.event._def.extendedProps.agencyID);
          if(data.note.message) {
            setExist(true);
            setNote(data.note.message);
            document.getElementById("noteText").value = data.note.message;
          }
        })
        .catch((err) => {
          setExist(false);
          console.log(err);
        });
    }
  },[selectedEvent]);

  function handleChange(event) {
    setNote(event.target.value);
  }

  function displayFutureEvents() {
    if(selectedEvent && selectedEvent.event._def.recurringDef != null) {
      return <option>All future events</option>
    }
  }

  return (
    <>
      {showModal ? (
        <div className="modal-background">
          <div className="notes-container">
            <div className="notes-info">
              <h2>{selectedEvent && selectedEvent.event._def.title}</h2>
              <p> {getDate()}</p>
              <p>{getFreq()} {getDay()}</p>
            </div>
            <div className="notes-options">
              <div className="option-remove">
                <h2>Remove event</h2>
                <div className="remove-wrapper">
                  <select className="remove-select" id="remove">
                    <option>None</option>
                    <option>Remove this event</option>
                    {displayFutureEvents()}
                  </select>
                </div>
              </div>
            </div>
            <div className="notes-message">
              <h2>Note</h2>
              <textarea id="noteText" onChange={handleChange}></textarea>
            </div>
            <div className="form-buttons">
              <FormButton
                title="Confirm"
                type="primary"
                style={{ width: "45%", height: "30px", fontSize: "18px"}}
                onClick={updateEvent}
              />
              <FormButton
                title="Cancel"
                type="secondary"
                style={{ width: "45%", height: "30px", fontSize: "18px", lineHeight: "25px"}}
                onClick={toggleModal}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default NotesModal;