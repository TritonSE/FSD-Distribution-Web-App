import React, { Component } from "react";
import "./CalendarToolbar.css";

/**
 * This component contains a toolbar of categorical events that will be used to update the display of the calendar.
 * This also contains an input bar that will filter out events based on Agency name.
 * 
 * State:
 * - {Boolean} showDistribution: Boolean that determines the showing/hiding of all distribution events
 * - {Boolean} showRescue: Boolean that determines the showing/hiding of all rescue events
 * - {Array<Objects>} distribution: list of agencies in the distribution category, contains name and color
 *                    (will be updated depending on search bar input)
 * - {Array<Objects>} rescue: list of agencies in the rescue category, contains name and color
 *                    (will be updated depending on search bar input)
 * 
 * Expected props:
 * - {Array<Objects>} distribution: list of agencies in the distribution
 *                    category, contains name and color
 * - {Array<Objects>} rescue: list of agencies in the rescue category, 
 *                    contains name and color
 * - {Function} updateDistribution: callback from selecting a single distribution event from toolbar to handle
 *              the calendar display, should take an event object
 * - {Function} updateDistributionAll: callback from selecting ALL in distribution section to handle
 *              the calendar display, should take a boolean
 * - {Function} updateRescue: callback from selecting a single rescue event from toolbar to handle
 *              the calendar display, should take an event object
 * - {Function} updateRescueAll: callback from selecting ALL in rescue section to handle
 *              the calendar display, should take a boolean
 */
class CalendarToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDistribution: true,
      showRescue: true,
      distribution: [],
      rescue: [],
      searchValue: "",
    };

    this.handleShowAgencies = this.handleShowAgencies.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    //console.log(new Date(Date.UTC(2021, 4, 3, 24, 18)))
    if (state.searchValue.length === 0) {
      return { distribution: props.distribution, rescue: props.rescue }; 
    }
  }

  /**
   * Handles any user input in search bar to filter out the agencies.
   * @param {object} event event object of search bar
   */
  handleSearchChange(event) {
    const agencyName = event.target.value;
    this.setState({ searchValue: agencyName });
    if (agencyName.length === 0) {
      this.setState({ distribution: this.props.distribution });
      this.setState({ rescue: this.props.rescue });
    } else {
      let filtered = this.props.distribution.filter((agency) => {
        return agency.name.startsWith(agencyName);
      });
      this.setState({ distribution: filtered });

      filtered = this.props.rescue.filter((agency) => {
        return agency.name.startsWith(agencyName);
      });
      this.setState({ rescue: filtered });
    }
  }

  /**
   * Allows the showing/hiding of events based on category.
   * @param {object} event event object of the category label
   */
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

  /**
   * Handles selection of the ALL checkboxes based on category.
   * @param {object} event event object of the ALL checkbox
   */
  handleCheck(event) {
    const category = event.target.value;
    const isChecked = event.target.checked;

    // toggle all distribution events
    if (category === "distribution") {
      const checkboxes = document.getElementsByName("distributionCheckbox");
      for (const checkbox of checkboxes) {
        checkbox.checked = isChecked;
      }
      this.props.updateDistributionAll(isChecked);
      // toggle all rescue events
    } else if (category === "rescue") {
      const checkboxes = document.getElementsByName("rescueCheckbox");
      for (const checkbox of checkboxes) {
        checkbox.checked = isChecked;
      }
      this.props.updateRescueAll(isChecked);
    }
  }

  render() {
    const { showDistribution, showRescue } = this.state;
    return (
      <div style={{
        backgroundColor: "#F5F7F7",
        marginTop: "5vh",
        marginLeft: "5vw",
        height: "100%",
        padding: 10,
        transform: 0.6
      }}>
        <input id="search" type="text" onChange={this.handleSearchChange} style={{ width: "100%", padding: 5 }} placeholder="Search Agency" />
        <br />
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
              {this.state.distribution.map((agency, index) => {
                return (
                  <div key={index}>
                    <label style={{ backgroundColor: agency.color, marginLeft: 20 }} name="distributionCheckbox">
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
              <label style={{ marginLeft: 20 }}>
                <input
                  style={{ margin: 5, marginLeft: -20 }}
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
                    <label style={{ border: agency.color, borderWidth: "2px", borderStyle: "solid", marginLeft: 20 }} name="rescueCheckbox">
                      <input
                        style={{ margin: 5, marginLeft: -20, float: "left" }}
                        type="checkbox"
                        value={agency.name}
                        onChange={this.props.updateRescue}
                        name="rescueCheckbox"
                      />
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