import React from 'react';
import { Download } from 'lucide-react';
import './FarmerRequestsHeader.css';

/**
 * FarmerRequestsHeader Component
 * Renders page title, description, and export action button
 */
const FarmerRequestsHeader = ({ onExport, totalRequests = 48 }) => {
  return (
    <div className="farmer-requests-header">
      <div className="farmer-requests-header-text">
        <h1 className="farmer-requests-title">Farmer Requests</h1>
        <p className="farmer-requests-subtitle">
          Review and manage new farmer registration requests.
        </p>
      </div>

      <div className="farmer-requests-header-actions">
        <button
          type="button"
          className="farmer-requests-export-btn"
          onClick={onExport}
        >
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};

export default FarmerRequestsHeader;
