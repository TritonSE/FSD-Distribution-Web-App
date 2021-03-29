import React, { Component } from 'react';
import { getJWT } from "../../auth";
const config = require("../../config");

/**
 * Landing page that contains a calender with corresponding events
 */
class CalendarToolbar extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      nameMap: { },
      // agencies: [],
      visible: [], // agency -> events
      colors: [],
      pantry: [],
      mealProgram: [],
      homeboundDeliveryPartner: [], 
      largeScaleDistributionSite: [],
      residentialFacility: []
    }
  }   
  
  componentDidMount() {
    fetch(`${config.backend.uri}/agency`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getJWT(),
      }
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.ok) {
            for(let i = 0; i < data.agencies.length; i++) {
              const name = data.agencies[i].tableContent.name;

              // add a reference between the agency name and index in other arrays
              this.state.nameMap[name] = i;

              // this.state.agencies.push(response.agencies[i]);
              this.state.visible.push(false);
              
              if (data.agencies[i].pantry) {
                this.setState({pantry: [...this.state.pantry, name]});
              }

              if (data.agencies[i].mealProgram) {
                this.setState({mealProgram: [...this.state.mealProgram, name]});
              }

              if (data.agencies[i].homeboundDeliveryPartner) {
                this.setState({homeboundDeliveryPartner: [...this.state.homeboundDeliveryPartner, name]});
              }
              
              if (data.agencies[i].largeScaleDistributionSite) {
                this.setState({largeScaleDistributionSite: [...this.state.largeScaleDistributionSite, name]});
              }

              if (data.agencies[i].residentialFacility) {
                this.setState({residentialFacility: [...this.state.residentialFacility, name]});
              }

              // generate a unique color for each agency
              // let colorRange = 0.6 / response.agencies.length;

              // for (let i = 0.2; i < 0.8; i+=colorRange) {
                
              // }
              let colorConstant = Math.random();

              const color = '#' + Math.floor(colorConstant*16777215).toString(16);
              this.setState({colors: [...this.state.colors, color]});
            }
            
            /*
              [{userElectedDates: [], userExcludedDates: [], ...}, {}, {}]

              for each agency
                generate a set of events 
                [
                  {
                    date info, 
                    agency,
                  },
                  {},
                  {}
                ]
            */
          }
        });
      })
      .catch((error) => console.error(error));
  }

  handleCheck(event) {
    // const i = this.state.nameMap[event.target.name];
    // this.state.visible[i] = !this.state.visible[i];
    // propogate to rerender calendar
    console.log(event.target.checked);
    this.props.updateCalendar(event.target.name, event.target.checked);
  }

  render() {
    return (
      <div style={{ backgroundColor: "gray", marginTop: "5vh", marginLeft: "5vw", height: "70vh" }}>
        <ul>
          <h3>Pantry</h3>
          {this.state.pantry.map((item, index) => {
            return (
              <li>
                <input type="checkbox" id={item} name={item} onChange={this.handleCheck}/>
                <label for={item} style={{ backgroundColor: this.state.colors[this.state.nameMap[item]] }}>{item}</label>
              </li>
            );
          })}
        </ul>
        <ul>
          <h3>Meal Program</h3>
          {this.state.mealProgram.map((item, index) => {
            return (
              <li>
                <input type="checkbox" id={item} name={item} />
                <label for={item} style={{ backgroundColor: this.state.colors[this.state.nameMap[item]] }}>{item}</label>
              </li>
            );
          })}
        </ul>
        <ul>
          <h3>Homebound Delivery Partner</h3>
          {this.state.homeboundDeliveryPartner.map((item, index) => {
            return (
              <li>
                <input type="checkbox" id={item} name={item} />
                <label for={item} style={{ backgroundColor: this.state.colors[this.state.nameMap[item]] }}>{item}</label>
              </li>
            );
          })}
        </ul>
        <ul>
          <h3>Large Scale Distribution Site</h3>
          {this.state.largeScaleDistributionSite.map((item, index) => {
            return (
              <li>
                <input type="checkbox" id={item} name={item} />
                <label for={item} style={{ backgroundColor: this.state.colors[this.state.nameMap[item]] }}>{item}</label>
              </li>
            );
          })}
        </ul>
        <ul>
          <h3>Residential Facility</h3>
          {this.state.residentialFacility.map((item, index) => {
            return (
              <li>
                <input type="checkbox" id={item} name={item} />
                <label for={item} style={{ backgroundColor: this.state.colors[this.state.nameMap[item]] }}>{item}</label>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CalendarToolbar;