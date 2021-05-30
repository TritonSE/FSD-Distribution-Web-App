import React from "react";
import TestRenderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from "../src/pages/Home/Home";
import CalendarToolbar from "../src/components/Calendar/CalendarToolbar";
import agencyEventData from "../__mocks__/agencyEventData";

Enzyme.configure({ adapter: new Adapter() })

describe("Home.populateEvents", () => {
  it("create test data", () => {
    // create sample db data
    const data = {agencies: [ 
      agencyEventData
    ]}

    const component = shallow(<Home testData={data} />)

    // check distributionMap
    expect(component.state("distributionMap")).toEqual({
      "Agency With Timezone Offsets" : [ 
        {
          "title": "Agency With Timezone Offsets",
          "rrule": {
            "freq": "weekly",
            "interval": 1,
            "byweekday": "mo",
            "wkst": "mo",
            "dtstart": "2021-05-01T09:00-07:00"
          },
          "duration": "02:00",
          "color": "hsl(0, 50%, 50%)",
          "exdate": ["2021-05-31"]
        },
        {
          "title": "Agency With Timezone Offsets",
          "start": "2021-05-13T17:00-07:00",
          "end": "2021-05-13T17:00-07:00",
          "duration": "02:00",
          "color": "hsl(0, 50%, 50%)"
        }
      ]
    })
    // // check distribution
    // expect(component.state.distribution).toEqual([
      
    // ])
    // // check rescueMap
    // expect(component.state.rescueMap).toEqual([
      
    // ])
    // // check rescue
    // expect(component.state.rescue).toEqual([
      
    // ])
  });
});

// describe("Home.filterEvents", () => {
//     it("updateDistributionAll", () => {
      
//     });

//     it("updateDistribution", () => {
      
//     });

//     it("updateRescueAll", () => {
      
//     });

//     it("updateRescue", () => {
      
//     });
// });

// describe("CalendarToolbar.populateLabels", () => {

// })
