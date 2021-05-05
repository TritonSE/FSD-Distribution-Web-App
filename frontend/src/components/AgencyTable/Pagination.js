import React from "react";
import "./Pagination.css";

/**
 * Component for handling the different pages of the table. Has buttons for next and previous page
 * and for going to last and first page. Calls the paginate function to change the current page state
 * in the parent component (AgencyTable)
 * Expected props:
 * - {Number} currentPage: holds the current page, passed from AgencyTable component
 * - {Number} totalEntries: total number of agencies in the table
 * - {Number} entriesPerPage: number of entries in each table page, passed from parent component
 * - {Function} paginate: Function that changes the current page state, passed from parent.
 */
const Pagination = ({ currentPage, totalEntries, entriesPerPage, paginate }) => {
  const previousPageText = "<";
  const nextPageText = ">";
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  return (
    <div className="pagination">
      <button onClick={() => paginate(1)} disabled={currentPage <= 1}>
        <img src="../../../firstPage.png" alt="firstPage" />{" "}
      </button>
      <button onClick={() => paginate(--currentPage)} disabled={currentPage <= 1}>
        {" "}
        {previousPageText}{" "}
      </button>
      <p>{currentPage}</p>
      <button onClick={() => paginate(++currentPage)} disabled={currentPage >= totalPages}>
        {" "}
        {nextPageText}{" "}
      </button>
      <button onClick={() => paginate(totalPages)} disabled={currentPage >= totalPages}>
        {" "}
        <img src="../../../lastPage.png" alt="lastPage" />{" "}
      </button>
    </div>
  );
};

export default Pagination;
