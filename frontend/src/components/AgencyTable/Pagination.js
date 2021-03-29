import React from 'react';
import './Pagination.css';

const Pagination = ({currentPage, totalEntries, entriesPerPage, paginate}) => {
  const previousPageText = '<';
  const nextPageText = '>';
  const totalPages = Math.ceil(totalEntries/entriesPerPage);

  return (
    <div className="pagination">
      <button onClick={() => paginate(1)} disabled={currentPage <= 1}><img src="firstPage.png" alt="firstPage"/> </button>
      <button onClick={() => paginate(--currentPage)} disabled={currentPage <= 1}> {previousPageText} </button>
      <p>{currentPage}</p>
      <button onClick={() => paginate(++currentPage)} disabled={currentPage >= totalPages}> {nextPageText} </button>
      <button onClick={() => paginate(totalPages)} disabled={currentPage >= totalPages}>  <img src="lastPage.png" alt="lastPage"/> </button>
    </div>
  )
}

export default Pagination;