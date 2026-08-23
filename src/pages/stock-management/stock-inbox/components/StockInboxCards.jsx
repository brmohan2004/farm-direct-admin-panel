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
        <div key={item.id} className="stock-mobile-card">
          {/* Card Header: Farmer details + Status badge + Menu */}
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
                  <MapPin size={13} className="location-pin-icon" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            <div className="header-actions-right">
              <StatusBadge status={item.status} showDot={false} size="sm" />
              <div className="mobile-dropdown-wrapper">
                <button
                  type="button"
                  className="mobile-menu-btn"
                  onClick={(e) => toggleMenu(item.id, e)}
                  aria-label="Options"
                >
                  <MoreVertical size={18} />
                </button>

                {activeMenuId === item.id && (
                  <div className="mobile-actions-dropdown" ref={menuRef}>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setActiveMenuId(null);
                        onViewDetails && onViewDetails(item);
                      }}
                    >
                      <Eye size={15} />
                      <span>View Details</span>
                    </button>

                    {item.status !== 'Approved' && (
                      <button
                        type="button"
                        className="dropdown-item approve-item"
                        onClick={() => {
                          setActiveMenuId(null);
                          onApprove && onApprove(item);
                        }}
                      >
                        <CheckCircle size={15} />
                        <span>Approve</span>
                      </button>
                    )}

                    {item.status !== 'Rejected' && (
                      <button
                        type="button"
                        className="dropdown-item reject-item"
                        onClick={() => {
                          setActiveMenuId(null);
                          onReject && onReject(item);
                        }}
                      >
                        <XCircle size={15} />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sub Header Date / Time */}
          <div className="stock-mobile-date-sub">
            <span>{item.requestedDate} {item.requestedTime}</span>
          </div>

          {/* Middle Product Container */}
          <div className="stock-mobile-product-box">
            <img
              src={item.productImage}
              alt={item.productName}
              className="product-mobile-img"
            />
            <div className="product-mobile-meta">
              <span className="product-title">{item.productName}</span>
              <span className="product-cat">Category: <strong>{item.category}</strong></span>
              <span className="product-qty">Quantity: <strong>{item.quantity}</strong></span>
            </div>

            <div className="product-mobile-price">
              <span className="price-label">Price</span>
              <span className="price-amount">₹{item.pricePerKg} <small>/ kg</small></span>
            </div>
          </div>

          {/* Card Footer: Request ID + Requested On + View Details button */}
          <div className="stock-mobile-card-footer">
            <div className="footer-info-col">
              <div className="request-id-row">
                <span className="info-label">Request ID</span>
                <span className="info-val-green">{item.requestId}</span>
              </div>
              <div className="requested-on-row">
                <span className="info-label">Requested On</span>
                <span className="info-val">{item.requestedDate}, {item.requestedTime}</span>
              </div>
            </div>

            <div className="footer-action-col">
              <button
                type="button"
                className="mobile-view-details-btn"
                onClick={() => onViewDetails && onViewDetails(item)}
              >
                View Details
              </button>
            </div>
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
