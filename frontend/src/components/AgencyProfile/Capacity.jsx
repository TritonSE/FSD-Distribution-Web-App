import React from "react";
import EditButton from "./EditButton";

/**
 * Functional component for the capacity category
 *
 * @param {*} agency
 * @returns {*} Capacity component
 */
function Capacity({ agency }) {
  const storages = {
    "Stand Alone Freezers": agency.tableContent.standAloneFreezer,
    "Freezer Fridges": agency.tableContent.freezerFridge,
    "Chest Freezers": agency.tableContent.chestFreezer,
    "Single Door Freezers": agency.tableContent.singleDoorFreezer,
    "Freezer Fridge Combos": agency.tableContent.freezerFridge.combo,
    "Walk-In Freezers": agency.tableContent.walkInFreezer,
    "Double Door Fridges": agency.tableContent.doubleDoorFridge,
    "Side By Side Fridges": agency.tableContent.sideBySideFridge,
    "Single Door Fridges": agency.tableContent.singleDoorFridge,
    "Walk-In Fridges": agency.tableContent.walkInFridge,
    "Dry Storages (Climate Control)": agency.tableContent.dryStorageClimateControl,
    "Dry Storages (Non-CLimate Control)": agency.tableContent.dryStorageNonClimateControl,
  };

  const transports = {
    "Pick-up Trucks": agency.tableContent.pickUpTruck,
    Vans: agency.tableContent.van,
    Cars: agency.tableContent.car,
  };

  /**
   * Function takes in an object and returns a string of the keys and their values
   * if the values satisfy the given condition
   *
   * @param {*} items
   * @returns {string} String of keys and values
   */
  function displayList(items) {
    let displayedStr = "";
    for (let [key, value] of Object.entries(items)) {
      if (value > 0) {
        displayedStr = displayedStr + `${value} ${key}, `;
      }
    }
    displayedStr = displayedStr.replace(/,\s*$/, "");
    return displayedStr;
  }

  return (
    <>
      <div className="agency-category">
        <EditButton section="capacity" agency={agency} />
        <h1 className="category-title">CAPACITY</h1>
        <div className="capacity-wrapper">
          <p>
            <strong>Storage and Type:</strong>
            &nbsp;{displayList(storages)}
          </p>
          <p>
            <strong>Transportation and Type:</strong>
            &nbsp;{displayList(transports)}
          </p>
        </div>
      </div>
    </>
  );
}

export default Capacity;
