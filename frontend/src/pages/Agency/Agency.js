import React, { useState, useEffect } from 'react';
import CreateAgencyBtn from "../../components/CreateAgencyBtn/CreateAgencyBtn";
import Pagination from "../../components/AgencyTable/Pagination";
import Dropdown from "../../components/AgencyTable/Dropdown";
import DataTable from "../../components/AgencyTable/DataTable";
import './Agency.css';
import { isAuthenticated } from "../../auth";
import { Redirect } from 'react-router-dom';


let fOptions = {
  search: '',
  status: {
    Onboarding: false,
    Active: false,
    Inactive: false,
    "On hold": false,
  },

  region: {
    S: false,
    NI: false,
    E: false,
    C: false,
    NC: false,
  },

  staff: {},

  "Joined In": {},

};


function AgencyTable() {
  const [data, setData] = useState([]);
  const [filters, setFilter] = useState(fOptions);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(2);
  const [selected, setSelected] = useState([]);

  //const[checkboxes, setCheckboxes] = useState();

  useEffect(() => {
    fetch('http://localhost:8000/agency/', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      setData(data.data);
      for(let dat of data.data){
        if(!(filters.staff.hasOwnProperty(dat.tableContent.staff))){
          filters.staff[dat.tableContent.staff] = false;
        }
    }; setFilter({...filters})})
    .catch(err => {
      console.log(err);
    });



    // setCheckboxes(document.getElementById("checkboxes"));
    // console.log(checkboxes);
  }, []);

  function search(rows) {
    return rows.filter(
      (row) => 
        (row.tableContent.name.toLowerCase().indexOf(filters.search) > -1 ||
        row.tableContent.agencyNumber.toString().toLowerCase().indexOf(filters.search) > -1) &&
        checkOptions(row, filters)
        //row.tableContent.status.toLowerCase().indexOf(filters.status) > -1
    );
  };


/**
 * Page that contains a table that lists out all the agencies pulled from database
 */
function checkOptions(row, filters){
  for(let option in filters){
    if(option == "search") {
      continue;
    }
    if( !(checkStatuses(row, filters, option)) ){
      return false;
    }
  }
  return true;
}
function checkStatuses(row, filters, option){
  let falseCount = 0;
  let runCount = 0;
  for(var key in filters[option]){
    runCount++;
    if(filters[option][key]){
      if(row.tableContent[option].toLowerCase().indexOf(key.toLowerCase()) > -1){
        return true;
      }
    }
    else{
      falseCount++;
    }
  }
  if(falseCount == runCount){
    return true;
  }
  return false;
}


const indexOfLastEntry = currentPage * entriesPerPage;
const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//const currentPosts = data.slice(indexOfFirstEntry, indexOfLastEntry);
const filtered = search(data);
const paginate = (pageNumber) => setCurrentPage(pageNumber);
const changeFilter = (newFilter) => setFilter(newFilter);
if (!isAuthenticated()) {
  return <Redirect to='login' />
}

  return (
    <div className="agency-table">
      <div className="search-container">
      <label htmlFor="search" id="searchLabel">Search:</label>
        <input id="search" type="text" value={filters.search} onChange={(e) => {setFilter({
          ...filters,
          search: e.target.value.toLowerCase(),
        }); paginate(1)}} />
      </div>
      <div className="filter-container">
        <h2>Sort By:</h2>
        <div className="selects-container">
          <Dropdown filters= {filters} changeFilter = {changeFilter} paginate={paginate} option = "region" expanded = {false} />
          <Dropdown filters= {filters} changeFilter = {changeFilter} paginate={paginate} option = "status" expanded ={false}/>
          <Dropdown filters= {filters} changeFilter = {changeFilter} paginate={paginate} option = "staff" expanded={false}/>
          <Dropdown filters= {filters} changeFilter = {changeFilter} paginate={paginate} option = "Joined In" expanded={false}/>
          {/* <select name="storage">
            <option value="">Storage</option>
          </select>
          <select name="transportation">
            <option value="">Transportation</option>
          </select> */}
        </div>
        <button id="clearall">Clear All</button>
      </div>
      <div className="data-table-container">
        <DataTable data={filtered.slice(indexOfFirstEntry, indexOfLastEntry)} />
        <Pagination currentPage = {currentPage} totalEntries = {filtered.length} entriesPerPage = {entriesPerPage} paginate={paginate}></Pagination>
      </div>
      <div className="create-btn-container">
        <CreateAgencyBtn />
      </div>
    </div>
  )
}

export default AgencyTable;

