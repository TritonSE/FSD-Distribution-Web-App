import React, { Component } from "react";
import { Form } from "react-bootstrap";
import './CalendarToolbar.css';

/**
 * Landing page that contains a calender with corresponding events
 */
class CalendarToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDistribution: true,
      showRescue: true,
      distribution: this.props.distribution,
      rescue: this.props.rescue
    };

    this.handleShowAgencies = this.handleShowAgencies.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    if (event.target.value.length == 0) {
      this.setState({ distribution: this.props.distribution });
      this.setState({ rescue: this.props.rescue });
    } else {
      let filtered = this.props.distribution.filter((agency) => {
        return agency.name.startsWith(event.target.value);
      });
      this.setState({ distribution: filtered });

      filtered = this.props.rescue.filter((agency) => {
        return agency.name.startsWith(event.target.value);
      });
      this.setState({ rescue: filtered });
    }
  }

  handleShowAgencies(event) {
    switch (event.target.textContent) {
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
      this.props.updateDistributionAll(event.target.checked);
      // toggle all rescue events
    } else if (event.target.value === "rescue") {
      const checkboxes = document.getElementsByName("rescueCheckbox");
      for (const checkbox of checkboxes) {
        checkbox.checked = event.target.checked;
      }
      this.props.updateRescueAll(event.target.checked);
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
          {showDistribution ? <h5>Distribution</h5> : <p>Distribution</p>}
        </button>
        { showDistribution &&
          (
            <div>
              <label style={{ marginLeft: 20 }}>
                <input
                  style={{ margin: 5, marginLeft: -20 }}
                  type="checkbox"
                  value="distribution"
                  onChange={this.handleCheck}
                />
              All
            </label>
              <br />
              {this.state.distribution.map((agency, index) => { // 
                return (
                  <div key={index}>
                    <label style={{ backgroundColor: agency.color, marginLeft: 20 }} value={agency.name} name="distributionCheckbox">
                      <input
                        style={{ margin: 5, marginLeft: -20, float: "left" }}
                        type="checkbox"
                        value={agency.name}
                        onChange={this.props.updateDistribution}
                        name="distributionCheckbox"
                      />
                      {agency.name}
                    </label>

                  </div>
                );
              })}
            </div>
          )
        }
        <br />
        <button style={{ border: "none", background: "none" }} value="rescue" onClick={this.handleShowAgencies}>
          {showRescue ? <h5>Rescue</h5> : <p>Rescue</p>}
        </button>
        { showRescue &&
          (
            <div>
              <label>
                <input
                  style={{ margin: 5 }}
                  type="checkbox"
                  value="rescue"
                  onChange={this.handleCheck}
                />
              All
            </label>
              <br />
              {this.state.rescue.map((agency, index) => {
                return (
                  <div key={index}>
                    <input
                      style={{ margin: 5 }}
                      type="checkbox"
                      value={agency.name}
                      onChange={this.props.updateRescue}
                      name="rescueCheckbox"
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