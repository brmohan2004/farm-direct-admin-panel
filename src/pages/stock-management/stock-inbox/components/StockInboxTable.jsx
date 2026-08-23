import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, CheckCircle, XCircle } from 'lucide-react';
import StatusBadge from '../../../../components/ui/StatusBadge/StatusBadge';
import './StockInboxTable.css';

/**
 * StockInboxTable Component
 * Table display for Desktop & Tablet view matching Image 1 design
 */
const StockInboxTable = ({
  requests = [],
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
      <div className="stock-table-card empty-state">
        <p className="empty-title">No stock requests found</p>
        <p className="empty-subtitle">Try adjusting your search query or filter options.</p>
      </div>
    );
  }

  return (
    <div className="stock-table-card">
      <div className="stock-table-responsive-wrapper">
        <table className="stock-inbox-table">
          <thead>
            <tr>
              <th className="col-farmer">Farmer</th>
              <th className="col-product">Product Details</th>
              <th className="col-quantity">Quantity</th>
              <th className="col-price">Price (per kg)</th>
              <th className="col-request-id">Request ID</th>
              <th className="col-date">Requested On</th>
              <th className="col-status">Status</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item) => (
              <tr key={item.id} className="stock-table-row">
                {/* Farmer Info */}
                <td className="col-farmer">
                  <div className="farmer-info-cell">
                    <img
                      src={item.avatar}
                      alt={item.farmerName}
                      className="farmer-avatar-img"
                    />
                    <div className="farmer-text">
                      <span className="farmer-name">{item.farmerName}</span>
                      <span className="farmer-location">{item.location}</span>
                    </div>
                  </div>
                </td>

                {/* Product Details */}
                <td className="col-product">
                  <div className="product-info-cell">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="product-thumbnail-img"
                    />
                    <div className="product-text">
                      <span className="product-name">{item.productName}</span>
                      <span className="product-category">Category: {item.category}</span>
                    </div>
                  </div>
                </td>

                {/* Quantity */}
                <td className="col-quantity">
                  <span className="quantity-val">{item.quantity}</span>
                </td>

                {/* Price */}
                <td className="col-price">
                  <span className="price-val">₹{item.pricePerKg}</span>
                </td>

                {/* Request ID */}
                <td className="col-request-id">
                  <span className="request-id-badge">{item.requestId}</span>
                </td>

                {/* Requested On */}
                <td className="col-date">
                  <div className="date-cell">
                    <span className="date-main">{item.requestedDate}</span>
                    <span className="date-sub">{item.requestedTime}</span>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="col-status">
                  <StatusBadge status={item.status} showDot={false} size="md" />
                </td>

                {/* Actions */}
                <td className="col-actions">
                  <div className="actions-cell">
                    <button
                      type="button"
                      className="view-details-btn"
                      onClick={() => onViewDetails && onViewDetails(item)}
                    >
                      View Details
                    </button>

                    <div className="dropdown-menu-wrapper">
                      <button
                        type="button"
                        className="menu-trigger-btn"
                        onClick={(e) => toggleMenu(item.id, e)}
                        aria-label="More Options"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {activeMenuId === item.id && (
                        <div className="actions-dropdown-menu" ref={menuRef}>
                          <button
                            type="button"
                            className="dropdown-item"
                            onClick={() => {
                              setActiveMenuId(null);
                              onViewDetails && onViewDetails(item);
                            }}
                          >
                            <Eye size={15} />
                            <span>View Full Details</span>
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
                              <span>Approve Request</span>
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
                              <span>Reject Request</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockInboxTable;
