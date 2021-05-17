  
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
}) {

  const [note, setNote] = useState("");
  const [exist, setExist] = useState(false);

  function getFreq(){
    let freq;
    let interval;
    if(selectedEvent && selectedEvent.event._def.recurringDef){
        interval = selectedEvent.event._def.recurringDef.typeData.rruleSet._rrule[0].options.interval;
    } else{
      return "";
    }
    if(interval == 2){
      freq = "Biweekly on "
    } else{
      freq="Weekly on "
    }
    return freq;
  }

  function getDate(){
    let date;
    if(selectedEvent){
      date = String(selectedEvent.event._instance.range.start).substring(4,10);
    }
    return date;
  }

  function getTime(){
    let time;
    if(selectedEvent){
      time = String(selectedEvent.event._instance.range.start).substring(16,21);
    }
    if(time){
      //convert to standard time
      let timeNum = parseInt(time.substring(0,2));
      if(timeNum > 12){
        timeNum = timeNum-12;
        time = timeNum + time.substring(2);
      }
    }
    return time;
  }

  function getDay(){
    let dayOfWeek;
    if(selectedEvent && selectedEvent.event._def.recurringDef){
      dayOfWeek = selectedEvent.event._def.recurringDef.typeData.rruleSet._rrule[0].options.wkst;
    }
    let day;
    switch(dayOfWeek){
      case 0:
        day = "Monday";
        break;
      case 1:
        day = "Tuesday";
        break;
      case 2:
        day = "Wednesday";
        break;
      case 3:
        day = "Thursday";
        break;
      case 4:
        day = "Friday";
        break;
      case 5:
        day = "Saturday";
        break;
      case 6:
        day = "Sunday";
        break;
    }
    return day;
  }

  function updateEvent() {
    let eventID = String(selectedEvent.event._instance.range.start);
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
    console.log(selectedEvent);
    if(selectedEvent) {
      let eventID = String(selectedEvent.event._instance.range.start);
      console.log(eventID);
      fetch(`http://localhost:8000/notes/${eventID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getJWT(),
        },
      })
        .then((res) => res.json())
        .then((data) => {
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

  return (
    <>
      {showModal ? (
        <div className="modal-background">
          <div className="notes-container">
            <div className="notes-info">
              <h2>{selectedEvent && selectedEvent.event._def.title}</h2>
              <p> {getDate()}, {getTime()}</p>
              <p>{getFreq()} {getDay()}</p>
            </div>
            <div className="notes-options">
              <div className="option-remove">
                <h2>Remove event</h2>
                <div className="remove-wrapper">
                  <select className="remove-select">
                    <option>None</option>
                    <option>Remove this event</option>
                    <option>All future events</option>
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