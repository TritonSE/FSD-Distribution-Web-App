import React, { useState, useEffect } from 'react';
import CreateAgencyBtn from "../../components/CreateAgencyBtn/CreateAgencyBtn";
import Pagination from "../../components/AgencyTable/Pagination";
import DataTable from "../../components/AgencyTable/DataTable";
import './Agency.css';

let fOptions = {
  search: '',
  status: '',
};

function AgencyTable() {
  const [data, setData] = useState([]);
  const [filters, setFilter] = useState(fOptions);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(2);
  //const[checkboxes, setCheckboxes] = useState();

  useEffect(() => {
    fetch('http://localhost:8000/agency/', { method: 'GET' })
    .then(res => res.json())
    .then(data => setData(data.data))
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
        filters.status.forEach(stat => {
          if(row.tableContent.status.toLowerCase().indexOf(stat) > -1){
            return true;
          }
        })
    );
};

var expanded = false;
function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  console.log(checkboxes);
  if(!expanded){
    checkboxes.style.display = "block";
    expanded = true;
  }
  else{
    checkboxes.style.display = "none";
    expanded = false;
  }
}

const indexOfLastEntry = currentPage * entriesPerPage;
const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//const currentPosts = data.slice(indexOfFirstEntry, indexOfLastEntry);
const filtered = search(data);
const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
          <select name="region">
            <option value="">Region</option>
          </select>

          <form>
            <div className = "multiselect">
              <div className = "selectBox" onClick = {showCheckboxes}>
                <select>
                  <option>Status</option>
                </select>
              </div>
              <div className ="overSelect"></div>
            </div>
            <div id="checkboxes">
              <label htmlFor="Onboarding">
                <input type="checkbox" id="onboard" onChange={(e) => {setFilter({...filters, status: e.target.value.toLowerCase(),}); paginate(1)}}/>Onboarding</label>
              <label htmlFor="inactive">
                <input type="checkbox" id="onhold" onChange={(e) => {setFilter({...filters, status: e.target.value.toLowerCase(),}); paginate(1)}}/>On Hold
              </label>
            </div>
          </form>

          <select name="staff">
            <option value="">Staff</option>
          </select>
          <select name="joined">
            <option value="">Joined In</option>
          </select>
          <select name="storage">
            <option value="">Storage</option>
          </select>
          <select name="transportation">
            <option value="">Transportation</option>
          </select>
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

