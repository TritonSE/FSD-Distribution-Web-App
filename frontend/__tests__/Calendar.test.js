import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from "../src/pages/Home/Home";
import { agencyEventData } from "../__mocks__/agencyEventData";
import {
  distributionAgency1,
  distributionAgency2,
  rescueAgency1,
  rescueAgency2,
} from "../__mocks__/parsedAgencyEventData";

Enzyme.configure({ adapter: new Adapter() });

describe("Home.populateEvents", () => {
  it("parse data into events and mutate", () => {
    // create sample db data
    const component = shallow(<Home testData={agencyEventData} />);
    const instance = component.instance();

    const agency1Name = distributionAgency1.title[0].name;
    const agency2Name = distributionAgency2.title[0].name;
    const agency1DistributionEvents = distributionAgency1.events;
    const agency2DistributionEvents = distributionAgency2.events;
    const agency1RescueEvents = rescueAgency1.events;
    const agency2RescueEvents = rescueAgency2.events;

    // check distributionMap
    expect(component.state("distributionMap")).toEqual({
      [agency1Name]: agency1DistributionEvents,
      [agency2Name]: agency2DistributionEvents,
    });

    // check distribution
    expect(component.state("distribution")).toEqual([
      distributionAgency1.title[0],
      distributionAgency2.title[0],
    ]);

    // check rescueMap
    expect(component.state("rescueMap")).toEqual({
      [agency1Name]: agency1RescueEvents,
      [agency2Name]: agency2RescueEvents,
    });

    // check rescue
    expect(component.state("rescue")).toEqual([rescueAgency1.title[0], rescueAgency2.title[1]]);

    // check one distribution event
    instance.updateDistribution({ target: { checked: true, value: agency1Name } });
    expect(component.state("distributionEvents")).toEqual(agency1DistributionEvents);

    // check all distribution events
    instance.updateDistributionAll(true);
    expect(component.state("distributionEvents")).toEqual(
      agency1DistributionEvents.concat(agency2DistributionEvents)
    );

    // uncheck all distribution events
    instance.updateDistributionAll(false);
    expect(component.state("distributionEvents")).toEqual([]);

    // check a rescue event
    instance.updateRescue({ target: { checked: true, value: agency1Name } });
    expect(component.state("rescueEvents")).toEqual(agency1RescueEvents);

    // check all rescue events
    instance.updateRescueAll(true);
    expect(component.state("rescueEvents")).toEqual(
      agency1RescueEvents.concat(agency2RescueEvents)
    );

    instance.updateRescueAll(false);
    expect(component.state("rescueEvents")).toEqual([]);
  });
});
