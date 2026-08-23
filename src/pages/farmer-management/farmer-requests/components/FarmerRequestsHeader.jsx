import React from 'react';
import './FarmerRequestsHeader.css';

/**
 * FarmerRequestsHeader Component
 * Renders page title and subtitle
 */
const FarmerRequestsHeader = ({
  title = 'Farmer Requests',
  subtitle = 'Review and manage new farmer registration requests.'
}) => {
  return (
    <div className="farmer-requests-header">
      <div className="farmer-requests-header-text">
        <h1 className="farmer-requests-title">{title}</h1>
        <p className="farmer-requests-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default FarmerRequestsHeader;

