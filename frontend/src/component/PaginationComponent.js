import "./pagination.css";
import React from "react";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {/* Previous Button */}
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
      )}

      {/* Page Buttons */}
      {pages.map((page) => (
        <button
          key={page}
          className={currentPage === page ? "active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

export default PaginationComponent;
