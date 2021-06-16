export const agencyEventData = {
  agencies: [
    {
      userSelectedDates: ["2021-05-13T17:00-07:00"],
      userExcludedDates: ["2021-05-31"],
      tableContent: {
        _id: { $oid: "6094197bd70a8b178f7b19af" },
        agencyNumber: { $numberInt: "5678" },
        name: "Agency With Timezone Offsets",
        status: "Active",
        region: "1",
        city: "San Diego",
        staff: "Charlie",
        dateOfInitialPartnership: "01/01/2022",
        standAloneFreezer: { $numberInt: "0" },
        freezerFridge: { $numberInt: "0" },
        chestFreezer: { $numberInt: "0" },
        singleDoorFreezer: { $numberInt: "0" },
        freezerFridgeCombo: { $numberInt: "0" },
        walkInFreezer: { $numberInt: "0" },
        doubleDoorFridge: { $numberInt: "0" },
        sideBySideFridge: { $numberInt: "0" },
        singleDoorFridge: { $numberInt: "0" },
        walkInFridge: { $numberInt: "0" },
        dryStorageClimateControl: { $numberInt: "0" },
        dryStorageNonClimateControl: { $numberInt: "0" },
        pickUpTruck: { $numberInt: "0" },
        van: { $numberInt: "0" },
        car: { $numberInt: "0" },
        phone: "555-456-7890",
      },
      distributionDays: {
        _id: { $oid: "6094197bd70a8b178f7b19b1" },
        monday: true,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      distributionStartTimes: {
        _id: { $oid: "6094197bd70a8b178f7b19b2" },
        monday: "2021-05-01T09:00-07:00",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
      distributionStartDate: "05/01/2021",
      distributionFrequency: 1,
      distributionExcludedTimes: {
        _id: { $oid: "60b0c930fa2e445f98c9af0d" },
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
      retailRescueDays: {
        _id: { $oid: "6094197bd70a8b178f7b19b3" },
        monday: true,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      retailRescueStartTimes: {
        _id: { $oid: "6094197bd70a8b178f7b19b4" },
        monday: "2021-05-01T00:00-07:00",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
      retailRescueLocations: {
        _id: { $oid: "6094197bd70a8b178f7b19b5" },
        monday: "Place",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
      retailRescueExcludedTimes: {
        _id: { $oid: "60b0c930fa2e445f98c9af0d" },
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
    },
    {
      userSelectedDates: [],
      userExcludedDates: [],
      tableContent: {
        _id: { $oid: "6094197bd70a8b178f7b19af" },
        agencyNumber: { $numberInt: "1234" },
        name: "Agency B",
        status: "Active",
        region: "1",
        city: "San Diego",
        staff: "Charlie",
        dateOfInitialPartnership: "01/01/2022",
        standAloneFreezer: { $numberInt: "0" },
        freezerFridge: { $numberInt: "0" },
        chestFreezer: { $numberInt: "0" },
        singleDoorFreezer: { $numberInt: "0" },
        freezerFridgeCombo: { $numberInt: "0" },
        walkInFreezer: { $numberInt: "0" },
        doubleDoorFridge: { $numberInt: "0" },
        sideBySideFridge: { $numberInt: "0" },
        singleDoorFridge: { $numberInt: "0" },
        walkInFridge: { $numberInt: "0" },
        dryStorageClimateControl: { $numberInt: "0" },
        dryStorageNonClimateControl: { $numberInt: "0" },
        pickUpTruck: { $numberInt: "0" },
        van: { $numberInt: "0" },
        car: { $numberInt: "0" },
        phone: "555-456-7890",
      },
      distributionDays: {
        _id: { $oid: "6094197bd70a8b178f7b19b1" },
        monday: false,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      distributionStartTimes: {
        _id: { $oid: "6094197bd70a8b178f7b19b2" },
        monday: "",
        tuesday: "",
        wednesday: "2021-05-01T09:00-07:00",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
      distributionStartDate: "05/01/2021",
      distributionFrequency: 1,
      retailRescueDays: {
        _id: { $oid: "6094197bd70a8b178f7b19b3" },
        monday: false,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      distributionExcludedTimes: {
        _id: { $oid: "60b0c930fa2e445f98c9af0d" },
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
      retailRescueStartTimes: {
        _id: { $oid: "6094197bd70a8b178f7b19b4" },
        monday: "",
        tuesday: "",
        wednesday: "2021-05-01T00:00-07:00",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
      retailRescueLocations: {
        _id: { $oid: "6094197bd70a8b178f7b19b5" },
        monday: "",
        tuesday: "",
        wednesday: "Place",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
      retailRescueExcludedTimes: {
        _id: { $oid: "60b0c930fa2e445f98c9af0d" },
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
    },
  ],
};
