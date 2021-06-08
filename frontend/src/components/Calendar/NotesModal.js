import React, { useState, useEffect } from "react";
import "./NotesModal.css";
import FormButton from "../FormComponents/FormButton";
import { getJWT } from "../../auth";
import { BACKEND_URL } from "../../config";

/**
 * Functional component for the delete agency modal, allows singular and recurring event deletion and notes.
 * It also contains basic information about the event such as date and time.
 * Expected Props:
 * - {Boolean} showModal: boolean to decide whether modal should be rendered
 * - {Function} toggleModal: function that toggles modal between open and closed
 * - {Object} selectedEvent: the calendar event that the user clicked
 * - {Number} deleted: deleted is the key of the Home component, this changes when an
 * event is deleted, thereby forcing the calendar to re-render
 * - {Function} changeDeleted: function to change the deleted key
 */

function NotesModal({ showModal, toggleModal, selectedEvent, deleted, changeDeleted }) {
  const [note, setNote] = useState("");
  const [exist, setExist] = useState(false);
  const [agencyID, setAgencyID] = useState(undefined);

  function getFreq() {
    let freq;
    let interval;
    if (selectedEvent && selectedEvent.event._def.recurringDef) {
      interval = selectedEvent.event._def.recurringDef.typeData.rruleSet._rrule[0].options.interval;
    } else {
      return "";
    }
    if (interval === 2) {
      freq = `Biweekly on `;
    } else if (interval === 1) {
      freq = `Weekly on `;
    } else {
      freq = `Every ${interval} weeks on `;
    }

    return freq;
  }

  function getDate() {
    let date = "";
    const options = { month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    if (selectedEvent) {
      date = new Date(selectedEvent.event.startStr);
      date = String(new Intl.DateTimeFormat("en-US", options).format(date));
    }
    return date;
  }

  function getDay() {
    let date = "";
    if (selectedEvent && selectedEvent.event._def.recurringDef) {
      date = new Date(selectedEvent.event.startStr);
      date = String(new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date));
    }
    return date;
  }

  function updateEvent() {
    const eventID =
      selectedEvent.event._def.extendedProps.agencyID +
      selectedEvent.event.startStr +
      selectedEvent.event._def.extendedProps.distribution +
      selectedEvent.event._def.extendedProps.retailrescue;
    const milisecFromEpoch = new Date(selectedEvent.event.startStr).getTime();
    const removeEvent = document.getElementById("remove");
    if (selectedEvent.event._def.recurringDef == null) {
      if (removeEvent.value !== "None") {
        fetch(`${BACKEND_URL}/agency/${agencyID}`, {
          // delete a user selected event
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getJWT()}`,
          },
        })
          .then((res) => res.json())
          .then((data) => data.agency)
          .then((agency) => {
            const regex = /:[0-9][0-9]-/g; // regex to remove seconds from standard ISO format
            const deleteDate = selectedEvent.event.startStr.replace(regex, "-");
            fetch(`${BACKEND_URL}/agency/${agencyID}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getJWT()}`,
              },
              body: JSON.stringify({
                ...agency,
                userSelectedDates: agency.userSelectedDates.filter((date) => date !== deleteDate),
              }),
            });
            changeDeleted(++deleted);
          })
          .then(() => {
            fetch(`${BACKEND_URL}/notes/${eventID}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getJWT()}`,
              },
            });
          });
      }
    } else {
      // delete a recurring event
      if (removeEvent.value === "Remove this event") {
        // delete a single recurring event
        fetch(`${BACKEND_URL}/agency/${agencyID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getJWT()}`,
          },
        })
          .then((res) => res.json())
          .then((data) => data.agency)
          .then((agency) => {
            fetch(`${BACKEND_URL}/agency/${agencyID}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getJWT()}`,
              },
              body: JSON.stringify({
                ...agency,
                userExcludedDates: agency.userExcludedDates.concat([selectedEvent.event.startStr]),
              }),
            });
            changeDeleted(++deleted);
          })
          .then(() => {
            fetch(`${BACKEND_URL}/notes/${eventID}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getJWT()}`,
              },
            });
          });
      }

      if (removeEvent.value === "All future events") {
        // delete event and all future events
        fetch(`${BACKEND_URL}/agency/${agencyID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getJWT()}`,
          },
        })
          .then((res) => res.json())
          .then((data) => data.agency)
          .then((agency) => {
            let updateAgency;
            if (selectedEvent.event._def.extendedProps.distribution === "D") {
              const newDistributionExclude = agency.distributionExcludedTimes;
              newDistributionExclude[getDay().toLowerCase()] = selectedEvent.event.startStr;
              updateAgency = JSON.stringify({
                ...agency,
                distributionExcludedTimes: newDistributionExclude,
              });
            } else if (selectedEvent.event._def.extendedProps.retailrescue === "R") {
              const newRetailExclude = agency.retailRescueExcludedTimes;
              newRetailExclude[getDay().toLowerCase()] = selectedEvent.event.startStr;
              updateAgency = JSON.stringify({
                ...agency,
                retailRescueExcludedTimes: newRetailExclude,
              });
            }
            fetch(`${BACKEND_URL}/agency/${agencyID}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getJWT()}`,
              },
              body: updateAgency,
            });
            changeDeleted(++deleted);
          })
          .then(() => {
            fetch(`${BACKEND_URL}/notes/`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getJWT()}`,
              },
              body: JSON.stringify({
                rID: selectedEvent.event._def.extendedProps.recurringID,
                tFE: milisecFromEpoch,
              }),
            });
          });
      }
    }

    // handle adding or changing a note
    if (exist) {
      fetch(`${BACKEND_URL}/notes/${eventID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getJWT()}`,
        },
        body: JSON.stringify({
          _id: eventID,
          message: note,
          recurringID: selectedEvent.event._def.extendedProps.recurringID,
          timeFromEpoch: milisecFromEpoch, // enables time comparison for single pass batch delete
          agencyID: selectedEvent.event._def.extendedProps.agencyID,
        }),
      });
    } else {
      fetch(`${BACKEND_URL}/notes/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getJWT()}`,
        },
        body: JSON.stringify({
          _id: eventID,
          message: note,
          recurringID: selectedEvent.event._def.extendedProps.recurringID,
          timeFromEpoch: milisecFromEpoch,
          agencyID: selectedEvent.event._def.extendedProps.agencyID,
        }),
      });
    }
    toggleModal();
  }

  useEffect(() => {
    if (selectedEvent) {
      const eventID =
        selectedEvent.event._def.extendedProps.agencyID +
        selectedEvent.event.startStr +
        selectedEvent.event._def.extendedProps.distribution +
        selectedEvent.event._def.extendedProps.retailrescue;
      fetch(`${BACKEND_URL}/notes/${eventID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getJWT()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAgencyID(selectedEvent.event._def.extendedProps.agencyID);
          if (data.note.message) {
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
  }, [selectedEvent]);

  function handleChange(event) {
    setNote(event.target.value);
  }

  function displayFutureEvents() {
    if (selectedEvent && selectedEvent.event._def.recurringDef != null) {
      return <option>All future events</option>;
    }
    return "";
  }

  return (
    <>
      {showModal ? (
        <div className="modal-background">
          <div className="notes-container">
            <div className="notes-info">
              <h2>{selectedEvent && selectedEvent.event._def.title}</h2>
              <p> {getDate()}</p>
              <p>
                {getFreq()} {getDay()}
              </p>
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
              <textarea id="noteText" onChange={handleChange} />
            </div>
            <div className="form-buttons">
              <FormButton
                title="Confirm"
                type="primary"
                style={{ width: "45%", height: "30px", fontSize: "18px" }}
                onClick={updateEvent}
              />
              <FormButton
                title="Cancel"
                type="secondary"
                style={{ width: "45%", height: "30px", fontSize: "18px", lineHeight: "25px" }}
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
