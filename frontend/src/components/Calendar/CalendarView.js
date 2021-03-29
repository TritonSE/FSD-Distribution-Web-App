import React, { Component } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import rrulePlugin from '@fullcalendar/rrule'

const testEvents = [
  {
    groupdId: "Steves best",
    title: "Today's Task",
    rrule: {
      freq: "weekly",
      interval: 2,
      byweekday: [ 'mo', 'we', 'fr' ],
      dtstart: '2021-03-08T09:30:00',
      until: '2021-05-20'
    },
    duration: '02:00',
    extendedProps: {
      note: "Here is a note",
      type: 3
    }
  },
  {
    groupdId: "The Shock",
    title: "wow another task here",
    startTime: "11:30",
    endTime: "13:30",
    startRecur: "2021-03-28",
    endRecur: "2021-07-20",
    daysOfWeek: [ "2", "4", "6" ],
    extendedProps: {
      note: "Here is a note",
      type: 4 
    }
  },
];

class CalendarView extends Component {
  state = {
    events: testEvents,
  };

  handleRender(info) {
    // render background color of event
    console.log(info.event.groupdId)
    if(info.event.groupdId === this.props.agency) {
      return this.props.visible;
    }
  }

  render() { 
    return (
      <FullCalendar 
        plugins={[ rrulePlugin, dayGridPlugin ]}
        initialView="dayGridMonth"
        events={ this.state.events }
        eventRender={ this.handleRender }
      />
    );
  }
}

export default CalendarView;