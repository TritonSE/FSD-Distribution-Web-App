import React, { useState, useEffect } from 'react';
import DataTable from "./DataTable";

function AgencyTable() {
  const [data, setData] = useState([]);
  const [qFilter, setQFilter] = useState("");

  useEffect(() => {
    fetch("")
    .then((res) => res.json())
    .then((json) => setData(json));
  }, []);

  return (
    <div className="agency-table">
      <div id="filter"></div>
      <div className="data-table-container">
        <DataTable data={data} />
      </div>
    </div>
  )
}

export default AgencyTable;
