import React, { useState, useEffect } from 'react';
import CreateAgencyBtn from "../../components/CreateAgencyBtn/CreateAgencyBtn";
import Pagination from "../../components/AgencyTable/Pagination";
import Dropdown from "../../components/AgencyTable/Dropdown";
import Selected from "../../components/AgencyTable/Selected";
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
  const [selected, setSelected] = useState({});

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
        checkOptions(row, filters)
        //row.tableContent.status.toLowerCase().indexOf(filters.status) > -1
    );
  };


/**
 * Page that contains a table that lists out all the agencies pulled from database
 */
function checkOptions(row, filters){
  console.log(filters);
  for(let option in filters){
    if(option == "search") {
      let found = false;
      let words = row.tableContent.name.toLowerCase().split(' ');
      for(let word of words){
        found = word.startsWith(filters.search)
        if(found){
          break;
        }
      }
      if(!( found || (row.tableContent.agencyNumber.toString().toLowerCase().startsWith(filters.search)) )) {
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
const changeSelected = (newSelected) => setSelected(newSelected);
console.log(selected);
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
          <Dropdown filters= {filters} selected = {selected} changeSelected = {changeSelected} changeFilter = {changeFilter} paginate={paginate} option = "region"  />
          <Dropdown filters= {filters} selected = {selected} changeSelected = {changeSelected} changeFilter = {changeFilter} paginate={paginate} option = "status" />
          <Dropdown filters= {filters} selected = {selected} changeSelected = {changeSelected} changeFilter = {changeFilter} paginate={paginate} option = "staff" />
          <Dropdown filters= {filters} selected = {selected} changeSelected = {changeSelected} changeFilter = {changeFilter} paginate={paginate} option = "Joined In" />
        </div>

        <Selected filters= {filters} selected = {selected} changeSelected = {changeSelected} changeFilter = {changeFilter} paginate={paginate}/>
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

