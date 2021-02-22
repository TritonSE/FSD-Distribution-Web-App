import React from 'react';
import './Pagination.css';

const Pagination = ({currentPage, totalEntries, entriesPerPage, paginate}) => {
  const previousPageText = '<';
  const nextPageText = '>';
  // for(let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); ++i){
  //     pageNumbers.push(i);
  // }
  const totalPages = Math.ceil(totalEntries/entriesPerPage);
  return (
    <div className="pagination">
      <button onClick = {() => paginate(--currentPage)} disabled = {currentPage <= 1}> {previousPageText} </button>
      <p>{currentPage}</p>
      <button onClick = {() => paginate(++currentPage)} disabled = {currentPage >= totalPages}> {nextPageText} </button>
    </div>
  )
}

export default Pagination