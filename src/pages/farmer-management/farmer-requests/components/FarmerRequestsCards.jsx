import React, { useEffect, useRef } from 'react';
import { Phone, MapPin, Sprout, Calendar, ChevronRight, Loader2, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../../../../components/ui/StatusBadge/StatusBadge';
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
 * Minimalist responsive stacked cards for mobile view with infinite scrolling
 */
const FarmerRequestsCards = ({
  requests = [],
  totalCount = 0,
  hasMore = false,
  isLoading = false,
  onLoadMore,
  onViewDetails
}) => {
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
        const isPending = farmer.status === 'Pending';

        return (
          <div
            key={farmer.id}
            className={`farmer-request-card farmer-card-${statusLower}`}
            onClick={() => onViewDetails && onViewDetails(farmer)}
            role="button"
            tabIndex={0}
          >
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
                  <Phone size={13} className="icon-slate" />
                  <span>{farmer.phone}</span>
                </div>

                <div className="info-detail-row">
                  <MapPin size={13} className="icon-slate" />
                  <span>{farmer.location}</span>
                </div>

                <div className="info-detail-row">
                  <Sprout size={13} className="icon-green" />
                  <span>{farmer.products}</span>
                </div>
              </div>

              {/* Right Column: Status Badge & Date Block */}
              <div className="card-right-info">
                <StatusBadge status={farmer.status} size="sm" />

                <div className="card-date-block">
                  <div className="date-row">
                    <Calendar size={12} className="icon-slate" />
                    <span>{datePart}</span>
                  </div>
                  {timePart && <span className="time-subtext">{timePart}</span>}
                </div>
              </div>
            </div>

            {/* Dashed Separator Line */}
            <div className="card-dashed-line"></div>

            {/* Bottom Minimalist Action Note Bar */}
            <div className="card-bottom-note-bar">
              <span
                className={`card-note-text ${
                  statusLower === 'pending'
                    ? 'note-pending'
                    : statusLower === 'rejected'
                    ? 'note-rejected'
                    : 'note-default'
                }`}
              >
                {isPending ? 'Tap to see and approve' : 'Click and view the details'}
              </span>
              <ChevronRight size={15} className="card-note-chevron" />
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

