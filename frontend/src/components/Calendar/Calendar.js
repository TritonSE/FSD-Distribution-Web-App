import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const testEvents = [
  {
    start: moment().toDate(),
    end: moment()
         .add(1, "days")
         .toDate(),
    title: "Some title",
    note: "Here is a note",
    type: 3
  },
  {
    start: moment("2021-03-24 09:30").toDate(),
    end: moment("2021-03-24 12:30").toDate(),
    title: "Another Event",
    note: "Here is a note",
    type: 4
  },
  {
    start: moment("2021-03-24 11:00").toDate(),
    end: moment("2021-03-24 13:30").toDate(),
    title: "Another Event",
    note: "Here is a note",
    type: 2
  },
  {
    start: moment("2021-03-24 10:00").toDate(),
    end: moment("2021-03-24 12:30").toDate(),
    title: "Another Event",
    note: "Here is a note",
    type: 1
  }
];

const selectedEvent = (event, e) => {
  event.title = `${event.title}`;
  const res = prompt(`you tapped on an event with the title ${event.title}. \n
    Note is... ${event.note}. Please change the note to something.`);
    
  event.note = res;
}

const eventPropGetter = (event, start, end, isSelected) => {
  let newStyle = {
    backgroundColor: "yellow"
  };

  if (event.type === 4) {
    newStyle.backgroundColor = "magenta";
  }
  else if (event.type === 2) {
    newStyle.backgroundColor = "gray"
  }
  
  return {
    style: newStyle
  }
}

class CalendarView extends Component {
  state = {
    events: testEvents
  };

  render() { 
    return (
      <div className="App">
        { <Calendar
          localizer={ localizer }
          defaultDate={ new Date() }
          defaultView="month"
          events={ this.state.events }
          style={{ paddingTop: "5vh", paddingBottom: "5vh", paddingLeft: "5vw", paddingRight: "5vw", height: "75vh", font_family: "roboto" }}
          onSelectEvent={ selectedEvent }
          eventPropGetter={ eventPropGetter }
        /> }
      </div>
    );
  }
}

export default CalendarView;