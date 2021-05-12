import React, { Component } from "react";

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
 * - {String} searchValue: String value that the search bar will hold
 * - {Hashmap} checked: hashmap that maps the distribution agency's checkbox label to whether it is checked
 * - {Hashmap} rescueChecked: hashmap that maps the rescue agency's checkbox label to whether it is checked
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
      checked: {},
      rescueChecked: {},
    };

    this.handleShowAgencies = this.handleShowAgencies.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.searchValue.length === 0) {
      return { distribution: props.distribution, rescue: props.rescue }; 
    }
    return state;
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
      this.state.checked["all"] = isChecked;
      for(const entry of this.state.distribution) {
        this.state.checked[entry.name] = isChecked;
      }
      this.props.updateDistributionAll(isChecked);
      // toggle all rescue events
    } else if (category === "rescue") {
      this.state.rescueChecked["all"] = isChecked;
      for(const entry of this.state.rescue) {
        this.state.rescueChecked[entry.name] = isChecked;
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
        minHeight: Math.ceil((window.screen.height - 185)*0.76),
        padding: 10,
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
                  checked={!!this.state.checked["all"]}
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
                        onChange={(e) => { this.state.checked[e.target.value] = !this.state.checked[e.target.value]; this.props.updateDistribution(e);}}
                        checked={!!this.state.checked[agency.name]}
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
                  checked={!!this.state.rescueChecked["all"]}
                />
              All
            </label>
              <br />
              {this.state.rescue.map((agency, index) => {
                return (
                  <div key={index}>
                    <label style={{ borderColor: agency.color, borderWidth: "2px", borderStyle: "solid", marginLeft: 20 }} name="rescueCheckbox">
                      <input
                        style={{ margin: 5, marginLeft: -20, float: "left" }}
                        type="checkbox"
                        value={agency.name}
                        onChange={this.props.updateRescue}
                        checked={!!this.state.rescueChecked[agency.name]}
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