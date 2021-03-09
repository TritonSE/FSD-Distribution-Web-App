import React from 'react';
import './DataTable.css';
import { Link } from "react-router-dom";

function DataTable({ data }) {
  //console.log(data[0].tableContent);
  //const columns = data[0].tableContent && Object.keys(data[0].tableContent);
  return (
    <table cellPadding={0} cellSpacing={0} className="table">
      <thead>
        <tr>
        <th>Agency #</th> 
        <th>Agency Name</th>
        <th> Status</th>
        <th>Region</th>
        <th>City</th>
        <th>Main Phone #</th>
        <th>Staff</th>
        </tr>
      </thead>
       <tbody>
         { data.map(dat =>
          /*<Link className="agency-link" as={Link} to={{
            pathname: "/agency-profile",
            data: dat._id
          }}>*/
          <tr key={dat.tableContent._id}>
            <td>{dat.tableContent.agencyNumber}</td>
            <td>{dat.tableContent.name}</td>
            <td>{dat.tableContent.status}</td>
            <td>{dat.tableContent.region}</td>
            <td>{dat.tableContent.city}</td>
            <td>{dat.tableContent.phone}</td>
            <td>{dat.tableContent.staff}</td>
          </tr>
          //</Link>
          )}
      </tbody> 
    </table>
  );
}

export default DataTable;

