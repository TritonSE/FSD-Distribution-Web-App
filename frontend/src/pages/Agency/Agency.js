import React, { useState, useEffect } from 'react';
import CreateAgencyBtn from "../../components/CreateAgencyBtn/CreateAgencyBtn";
import Pagination from "../../components/AgencyTable/Pagination";
import Dropdown from "../../components/AgencyTable/Dropdown";
import Selected from "../../components/AgencyTable/Selected";
import DataTable from "../../components/AgencyTable/DataTable";
import './Agency.css';
import { isAuthenticated } from "../../auth";
import { Redirect } from 'react-router-dom';

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

  "Storage":{
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
    fetch('http://localhost:8000/agency/', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      setData(data.data);
      //fill in dynamic filter options from database
      for(let dat of data.data){
        if(!(filters.Staff.hasOwnProperty(dat.tableContent.staff))){
          filters.Staff[dat.tableContent.staff] = false;
        }
        if(dat.tableContent.dateOfInitialPartnership){
        if(!(filters["Joined In"].hasOwnProperty(dat.tableContent.dateOfInitialPartnership.substring(6)))){
          let year = dat.tableContent.dateOfInitialPartnership.substring(6);
          filters["Joined In"][year] = false;
        }
      }
    }; setFilter({...filters})})
    .catch(err => {
      console.log(err);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * main filtering method
   */
  function search(rows) {
    return rows.filter(
      (row) => 
        checkOptions(row, filters)
    );
  };


/**
 * Perform search then call filter method to filter based on options
 */
function checkOptions(row, filters){
  for(let option in filters){
    //perform search
    if(option === "search") {
      let found = false;
      //search based on each word in the name
      let words = row.tableContent.name.toLowerCase().split(' ');
      let searched = filters.search.toLowerCase();
      for(let word of words){
        found = word.startsWith(searched);
        if(found){
          break;
        }
      }
      if(!(found || (row.tableContent.agencyNumber.toString().toLowerCase().startsWith(searched)))) {
        return false;
      }
      continue;
    }
    if( !(checkStatuses(row, filters, option)) ){
      return false;
    }
  }
  
  return true;
}

/**
 * filters based on dropdown options 
 */
function checkStatuses(row, filters, option){
  let falseCount = 0;
  let runCount = 0;
  for(var key in filters[option]){
    runCount++;
    if(filters[option][key] === true){
      if(option === "Storage"){
        //storage names are formatted differently in database
        let storageKey = key;
        storageKey = storageKey.charAt(0).toLowerCase() + storageKey.slice(1);
        //regex to replace remove spaces between strings
        storageKey = storageKey.replace(/ +/g, "");
        if(row.tableContent[storageKey] > 0){
          return true;
        }
        continue;
      }
      if(option === "Transportation"){
        let transportKey = key.toLowerCase();
        //pickup truck key is different in database
        if(key === "Pickup Truck"){
          transportKey = "pickUpTruck"
        }
        if(row.tableContent[transportKey] > 0){
          return true;
        }
        continue;
      }
      if(option === "Joined In"){
        if(!row.tableContent["dateOfInitialPartnership"]){
          return false;
        }
        if(row.tableContent["dateOfInitialPartnership"].substring(6).toLowerCase().indexOf(key.toLowerCase()) > -1){
          return true;
        }
        continue;
      }
      if(row.tableContent[option.toLowerCase()].toString().toLowerCase().indexOf(key.toLowerCase()) > -1){
        return true;
      }
    }
    else{
      falseCount++;
    }
  }
  
  //no filter options were set
  if(falseCount === runCount){
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

