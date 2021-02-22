import React, { useState, useEffect } from 'react';
import CreateAgencyBtn from "../../components/CreateAgencyBtn/CreateAgencyBtn";
import DataTable from "../../components/AgencyTable/DataTable";

let fOptions = {
  search: '',
  status: '',
};

function AgencyTable() {
  const [data, setData] = useState([]);
  const [filters, setFilter] = useState(fOptions);

  useEffect(() => {
    fetch('http://localhost:8000/agency/', { method: 'GET' })
    .then(res => res.json())
    .then(data => setData(data.data))
    .catch(err => {
      console.log(err);
    });
  }, []);

  function search(rows) {
    const cols = rows[0] && Object.keys(rows[0].tableContent);
    return rows.filter(
      (row) => 
        (row.tableContent.name.toLowerCase().indexOf(filters.search) > -1 ||
        row.tableContent.agencyNumber.toString().toLowerCase().indexOf(filters.search) > -1) &&
        row.tableContent.status.toLowerCase().indexOf(filters.status) > -1
    );
};

  return (
    <div className="agency-table">
      <div className="search-container">
        <input type="text" value={filters.search} onChange={(e) => setFilter({
          ...filters,
          search: e.target.value.toLowerCase(),
        })} />
      </div>
      <div id="filter">
        <select id="status" name="status" onChange={(e) => setFilter({
          ...filters,
          status: e.target.value.toLowerCase(),
        })}>
          <option value="">None</option>
          <option value="Onboarding">Onboarding</option>
          <option value="Inactive">Inactive</option>
          <option value="Active">Active</option>
          <option value="On hold">On hold</option>
        </select>
      </div>
      <div className="data-table-container">
        <DataTable data={search(data)} />
      </div>
      <CreateAgencyBtn />
    </div>
  )
}

export default AgencyTable;

