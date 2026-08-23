import React from 'react';
import { ShoppingCart, PackageCheck, UserCheck, ShieldCheck, AlertCircle, Clock } from 'lucide-react';
import './ActivityTab.css';

/**
 * ActivityTab Component
 * Renders complete historical activity log timeline for the farmer
 */
const ActivityTab = ({ farmer }) => {
  const activityLogs = farmer?.activityLogs || [
    {
      id: 'act-1',
      title: 'Order #ORD12345 fulfilled & delivered',
      description: 'Fulfilled 50 kg Tomatoes & 30 kg Carrots to Consumer #CST8821.',
      timestamp: '20 May 2024, 10:30 AM',
      iconType: 'order',
      badgeClass: 'badge-green'
    },
    {
      id: 'act-2',
      title: 'Stock request #SR1234 approved',
      description: 'Admin approved listing request for 120 kg Organic Spinach.',
      timestamp: '18 May 2024, 03:15 PM',
      iconType: 'stock',
      badgeClass: 'badge-orange'
    },
    {
      id: 'act-3',
      title: 'Bank details verified',
      description: 'State Bank of India account verified via automated penny-drop test.',
      timestamp: '15 May 2024, 02:40 PM',
      iconType: 'shield',
      badgeClass: 'badge-blue'
    },
    {
      id: 'act-4',
      title: 'Land ownership document uploaded',
      description: 'Farmer submitted Patta document #4521/2023 for verification.',
      timestamp: '14 May 2024, 11:10 AM',
      iconType: 'clock',
      badgeClass: 'badge-purple'
    },
    {
      id: 'act-5',
      title: 'Farmer account registered & created',
      description: 'Initial registration completed from mobile app (Coimbatore region).',
      timestamp: '12 May 2024, 09:45 AM',
      iconType: 'profile',
      badgeClass: 'badge-gray'
    }
  ];

  return (
    <div className="activity-tab-container">
      <div className="activity-timeline-card">
        <h3 className="timeline-title">Activity Timeline Log</h3>

        <div className="timeline-items-list">
          {activityLogs.map((log, index) => (
            <div key={log.id} className="timeline-item">
              <div className={`timeline-badge ${log.badgeClass}`}>
                {log.iconType === 'order' && <ShoppingCart size={16} />}
                {log.iconType === 'stock' && <PackageCheck size={16} />}
                {log.iconType === 'shield' && <ShieldCheck size={16} />}
                {log.iconType === 'clock' && <Clock size={16} />}
                {log.iconType === 'profile' && <UserCheck size={16} />}
              </div>

              {index < activityLogs.length - 1 && <div className="timeline-connector"></div>}

              <div className="timeline-content">
                <div className="timeline-header-row">
                  <h4 className="log-title">{log.title}</h4>
                  <span className="log-timestamp">{log.timestamp}</span>
                </div>
                <p className="log-desc">{log.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTab;
