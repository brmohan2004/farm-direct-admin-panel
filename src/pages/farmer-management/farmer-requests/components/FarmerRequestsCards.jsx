import React, { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Sprout, Calendar, MoreVertical, Check, Eye, Loader2, CheckCircle2 } from 'lucide-react';
import './FarmerRequestsCards.css';

/**
 * Helper to split "12 May 2024 09:15 AM" into date and time strings
 */
const parseDateTime = (fullDateStr = '') => {
  if (!fullDateStr) return { date: '', time: '' };
  const parts = fullDateStr.split(' ');
  if (parts.length >= 4) {
    return {
      date: `${parts[0]} ${parts[1]} ${parts[2]}`,
      time: `${parts[3]} ${parts[4] || ''}`.trim()
    };
  }
  return { date: fullDateStr, time: '' };
};

/**
 * FarmerRequestsCards Component
 * Renders stacked card view tailored specifically for Mobile screens with infinite scrolling
 * Matching exact reference image design layout
 */
const FarmerRequestsCards = ({
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
  const sentinelRef = useRef(null);

  // Setup IntersectionObserver for Infinite Scrolling on Mobile
  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore && onLoadMore();
        }
      },
      { root: null, rootMargin: '150px', threshold: 0.1 }
    );

    const currentTarget = sentinelRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, onLoadMore]);

  if (!requests || requests.length === 0) {
    return (
      <div className="farmer-cards-empty">
        <Sprout size={32} className="empty-icon" />
        <p className="empty-title">No farmer requests found</p>
        <p className="empty-subtitle">Try adjusting your filter or search query.</p>
      </div>
    );
  }

  return (
    <div className="farmer-cards-list">
      {requests.map((farmer) => {
        const { date: datePart, time: timePart } = parseDateTime(farmer.date);
        const statusLower = (farmer.status || '').toLowerCase();

        return (
          <div key={farmer.id} className="farmer-request-card">
            {/* Top Info Section */}
            <div className="card-top-content">
              {/* Green Ring Avatar Container */}
              <div className="card-avatar-ring">
                {farmer.avatar ? (
                  <img
                    src={farmer.avatar}
                    alt={farmer.name}
                    className="card-avatar-img"
                  />
                ) : (
                  <div className="card-avatar-fallback">
                    {farmer.initials || farmer.name?.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Middle Info Column */}
              <div className="card-main-info">
                <h3 className="card-farmer-name">{farmer.name}</h3>

                <div className="info-detail-row">
                  <Phone size={14} className="icon-slate" />
                  <span>{farmer.phone}</span>
                </div>

                <div className="info-detail-row">
                  <MapPin size={14} className="icon-slate" />
                  <span>{farmer.location}</span>
                </div>

                <div className="info-detail-row">
                  <Sprout size={14} className="icon-green" />
                  <span>{farmer.products}</span>
                </div>
              </div>

              {/* Right Column: Status Badge, Options Button & Date Block */}
              <div className="card-right-info">
                <div className="card-header-actions">
                  <span className={`status-pill status-pill--${statusLower}`}>
                    {farmer.status}
                  </span>
                  <button
                    type="button"
                    className="card-more-btn"
                    onClick={() => setActiveMenuId(activeMenuId === farmer.id ? null : farmer.id)}
                    aria-label="Options"
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>

                <div className="card-date-block">
                  <div className="date-row">
                    <Calendar size={13} className="icon-slate" />
                    <span>{datePart}</span>
                  </div>
                  {timePart && <span className="time-subtext">{timePart}</span>}
                </div>
              </div>
            </div>

            {/* Popover Action Menu */}
            {activeMenuId === farmer.id && (
              <div className="card-dropdown-menu">
                <button
                  type="button"
                  className="card-dropdown-item"
                  onClick={() => {
                    setActiveMenuId(null);
                    onViewDetails(farmer);
                  }}
                >
                  <Eye size={14} /> View Details & Documents
                </button>
                {farmer.status === 'Pending' && (
                  <button
                    type="button"
                    className="card-dropdown-item text-green"
                    onClick={() => {
                      setActiveMenuId(null);
                      onApprove(farmer);
                    }}
                  >
                    <Check size={14} /> Quick Approve
                  </button>
                )}
              </div>
            )}

            {/* Dashed Separator Line */}
            <div className="card-dashed-line"></div>

            {/* Bottom Action Buttons */}
            <div className="card-bottom-actions">
              <button
                type="button"
                className="btn-card-outline"
                onClick={() => onViewDetails(farmer)}
              >
                View Details
              </button>

              {farmer.status === 'Pending' ? (
                <button
                  type="button"
                  className="btn-card-solid"
                  onClick={() => onApprove(farmer)}
                >
                  Approve
                </button>
              ) : farmer.status === 'Approved' ? (
                <button
                  type="button"
                  className="btn-card-outline"
                  onClick={() => onViewDetails(farmer)}
                >
                  View Farmer
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-card-outline"
                  onClick={() => onViewDetails(farmer)}
                >
                  Re-evaluate
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* Infinite Scroll Sentinel */}
      <div ref={sentinelRef} className="infinite-scroll-sentinel">
        {isLoading && (
          <div className="infinite-scroll-loader">
            <Loader2 size={18} className="spinner-icon" />
            <span>Loading more farmer requests...</span>
          </div>
        )}

        {!hasMore && requests.length > 0 && (
          <div className="infinite-scroll-end">
            <CheckCircle2 size={15} className="end-icon" />
            <span>All {requests.length} farmer requests loaded</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerRequestsCards;
