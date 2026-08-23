import React from 'react';
import { Phone, Mail, MapPin, CheckCircle, Package, ShoppingBag, ShoppingCart, Star } from 'lucide-react';
import defaultAvatar from '../../../../assets/farmer.png';
import './FarmerProfileSummary.css';

/**
 * FarmerProfileSummary Component
 * Renders top farmer profile card containing avatar, identity info, farm ID, member status, and stat metrics boxes.
 */
const FarmerProfileSummary = ({ farmer }) => {
  const profile = farmer || {
    name: 'Ramesh Kumar',
    isVerified: true,
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@email.com',
    location: 'Coimbatore, Tamil Nadu, India',
    farmId: 'FD12345',
    memberSince: '12 May 2024',
    status: 'Active',
    avatar: defaultAvatar,
    stats: {
      products: 24,
      stockRequests: 156,
      ordersFulfilled: 342,
      rating: 4.8,
      reviewCount: 128
    }
  };

  return (
    <div className="farmer-profile-summary-card">
      {/* Left Info Section: Avatar & Primary Identity */}
      <div className="summary-identity-section">
        <div className="avatar-container">
          <div className="avatar-ring">
            <img
              src={profile.avatar || defaultAvatar}
              alt={profile.name}
              className="farmer-avatar-img"
            />
          </div>
          {profile.isVerified && (
            <div className="badge-verified-pill mobile-badge">
              <CheckCircle size={12} className="check-icon" />
              <span>Verified</span>
            </div>
          )}
        </div>

        <div className="identity-details">
          <div className="name-verified-row">
            <h2 className="farmer-name">{profile.name}</h2>
            {profile.isVerified && (
              <div className="badge-verified-pill desktop-badge">
                <CheckCircle size={13} className="check-icon" />
                <span>Verified</span>
              </div>
            )}
          </div>

          <div className="identity-contact-list">
            <div className="contact-item">
              <Phone size={14} className="meta-icon" />
              <span>{profile.phone}</span>
            </div>
            <div className="contact-item">
              <Mail size={14} className="meta-icon" />
              <span>{profile.email}</span>
            </div>
            <div className="contact-item">
              <MapPin size={14} className="meta-icon" />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Farm Metadata */}
      <div className="summary-metadata-section">
        <div className="meta-field">
          <span className="meta-label">Farm ID</span>
          <span className="farm-id-pill">{profile.farmId}</span>
        </div>

        <div className="meta-field">
          <span className="meta-label">Member Since</span>
          <span className="meta-value">{profile.memberSince}</span>
        </div>

        {profile.status && (
          <div className="meta-field">
            <span className="meta-label">Status</span>
            <span className="status-active-pill">{profile.status}</span>
          </div>
        )}
      </div>

      {/* Right Section: Key Performance Stat Boxes */}
      <div className="summary-stats-section">
        {/* Stat Box 1: Products */}
        <div className="stat-metric-card stat-green">
          <div className="stat-icon-wrapper">
            <Package size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{profile.stats.products}</span>
            <span className="stat-label">Products</span>
          </div>
        </div>

        {/* Stat Box 2: Stock Requests */}
        <div className="stat-metric-card stat-orange">
          <div className="stat-icon-wrapper">
            <ShoppingBag size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{profile.stats.stockRequests}</span>
            <span className="stat-label">Stock Requests</span>
          </div>
        </div>

        {/* Stat Box 3: Orders Fulfilled */}
        <div className="stat-metric-card stat-blue">
          <div className="stat-icon-wrapper">
            <ShoppingCart size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{profile.stats.ordersFulfilled}</span>
            <span className="stat-label">Orders Fulfilled</span>
          </div>
        </div>

        {/* Stat Box 4: Rating */}
        <div className="stat-metric-card stat-purple">
          <div className="stat-icon-wrapper">
            <Star size={20} />
          </div>
          <div className="stat-content">
            <div className="rating-number-row">
              <span className="stat-value">{profile.stats.rating}</span>
            </div>
            <span className="stat-label">Rating</span>
            <div className="star-rating-subtext">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="star-filled" />
                ))}
              </div>
              <span className="reviews-count">({profile.stats.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfileSummary;
