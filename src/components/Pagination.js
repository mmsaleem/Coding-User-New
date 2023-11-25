import React from "react";
import ReactPaginate from "react-paginate";
import "./Paginate.css"


function Pagination ({ page, onPageChange }) {

    function handlePrevClick () {
        onPageChange(page - 1);
    };

    function handleNextClick () {
        onPageChange(page + 1);
    };

    return (
        <div className="pagination">
            <button onClick={ handlePrevClick } disabled={ page === 1 }>
                Prev
            </button>
            <span className="page-num">{ `Page ${page}` }</span>
            <button onClick={ handleNextClick } >
                Next
            </button>
        </div>
    );
};

export default Pagination;