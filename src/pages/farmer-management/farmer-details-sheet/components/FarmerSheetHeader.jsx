import React from 'react';
import { CheckCircle2, MapPin, Sprout, Star } from 'lucide-react';
import './FarmerSheetHeader.css';

/**
 * FarmerSheetHeader Component
 * Profile header summary banner inside the Farmer Details Sheet
 */
const FarmerSheetHeader = ({ farmer }) => {
  if (!farmer) return null;

  return (
    <div className="farmer-sheet-profile-header">
      <div className="farmer-sheet-avatar-row">
        <div className="farmer-sheet-avatar-container">
          <img
            src={farmer.avatar}
            alt={farmer.name}
            className="farmer-sheet-avatar-img"
          />
          <span className="farmer-sheet-verified-badge" title="Verified Approved Farmer">
            <CheckCircle2 size={13} />
          </span>
        </div>

        <div className="farmer-sheet-profile-titles">
          <div className="farmer-sheet-name-row">
            <h3 className="farmer-sheet-name">{farmer.name}</h3>
            <span className="farmer-sheet-id-tag">ID: {farmer.id || farmer.farmId}</span>
          </div>

          <p className="farmer-sheet-farm-name">
            <Sprout size={13} /> {farmer.farmInfo?.farmName || farmer.farmName || 'Green Valley Organic Farms'}
          </p>

          <div className="farmer-sheet-location">
            <MapPin size={13} />
            <span>{farmer.location || 'Coimbatore, Tamil Nadu'}</span>
          </div>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="farmer-sheet-metrics-row">
        <div className="farmer-sheet-metric-item">
          <span className="farmer-sheet-metric-label">Land Size</span>
          <span className="farmer-sheet-metric-val">{farmer.farmInfo?.farmSize || farmer.landSize || '5.2 Acres'}</span>
        </div>

        <div className="farmer-sheet-metric-item">
          <span className="farmer-sheet-metric-label">Orders Settled</span>
          <span className="farmer-sheet-metric-val">{farmer.stats?.ordersFulfilled || 342}</span>
        </div>

        <div className="farmer-sheet-metric-item">
          <span className="farmer-sheet-metric-label">Rating</span>
          <span className="farmer-sheet-metric-val rating-val">
            <Star size={12} fill="#d97706" color="#d97706" /> {farmer.stats?.rating || 4.8}
          </span>
        </div>

        <div className="farmer-sheet-metric-item">
          <span className="farmer-sheet-metric-label">Status</span>
          <span className="farmer-sheet-metric-badge">
            <CheckCircle2 size={11} /> {farmer.status || 'Active'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FarmerSheetHeader;
