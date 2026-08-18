import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import farmerImg from '../../../assets/farmer.png';
import './RecentFarmerRequests.css';

const farmerRequests = [
  {
    id: 'f1',
    name: 'Ramesh Kumar',
    location: 'Coimbatore, TN',
    date: '12 May, 10:20 AM',
    status: 'Pending',
    initials: 'RK'
  },
  {
    id: 'f2',
    name: 'Selvi M.',
    location: 'Erode, TN',
    date: '12 May, 09:15 AM',
    status: 'Pending',
    initials: 'SM'
  },
  {
    id: 'f3',
    name: 'Manoj P.',
    location: 'Tirupur, TN',
    date: '11 May, 07:45 PM',
    status: 'Pending',
    initials: 'MP'
  },
  {
    id: 'f4',
    name: 'Kavitha R.',
    location: 'Salem, TN',
    date: '11 May, 06:30 PM',
    status: 'Approved',
    initials: 'KR'
  },
  {
    id: 'f5',
    name: 'Raghavan S.',
    location: 'Dindigul, TN',
    date: '11 May, 05:10 PM',
    status: 'Approved',
    initials: 'RS'
  }
];

const RecentFarmerRequests = ({ hideHeader = false }) => {
  const content = (
    <div className="farmers-list">
      {farmerRequests.map((farmer, idx) => (
        <div key={farmer.id} className="farmer-item-row">
          <div className="farmer-item-left">
            {idx === 0 ? (
              <img src={farmerImg} alt={farmer.name} className="farmer-avatar-img" />
            ) : (
              <div className="farmer-avatar-placeholder">
                {farmer.initials}
              </div>
            )}
            <div className="farmer-details">
              <span className="farmer-name">{farmer.name}</span>
              <span className="farmer-location">{farmer.location}</span>
              <span className="farmer-date">{farmer.date}</span>
            </div>
          </div>

          <div>
            <span className={farmer.status === 'Approved' ? 'status-badge-approved' : 'status-badge-pending'}>
              {farmer.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  if (hideHeader) return content;

  return (
    <div className="farmers-card">
      <div className="orders-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <h3 className="chart-title">Recent Farmer Requests</h3>
          <span className="card-header-badge">18</span>
        </div>
        <NavLink to="/farmer-management/requests" className="view-all-link">
          View All <ChevronRight size={16} />
        </NavLink>
      </div>
      {content}
    </div>
  );
};

export default RecentFarmerRequests;
