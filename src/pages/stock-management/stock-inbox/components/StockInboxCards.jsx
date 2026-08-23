import React, { useState, useRef, useEffect } from 'react';
import { MapPin, MoreVertical, Eye, CheckCircle, XCircle } from 'lucide-react';
import StatusBadge from '../../../../components/ui/StatusBadge/StatusBadge';
import './StockInboxCards.css';

/**
 * StockInboxCards Component
 * Renders stacked cards layout for Mobile screens matching Image 2 design
 */
const StockInboxCards = ({
  requests = [],
  totalCount = 0,
  hasMore = false,
  isLoading = false,
  onLoadMore,
  onViewDetails,
  onApprove,
  onReject
}) => {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  if (requests.length === 0) {
    return (
      <div className="stock-card-mobile-empty">
        <p className="empty-title">No stock requests found</p>
        <p className="empty-subtitle">Try adjusting your search query or filter options.</p>
      </div>
    );
  }

  return (
    <div className="stock-cards-mobile-list">
      {requests.map((item) => (
        <div
          key={item.id}
          className="stock-mobile-card"
          onClick={() => onViewDetails && onViewDetails(item)}
        >
          {/* Top Header: Farmer info + Request ID & Status Badge */}
          <div className="stock-mobile-card-header">
            <div className="farmer-profile-row">
              <img
                src={item.avatar}
                alt={item.farmerName}
                className="stock-mobile-avatar"
              />
              <div className="farmer-meta">
                <span className="farmer-name">{item.farmerName}</span>
                <div className="farmer-location-row">
                  <MapPin size={11} className="location-pin-icon" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            <div className="header-actions-right">
              <span className="stock-req-id-pill">{item.requestId}</span>
              <StatusBadge status={item.status} showDot={false} size="sm" />
              <div
                className="mobile-dropdown-wrapper"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="mobile-menu-btn"
                  onClick={(e) => toggleMenu(item.id, e)}
                  aria-label="Options"
                >
                  <MoreVertical size={16} />
                </button>

                {activeMenuId === item.id && (
                  <div className="mobile-actions-dropdown" ref={menuRef}>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(null);
                        onViewDetails && onViewDetails(item);
                      }}
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>

                    {item.status !== 'Approved' && (
                      <button
                        type="button"
                        className="dropdown-item approve-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(null);
                          onApprove && onApprove(item);
                        }}
                      >
                        <CheckCircle size={14} />
                        <span>Approve</span>
                      </button>
                    )}

                    {item.status !== 'Rejected' && (
                      <button
                        type="button"
                        className="dropdown-item reject-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(null);
                          onReject && onReject(item);
                        }}
                      >
                        <XCircle size={14} />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Middle Inner Product Box */}
          <div className="stock-mobile-product-box">
            <img
              src={item.productImage}
              alt={item.productName}
              className="product-mobile-img"
            />
            <div className="product-mobile-meta">
              <span className="product-title">{item.productName}</span>
              <div className="product-sub-tags">
                <span className="product-cat-tag">{item.category}</span>
                <span className="product-qty-tag">{item.quantity}</span>
              </div>
            </div>

            <div className="product-mobile-price">
              <span className="price-amount">₹{item.pricePerKg}</span>
              <span className="price-unit">/ kg</span>
            </div>
          </div>

          {/* Bottom Card Footer: Date info line */}
          <div className="stock-mobile-card-footer">
            <span className="requested-date-txt">Requested {item.requestedDate}, {item.requestedTime}</span>
          </div>
        </div>
      ))}

      {/* Infinite Scroll / Load More Footer */}
      {hasMore && (
        <div className="mobile-load-more-wrapper">
          <button
            type="button"
            className="mobile-load-more-btn"
            onClick={onLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Loading more...' : `Load More (${totalCount - requests.length} remaining)`}
          </button>
        </div>
      )}
    </div>
  );
};

export default StockInboxCards;
