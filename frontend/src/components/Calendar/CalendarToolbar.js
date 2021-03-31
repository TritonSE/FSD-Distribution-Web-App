import React, { Component } from 'react';

/**
 * Landing page that contains a calender with corresponding events
 */
class CalendarToolbar extends Component {
  constructor(props) {
    super(props);
  }

  handleCheck(event) {
    console.log(event.target.checked);
    this.props.updateCalendar(event.target.name, event.target.checked);
  }

  render() {
    return (
      <div style={{ backgroundColor: "#F5F7F7", marginTop: "5vh", marginLeft: "5vw", height: "70vh" }}>
        <h2>Distribution</h2>
        {this.props.distribution.map((agency, index) => {
          return (
            <div>
              <label style={{ backgroundColor: agency.color }}>
                <input
                  type="checkbox"
                  value={agency.name}
                  onChange={this.handleCheck}
                />
                {agency.name}
              </label>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export default CalendarToolbar;