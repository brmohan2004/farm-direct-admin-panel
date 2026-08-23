import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

/**
 * Pagination Component
 * Global pagination bar matching the design in screenshots
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 5,
  totalItems = 48,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing <span className="pagination-info-bold">{startItem}</span> to{' '}
        <span className="pagination-info-bold">{endItem}</span> of{' '}
        <span className="pagination-info-bold">{totalItems}</span> requests
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-btn pagination-nav-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="pagination-numbers">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`pagination-btn pagination-num-btn ${
                page === currentPage ? 'active' : ''
              }`}
              onClick={() => onPageChange && onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="pagination-btn pagination-nav-btn"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="pagination-per-page">
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange && onItemsPerPageChange(Number(e.target.value))}
          className="pagination-select"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
