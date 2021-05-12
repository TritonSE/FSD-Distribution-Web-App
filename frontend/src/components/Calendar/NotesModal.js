  
import React, { useEffect } from "react";
import "./NotesModal.css";
import FormButton from "../FormComponents/FormButton";
import { useHistory } from "react-router-dom";

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
  event,
}) {

  function changeColor() {
    //event.event.backgroundColor = "blue";
  }
  function getFreq(){
    let freq;
    let interval = event.event._def.recurringDef.typeData.rruleSet._rrule[0].options.interval;
    if(interval == 2){
      freq = "Biweekly"
    } else{
      freq="Weekly"
    }
    return freq;
  }

  function getDay(){
    let dayOfWeek = event.event._def.recurringDef.typeData.rruleSet._rrule[0].options.wkst;
    console.log(dayOfWeek);
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
  useEffect(() => {
    // let interval = event.event.recurringDef._rrule.interval;
    // let dayOfWeek = event.event.recurringDef._rrule.wkst;

    // switch(dayOfWeek){
    //   case 0:
    //     day = "Monday";
    //     break;
    //   case 1:
    //     day = "Tuesday";
    //     break;
    //   case 2:
    //     day = "Wednesday";
    //     break;
    //   case 3:
    //     day = "Thursday";
    //     break;
    //   case 4:
    //     day = "Friday";
    //     break;
    //   case 5:
    //     day = "Saturday";
    //     break;
    //   case 6:
    //     day = "Sunday";
    //     break;
    // }
  }, []);


    console.log(showModal);
  return (
    <>
      {showModal ? (
        <div className="modal-background">
          <div className="notes-form">
            <div className="notes-form-row">
              <b id="agency-name-text">
                {event.event._def.title}
              </b>
            </div>
            <div className="notes-form-row">              
              <button onClick = {changeColor}>Change Color</button>
              <p>{getFreq()} on {getDay()}</p>
            </div>
            <div className="button-row">
              <div className="delete-form-col">
                <div className="button-pos">
                  <FormButton
                    title="Confirm"
                    type="primary"
                    style={{ width: "315px", height: "60px" }}
                  />
                </div>
              </div>
              <div className="delete-form-col">
                <div className="button-pos">
                  <FormButton
                    title="Cancel"
                    type="secondary"
                    style={{ width: "315px", height: "60px" }}
                    onClick={toggleModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default NotesModal;