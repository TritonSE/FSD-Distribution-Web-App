import React from "react";
import { useHistory } from "react-router-dom";
import "./DataTable.css";

/**
 * DataTable is a component for the table that displays on the page.
 * Each row of the table displays the number, name, etc. and, when clicked,
 * links to the agency's profile.
 * Expected props:
 * - {Object} data: A JSON object holding the table content for all agencies
 */
function DataTable({ data }) {
  let history = useHistory();

  /**
   * Redirects the page to the given agency id
   *
   * @param {*} agencyId is the ID of the given agency
   */
  let agencyClick = (agencyId) => {
    history.push(`/agency-profile/${agencyId}`);
  };

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
        {data.map((dat) => (
          <tr
            key={dat.tableContent.agencyNumber}
            onClick={() => {
              agencyClick(dat._id);
            }}
          >
            <td>{dat.tableContent.agencyNumber}</td>
            <td>{dat.tableContent.name}</td>
            <td>{dat.tableContent.status}</td>
            <td>{dat.tableContent.region}</td>
            <td>{dat.tableContent.city}</td>
            <td>{dat.tableContent.phone}</td>
            <td>{dat.tableContent.staff}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
