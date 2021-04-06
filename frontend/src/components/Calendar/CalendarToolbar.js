import React, { Component } from 'react';

/**
 * Landing page that contains a calender with corresponding events
 */
class CalendarToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDistribution: false,
      showRescue: false,
    };

    this.handleShowAgencies = this.handleShowAgencies.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleShowAgencies(event) {
    switch(event.target.outerText) {
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
    this.props.updateCalendar(event.target.value, event.target.checked);
  }

  render() {
    const { showDistribution, showRescue } = this.state;
    return (
      <div style={{ backgroundColor: "#F5F7F7", marginTop: "5vh", marginLeft: "5vw", height: "70vh" }}>
        <button style={{ border: "none", background: "none" }} onClick={this.handleShowAgencies}>
          All
        </button>
        <br />
        <button style={{ border: "none", background: "none" }} value="distribution" onClick={this.handleShowAgencies}>
          { showDistribution? <h5>Distribution</h5> : <p>Distribution</p> }
        </button>
        { showDistribution?
         (
          <div>
            <label>
              <input
                type="checkbox"
                value="distribution"
                onChange={this.handleCheck}
              />
              All
            </label>
            <br />
            {this.props.distribution.map((agency, index) => {
              return (
                <div key={index}>
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
        ) : 
          (null)
        }
        <br />
        <button style={{ border: "none", background: "none" }} value="rescue" onClick={this.handleShowAgencies}>
          { showRescue? <h5>Rescue</h5> : <p>Rescue</p> }
        </button>
        { showRescue?
         (
          <div>
            <label>
              <input
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
        ) : 
          <br />
        }
      </div>
    );
  }
}

export default CalendarToolbar;