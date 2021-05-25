import React from "react";
import TestRenderer from "react-test-renderer";
import Home from "../src/pages/Home";
import CalendarToolbar from "../src/components/Calendar/CalendarToolbar";
import agencyEventData from "../__mocks__/agencyEventData";

describe("Home.populateEvents", () => {
  it("create test data", () => {
    // create sample db data
    const data = {agences: [ 
      agencyEventData
    ]}
    
    const component = TestRenderer.create(<Home.WrappedComponent testData={data} />)
      .root.instance;
    });

    // check distributionMap
    expect(component.state.distributionMap).toEqual([
      
    ])
    // check distribution
    expect(component.state.distribution).toEqual([
      
    ])
    // check rescueMap
    expect(component.state.rescueMap).toEqual([
      
    ])
    // check rescue
    expect(component.state.rescue).toEqual([
      
    ])

});

describe("Home.filterEvents", () => {
    it("updateDistributionAll", () => {
      
    });

    it("updateDistribution", () => {
      
    });

    it("updateRescueAll", () => {
      
    });

    it("updateRescue", () => {
      
    });
});

describe("CalendarToolbar.populateLabels", () => {

})
