import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Sprout,
  Calendar,
  MoreVertical,
  Check,
  XCircle,
  Eye,
  ExternalLink
} from 'lucide-react';
import StatusBadge from '../../../../components/ui/StatusBadge/StatusBadge';
import './FarmerRequestsTable.css';

/**
 * FarmerRequestsTable Component
 * Renders data table view for Desktop and Tablet screens
 */
const FarmerRequestsTable = ({
  requests = [],
  onViewDetails,
  onApprove,
  onReject
}) => {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

  // Close popup menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  if (!requests || requests.length === 0) {
    return (
      <div className="farmer-table-empty">
        <Sprout size={36} className="empty-icon" />
        <p className="empty-title">No farmer requests found</p>
        <p className="empty-subtitle">Try adjusting your filter criteria or search query.</p>
      </div>
    );
  }

  return (
    <div className="farmer-table-card">
      <div className="table-responsive-wrapper">
        <table className="farmer-requests-table">
          <thead>
            <tr>
              <th>Farmer</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Products</th>
              <th>Requested On</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((farmer) => (
              <tr key={farmer.id} className="farmer-table-row">
                {/* Farmer Column */}
                <td>
                  <div className="farmer-profile-cell">
                    <div className="farmer-avatar-box">
                      {farmer.avatar ? (
                        <img
                          src={farmer.avatar}
                          alt={farmer.name}
                          className="farmer-avatar-img"
                        />
                      ) : (
                        <div className="farmer-avatar-fallback">
                          {farmer.initials || farmer.name?.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="farmer-name-meta">
                      <span className="farmer-name-text">{farmer.name}</span>
                      <span className="farmer-id-text">Farm ID: {farmer.farmId}</span>
                    </div>
                  </div>
                </td>

                {/* Contact Column */}
                <td>
                  <div className="farmer-contact-cell">
                    <div className="contact-item">
                      <Phone size={13} className="cell-icon" />
                      <span>{farmer.phone}</span>
                    </div>
                    <div className="contact-item subtext">
                      <Mail size={13} className="cell-icon" />
                      <span>{farmer.email}</span>
                    </div>
                  </div>
                </td>

                {/* Location Column */}
                <td>
                  <div className="farmer-location-cell">
                    <MapPin size={14} className="cell-icon text-muted" />
                    <span>{farmer.location}</span>
                  </div>
                </td>

                {/* Products Column */}
                <td>
                  <div className="farmer-products-cell">
                    <Sprout size={14} className="cell-icon text-green" />
                    <span>{farmer.products}</span>
                  </div>
                </td>

                {/* Requested On Column */}
                <td>
                  <div className="farmer-date-cell">
                    <Calendar size={14} className="cell-icon text-muted" />
                    <span>{farmer.date}</span>
                  </div>
                </td>

                {/* Status Column */}
                <td>
                  <StatusBadge status={farmer.status} size="sm" />
                </td>

                {/* Actions Column */}
                <td className="text-right">
                  <div className="table-actions-cell" ref={activeMenuId === farmer.id ? menuRef : null}>
                    <button
                      type="button"
                      className="btn-view-details"
                      onClick={() => onViewDetails(farmer)}
                    >
                      View Details
                    </button>

                    <div className="menu-popover-container">
                      <button
                        type="button"
                        className="btn-icon-more"
                        onClick={(e) => toggleMenu(farmer.id, e)}
                        aria-label="More options"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {activeMenuId === farmer.id && (
                        <div className="table-action-menu">
                          <button
                            type="button"
                            className="action-menu-item"
                            onClick={() => {
                              setActiveMenuId(null);
                              onViewDetails(farmer);
                            }}
                          >
                            <Eye size={14} />
                            <span>View Profile & Documents</span>
                          </button>

                          {farmer.status === 'Pending' && (
                            <>
                              <button
                                type="button"
                                className="action-menu-item approve"
                                onClick={() => {
                                  setActiveMenuId(null);
                                  onApprove(farmer);
                                }}
                              >
                                <Check size={14} />
                                <span>Approve Registration</span>
                              </button>
                              <button
                                type="button"
                                className="action-menu-item reject"
                                onClick={() => {
                                  setActiveMenuId(null);
                                  onReject(farmer);
                                }}
                              >
                                <XCircle size={14} />
                                <span>Reject Request</span>
                              </button>
                            </>
                          )}

                          <a
                            href={`tel:${farmer.phone}`}
                            className="action-menu-item"
                            onClick={() => setActiveMenuId(null)}
                          >
                            <Phone size={14} />
                            <span>Call {farmer.name.split(' ')[0]}</span>
                          </a>
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

export default FarmerRequestsTable;
