import React, { useState, useEffect } from 'react';
import CreateAgencyBtn from "../../components/CreateAgencyBtn/CreateAgencyBtn";
import DataTable from "../../components/AgencyTable/DataTable";
import axios from 'axios';

function AgencyTable() {
  const [data, setData] = useState([]);
  const [qFilter, setQFilter] = useState("");

  useEffect(() => {
    
    fetch('http://localhost:8000/agency/', { method: 'GET' })
    .then(res => res.json())
    .then(data => setData(data.data))
    .catch(err => {
      console.log(err);
    });

  }, []);

  return (
    <div className="agency-table">
      <div id="filter"></div>
      <div className="data-table-container">
        <DataTable data={data} />
      </div>
      <CreateAgencyBtn />
    </div>
  )
}

export default AgencyTable;

