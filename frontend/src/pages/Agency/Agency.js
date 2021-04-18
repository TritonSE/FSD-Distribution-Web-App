import React, { useState, useEffect } from "react";
import CreateAgencyBtn from "../../components/CreateAgencyBtn/CreateAgencyBtn";
import Pagination from "../../components/AgencyTable/Pagination";
import Dropdown from "../../components/AgencyTable/Dropdown";
import Selected from "../../components/AgencyTable/Selected";
import DataTable from "../../components/AgencyTable/DataTable";
import "./Agency.css";
import { isAuthenticated } from "../../auth";
import { Redirect } from "react-router-dom";
import { getJWT } from "../../auth";

/**
 * The AgencyTable component is the main component for the table and contains the filtering
 * functions. It renders each part of the agency page. 
 * - {Object} fOptions : global object that contains the all filtering options
 * State:
 * - {Object} data: A JSON object holding the table content for all agencies
 * - {Object} filters: JSON object that holds all the filter options, initially set to fOptions
 * - {Number} currentPage: Holds the current page of the table
 * - {Number} entriesPerPage: Determines the number of entries displayed on each table page.
 * - {Array} selected: Array of currently selected filter options for the select labels. 
 */

//JSON object storing all filtering options
let fOptions = {
  search: '',

  Status: {
    Onboarding: false,
    Active: false,
    Inactive: false,
    "On hold": false,
  },

  Region: {
    S: false,
    NI: false,
    E: false,
    C: false,
    NC: false,
  },

  Staff: {},

  "Joined In": {},

  "Transportation": {
    Car: false,
    "Pickup Truck": false,
    Van: false,
  },

  "Storage": {
    "Stand Alone Freezer": false,
    "Freezer Fridge": false,
    "Chest Freezer": false,
    "Single Door Freezer": false,
    "Freezer Fridge Combo": false,
    "Walk In Freezer": false,
    "Double Door Fridge": false, 
    "Side By Side Fridge":false,
    "Single Door Fridge": false,
    "Walk In Fridge": false,
    "Dry Storage Climate Control": false,
    "Dry Storage Non Climate Control": false,
  }

};


function AgencyTable() {
  const [data, setData] = useState([]);
  const [filters, setFilter] = useState(fOptions);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(20);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/agency/table/all', { 
      method: "GET",
      headers: {
        Authorization: "Bearer " + getJWT(),
      } 
    })
    .then(res => res.json())
    .then(data => {
      setData(data.data);
      //fill in dynamic filter options from database
      for(let dat of data.data) {
        if(!(filters.Staff.hasOwnProperty(dat.tableContent.staff))) {
          filters.Staff[dat.tableContent.staff] = false;
        }
        if(dat.tableContent.dateOfInitialPartnership) {
          if(!(filters["Joined In"].hasOwnProperty(dat.tableContent.dateOfInitialPartnership.substring(6)))) {
            let year = dat.tableContent.dateOfInitialPartnership.substring(6);
            filters["Joined In"][year] = false;
          }
        }
      }; setFilter({...filters})
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  /**
   * Main filter function that passes the data for each agency (each row in the table) to a helper filtering method
   * @param {Array} rows The unfiltered data that is an array of each row of the table, i.e. each
   * entry of the array contains the information corresponding to each agency in the table
   */
  function search(rows) {
    return rows.filter(
      (row) => 
        checkOptions(row)
    );
  };

  /**
   * Filters the current row of the table based on the options set in the filters object. First performs the search based on
   * the currently set search query. Then, the row is filtered based on each dropdown option by calling the helper checkStatuses
   * @param {Object} row JSON object that contains the data for the current row being checked against the set filter options
   * @returns Boolean value, true if the current row's data matches the filter options and false otherwise
   */
  function checkOptions(row) {
    for(let option in filters) {
      //perform search
      if(option === "search") {
        let found = false;
        //search based on each word in the name
        let words = row.tableContent.name.toLowerCase().split(' ');
        let searched = filters.search.toLowerCase();
        for(let word of words) {
          found = word.startsWith(searched);
          if(found) {
            break;
          }
        }
        if(!(found || (row.tableContent.agencyNumber.toString().toLowerCase().startsWith(searched)))) {
          return false;
        }
        continue;
      }
      //call checkStatus to check non-search filters
      if(!(checkStatuses(row, option))) {
        return false;
      }
    }

    return true;
  }

  /**
   * Filters the passed in row based on the passed in option, ex: Staff is an option. The options Storage, Transportation, and
   * Joined In need special cases since they have different capitilization/spelling in the database than they do in the dropdown menus. 
   * @param {Object} row JSON object that contains the data for the current row being checked against the set filter options
   * @param {Object} option The current dropdown option being checked, ex: Staff. The option is itself a JSON object with
   * each choice set to true if the user has selected it and false otherwise, ex: a choice would be Mia if option is staff.
   * If the choice is set to true, then the row is checked. 
   * @returns A boolean, true if the current agency's data matches the currently set option, and false otherwise.
   */
  function checkStatuses(row, option) {
    let falseCount = 0;
    let runCount = 0;
    for(var key in filters[option]) {
      runCount++;
      if(filters[option][key] === true) {
        if(option === "Storage") {
          //storage names are formatted differently in database
          let storageKey = key;
          storageKey = storageKey.charAt(0).toLowerCase() + storageKey.slice(1);
          //regex to replace remove spaces between strings
          storageKey = storageKey.replace(/ +/g, "");
          if(row.tableContent[storageKey] > 0) {
            return true;
          }
          continue;
        }

        if(option === "Transportation") {
          let transportKey = key.toLowerCase();
          //pickup truck key is different in database
          if(key === "Pickup Truck") {
            transportKey = "pickUpTruck"
          }
          if(row.tableContent[transportKey] > 0) {
            return true;
          }
          continue;
        }

        if(option === "Joined In") {
          if(!row.tableContent["dateOfInitialPartnership"]) {
            return false;
          }
          if(row.tableContent["dateOfInitialPartnership"].substring(6).toLowerCase().indexOf(key.toLowerCase()) > -1) {
            return true;
          }
          continue;
        }
        //for all filter options that are not transport, join date, or storage
        if(row.tableContent[option.toLowerCase()].toString().toLowerCase().indexOf(key.toLowerCase()) > -1) {
          return true;
        }
      }
      else {
        falseCount++;
      }
    }
    
    //no filter options were set, so simply return true
    if(falseCount === runCount) {
      return true;
    }
    return false;
  }

  //calculate indices for pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;

  const filtered = search(data);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //change filter options
  const changeFilter = (newFilter) => setFilter(newFilter);
  //change array of selected filter options
  const changeSelected = (newSelected) => setSelected(newSelected);

  if (!isAuthenticated()) {
    return <Redirect to='login' />
  }

  return (
    <div className="agency-table">
      <div className="search-container">
      <label htmlFor="search" id="searchLabel">Search:</label>
        <input id="search" type="text" value={filters.search} onChange={(e) => {setFilter({
          ...filters,
          search: e.target.value,
        }); paginate(1)}} />
      </div>
      <div className="filter-container">
        <h2>Sort By:</h2>
        <div className="selects-container">
          <Dropdown filters={filters} selected={selected} changeSelected={changeSelected} changeFilter={changeFilter} paginate={paginate} option="Region"  />
          <Dropdown filters={filters} selected={selected} changeSelected={changeSelected} changeFilter={changeFilter} paginate={paginate} option="Status" />
          <Dropdown filters={filters} selected={selected} changeSelected={changeSelected} changeFilter={changeFilter} paginate={paginate} option="Staff" />
          <Dropdown filters={filters} selected={selected} changeSelected={changeSelected} changeFilter={changeFilter} paginate={paginate} option="Joined In" />
          <Dropdown filters={filters} selected={selected} changeSelected={changeSelected} changeFilter={changeFilter} paginate={paginate} option= "Transportation" />
          <Dropdown filters={filters} selected={selected} changeSelected={changeSelected} changeFilter={changeFilter} paginate={paginate} option="Storage" />
        </div>

        <Selected filters={filters} selected={selected} changeSelected={changeSelected} changeFilter={changeFilter} paginate={paginate}/>
      </div>
      <div className="data-table-container">
        <DataTable data={filtered.slice(indexOfFirstEntry, indexOfLastEntry)} />
        <Pagination currentPage={currentPage} totalEntries={filtered.length} entriesPerPage={entriesPerPage} paginate={paginate}></Pagination>
      </div>
      <div className="create-btn-container">
        <CreateAgencyBtn />
      </div>
    </div>
  )
}

export default AgencyTable;

