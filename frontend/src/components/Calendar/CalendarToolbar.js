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
      distributionChecked: {},
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
   * @param {Object} event: event object of search bar
   */
  handleSearchChange(event) {
    const agencyName = event.target.value;
    this.setState({ searchValue: agencyName });
    if (agencyName.length === 0) {
      this.setState({ distribution: this.props.distribution });
      this.setState({ rescue: this.props.rescue });
    } else {
      let filtered = this.props.distribution.filter((agency) => agency.name.startsWith(agencyName));
      this.setState({ distribution: filtered });

      filtered = this.props.rescue.filter((agency) => agency.name.startsWith(agencyName));
      this.setState({ rescue: filtered });
    }
  }

  /**
   * Allows the showing/hiding of events based on category.
   * @param {Object} event: event object of the category label
   */
  handleShowAgencies(event) {
    switch (event.target.textContent) {
      case "Distribution":
        this.setState((prevState) => ({
          showDistribution: !prevState.showDistribution,
        }));
        break;
      case "Rescue":
        this.setState((prevState) => ({
          showRescue: !prevState.showRescue,
        }));
        break;
      default:
        this.setState((prevState) => ({
          showDistribution: !prevState.showDistribution,
          showRescue: !prevState.showRescue,
        }));
        break;
    }
  }

  /**
   * Handles selection of the ALL checkboxes based on category.
   * @param {Object} event: event object of the ALL checkbox
   */
  handleCheck(event) {
    const category = event.target.value;
    const isChecked = event.target.checked;

    // toggle all distribution events
    if (category === "distribution") {
      this.state.distributionChecked["all"] = isChecked;
      for (const entry of this.state.distribution) {
        this.state.distributionChecked[entry.name] = isChecked;
      }
      this.props.updateDistributionAll(isChecked);
      // toggle all rescue events
    } else if (category === "rescue") {
      this.state.rescueChecked["all"] = isChecked;
      for (const entry of this.state.rescue) {
        this.state.rescueChecked[entry.name] = isChecked;
      }
      this.props.updateRescueAll(isChecked);
    }
  }

  render() {
    const { showDistribution, showRescue, distributionChecked, rescueChecked } = this.state;
    return (
      <div
        className="toolbar"
        style={{ minHeight: Math.ceil((window.screen.height - 185) * 0.71) }}
      >
        <input
          id="search"
          type="text"
          onChange={this.handleSearchChange}
          className="toolbar-search"
          placeholder="Search Agency"
        />
        <button
          className="filter-heading"
          value="distributionnpm"
          type="button"
          onClick={this.handleShowAgencies}
        >
          {showDistribution ? <h5>Distribution</h5> : <p>Distribution</p>}
        </button>
        {showDistribution && (
          <div>
            <label className="distribution-label">
              <input
                className="filter-input"
                type="checkbox"
                value="distribution"
                onChange={this.handleCheck}
                checked={!!distributionChecked["all"]}
              />
              All
            </label>

            {this.state.distribution.map((agency, index) => (
              <div className="filter-holder" key={index}>
                <label
                  className="distribution-label"
                  style={{ backgroundColor: agency.color }}
                  name="distributionCheckbox"
                >
                  <input
                    className="filter-input"
                    type="checkbox"
                    value={agency.name}
                    onChange={(e) => {
                      distributionChecked[e.target.value] = !distributionChecked[e.target.value];
                      this.props.updateDistribution(e);
                    }}
                    checked={!!distributionChecked[agency.name]}
                    name="distributionCheckbox"
                  />
                  {agency.name}
                </label>
              </div>
            ))}
          </div>
        )}
        <br />
        <button
          className="filter-heading"
          value="rescue"
          type="button"
          onClick={this.handleShowAgencies}
        >
          {showRescue ? <h5>Rescue</h5> : <p>Rescue</p>}
        </button>
        {showRescue && (
          <div>
            <label className="distribution-label">
              <input
                className="filter-input"
                type="checkbox"
                value="rescue"
                onChange={this.handleCheck}
                checked={!!rescueChecked["all"]}
              />
              All
            </label>
            {this.state.rescue.map((agency, index) => (
              <div className="filter-holder" key={index}>
                <label
                  className="rescue-label"
                  style={{ borderColor: agency.color }}
                  name="rescueCheckbox"
                >
                  <input
                    className="filter-input"
                    type="checkbox"
                    value={agency.name}
                    onChange={(e) => {
                      rescueChecked[e.target.value] = !rescueChecked[e.target.value];
                      this.props.updateRescue(e);
                    }}
                    checked={!!rescueChecked[agency.name]}
                    name="rescueCheckbox"
                  />
                  {agency.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default CalendarToolbar;
