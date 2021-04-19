import React, { Component } from 'react';

/**
 * Landing page that contains a calender with corresponding events
 */
class CalendarToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDistribution: true,
      showRescue: true,
    };

    this.handleShowAgencies = this.handleShowAgencies.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
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
    if (event.target.value === "distribution") {
      const checkboxes = document.getElementsByName('distributionCheckbox');
      for (const checkbox of checkboxes) {
        checkbox.checked = event.target.checked;
      }
      this.props.updateCalendar("da", [], event.target.checked);
    } else if (event.target.value === "rescue") {
      const checkboxes = document.getElementsByName('rescueCheckbox');
      for (const checkbox of checkboxes) {
        checkbox.checked = event.target.checked;
      }
      this.props.updateCalendar("ra", [], event.target.checked);
    } else if (event.target.id === "r"){
      this.props.updateCalendar("r", event.target.value, event.target.checked);
    } else {
      this.props.updateCalendar("d", event.target.value, event.target.checked);
    }
  }

  render() {
    const { showDistribution, showRescue } = this.state;
    return (
      <div style={{ backgroundColor: "#F5F7F7", marginTop: "5vh", marginLeft: "5vw", height: "100vh", padding: 10,  transform: 0.6}}>
        <button style={{ border: "none", background: "none" }} value="distributionnpm" onClick={this.handleShowAgencies}>
          { showDistribution? <h5>Distribution</h5> : <p>Distribution</p> }
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
                  <label style={{ backgroundColor: agency.color }}>
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
                  <label style={{ backgroundColor: agency.color }}>
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