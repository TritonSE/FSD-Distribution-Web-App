import React from 'react';
import './Pagination.css';

const Pagination = ({currentPage, totalEntries, entriesPerPage, paginate}) => {
  const previousPageText = '<';
  const nextPageText = '>';
  const firstPageText = '|<';
  const lastPageText = '>|'
  // for(let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); ++i){
  //     pageNumbers.push(i);
  // }
  const totalPages = Math.ceil(totalEntries/entriesPerPage);
  return (
    <div className="pagination-container">
      <div className="pagination">
        <button onClick={() => paginate(1)} disabled={currentPage <= 1}><img src ="firstPage.png" alt="firstPage"/> </button>
        <button onClick={() => paginate(--currentPage)} disabled={currentPage <= 1}> {previousPageText} </button>
        <p>{currentPage}</p>
        <button onClick={() => paginate(++currentPage)} disabled={currentPage >= totalPages}> {nextPageText} </button>
        <button onClick={() => paginate(totalPages)} disabled={currentPage >= totalPages}>  <img src ="lastPage.png" alt="lastPage"/> </button>
      </div>
    </div>
  )
}

export default Pagination