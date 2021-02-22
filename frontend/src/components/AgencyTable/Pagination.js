import React from 'react'

const Pagination = ({currentPage, totalEntries, entriesPerPage, paginate}) => {
    const previousPageText = '<';
    const nextPageText = '>';
    // for(let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); ++i){
    //     pageNumbers.push(i);
    // }
    const totalPages = Math.ceil(totalEntries/entriesPerPage);
    return (
        <div>
            <button onClick = {() => paginate(--currentPage)} disabled = {currentPage <= 1}> {previousPageText} </button>
            <p>{currentPage}</p>
            <button onClick = {() => paginate(++currentPage)} disabled = {currentPage >= totalPages}> {nextPageText} </button>
        </div>
    )
}

export default Pagination