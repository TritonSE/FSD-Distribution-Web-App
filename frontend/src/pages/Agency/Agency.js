import React, { useState, useEffect } from 'react';
import CreateAgencyBtn from "../../components/CreateAgencyBtn/CreateAgencyBtn";
import DataTable from "../../components/AgencyTable/DataTable";
import axios from 'axios';

function AgencyTable() {
  const [data, setData] = useState([]);
  const [qFilter, setQFilter] = useState("");

  useEffect(() => {
    
    axios.get('http://localhost:8000/agency/').then((res) => setData(res.data.data));

  }, []);

  console.log(data);
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

