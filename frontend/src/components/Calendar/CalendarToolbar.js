import React, { Component } from "react";
import { Form } from "react-bootstrap";

/**
 * Landing page that contains a calender with corresponding events
 */
class CalendarToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDistribution: true,
      showRescue: true,
      searchValue: "",
    };

    this.handleShowAgencies = this.handleShowAgencies.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    this.setState({searchValue: event.target.value});
    const agencies = document.getElementsByName(this.state.searchValue);

    const distributionAgencies = document.getElementsByName("distributionCheckbox");
    const rescueAgencies = document.getElementsByName("rescueCheckox");
    const show = this.state.searchValue.length != 0;

    for (const agency of distributionAgencies) {
      if (agency.value) {
        if (!show) {
          agency.hidden = false;
        } else if (!agency.value.startsWith(this.state.searchValue)) {
          agency.hidden = true;
        }
      } else {

      }
    }

    for (const agency of rescueAgencies) {
      if (!(agency.value.startsWith(this.state.searchValue))) {
        agency.hidden = this.state.searchValue.length == 0 ? false : true; 
      }
    }
  }

  handleShowAgencies(event) {
    switch(event.target.textContent) {
      case "Distribution":
        this.setState({
          showDistribution: !this.state.showDistribution
        });
        break;
      case "Rescue":
        this.setState({
          showRescue: !this.state.showRescue
        });
        break;
      default:
        this.setState({
          showDistribution: !this.state.showDistribution,

          showRescue: !this.state.showRescue,
        });
        break;
    }
  }

  handleCheck(event) {
    // toggle all distribution events
    if (event.target.value === "distribution") {
      const checkboxes = document.getElementsByName("distributionCheckbox");
      for (const checkbox of checkboxes) {
        checkbox.checked = event.target.checked;
      }
      this.props.updateCalendar("da", [], event.target.checked);
    // toggle all rescue events
    } else if (event.target.value === "rescue") {
      const checkboxes = document.getElementsByName("rescueCheckbox");
      for (const checkbox of checkboxes) {
        checkbox.checked = event.target.checked;
      }
      this.props.updateCalendar("ra", [], event.target.checked);
    // toggle a rescue event
    } else if (event.target.id === "r"){
      this.props.updateCalendar("r", event.target.value, event.target.checked);
    // toggle a distribution event
    } else {
      this.props.updateCalendar("d", event.target.value, event.target.checked);
    }
  }

  render() {
    const { showDistribution, showRescue } = this.state;
    return (
      <div style={{ 
        backgroundColor: "#F5F7F7", 
        marginTop: "5vh", 
        marginLeft: "5vw", 
        height: "100vh", 
        padding: 10,  
        transform: 0.6
      }}>
        <input id="search" type="text" onChange={this.handleSearchChange} placeholder="Search Agency" />
        <button style={{ border: "none", background: "none" }} value="distributionnpm" onClick={this.handleShowAgencies}>
          { showDistribution ? <h5>Distribution</h5> : <p>Distribution</p> }
        </button>
        { showDistribution &&
         (
          <div>
            <input
              style={{margin: 5}}
              type="checkbox"
              value="distribution"
              onChange={this.handleCheck}
            />
            <label>
              All
            </label>
            <br />
            {this.props.distribution.map((agency, index) => {
              return (
                <div key={index}>
                  <input
                    style={{margin: 5}}
                    type="checkbox"
                    value={agency.name}
                    onChange={this.handleCheck}
                    name="distributionCheckbox"
                    id="d"
                  />
                  <label style={{ backgroundColor: agency.color }} name="distributionCheckbox">
                    {agency.name}
                  </label>
                  <br />
               </div>
              );
            })} 
          </div>
         )
        }
        <br />
        <button style={{ border: "none", background: "none" }} value="rescue" onClick={this.handleShowAgencies}>
          { showRescue? <h5>Rescue</h5> : <p>Rescue</p> }
        </button>
        { showRescue &&
         (
          <div>
            <label>
              <input
                style={{margin: 5}}
                type="checkbox"
                value="rescue"
                onChange={this.handleCheck}
              />
              All
            </label>
            <br />
            {this.props.rescue.map((agency, index) => {
              return (
                <div key={index}>
                  <input
                      style={{margin: 5}}
                      type="checkbox"
                      value={agency.name}
                      onChange={this.handleCheck}
                      name="rescueCheckbox"
                      id="r"
                  />
                  <label style={{ backgroundColor: agency.color }} name="rescueCheckbox">
                    {agency.name}
                  </label>
                  <br />
               </div>
              );
            })} 
          </div>
         )
        }
      </div>
    );
  }
}

export default CalendarToolbar;