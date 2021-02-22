import React, { useState, useEffect } from 'react';
import CreateAgencyBtn from "../../components/CreateAgencyBtn/CreateAgencyBtn";
import Pagination from "../../components/AgencyTable/Pagination";
import DataTable from "../../components/AgencyTable/DataTable";

let fOptions = {
  search: '',
  status: '',
};

function AgencyTable() {
  const [data, setData] = useState([]);
  const [filters, setFilter] = useState(fOptions);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(2);

  useEffect(() => {
    fetch('http://localhost:8000/agency/', { method: 'GET' })
    .then(res => res.json())
    .then(data => setData(data.data))
    .catch(err => {
      console.log(err);
    });
  }, []);

  function search(rows) {
    return rows.filter(
      (row) => 
        (row.tableContent.name.toLowerCase().indexOf(filters.search) > -1 ||
        row.tableContent.agencyNumber.toString().toLowerCase().indexOf(filters.search) > -1) &&
        row.tableContent.status.toLowerCase().indexOf(filters.status) > -1
    );
};

const indexOfLastEntry = currentPage * entriesPerPage;
const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//const currentPosts = data.slice(indexOfFirstEntry, indexOfLastEntry);
const filtered = search(data);
const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="agency-table">
      <div className="search-container">
        <input type="text" value={filters.search} onChange={(e) => {setFilter({
          ...filters,
          search: e.target.value.toLowerCase(),
        }); paginate(1)}} />
      </div>
      <div id="filter">
        <select id="status" name="status" onChange={(e) => {setFilter({
          ...filters,
          status: e.target.value.toLowerCase(),
        }); paginate(1)}}>
          <option value="">None</option>
          <option value="Onboarding">Onboarding</option>
          <option value="Inactive">Inactive</option>
          <option value="Active">Active</option>
          <option value="On hold">On hold</option>
        </select>
      </div>
      <div className="data-table-container">
        <DataTable data={filtered.slice(indexOfFirstEntry, indexOfLastEntry)} />
        <Pagination currentPage = {currentPage} totalEntries = {filtered.length} entriesPerPage = {entriesPerPage} paginate={paginate}></Pagination>
      </div>
      <CreateAgencyBtn />
    </div>
  )
}

export default AgencyTable;

