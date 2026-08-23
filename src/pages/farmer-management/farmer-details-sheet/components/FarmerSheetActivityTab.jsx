import React from 'react';
import { CheckCircle2, Package, ArrowUpRight, DollarSign } from 'lucide-react';
import './FarmerSheetActivityTab.css';

/**
 * FarmerSheetActivityTab Component
 * Activity logs timeline inside details sheet
 */
const FarmerSheetActivityTab = () => {
  const activities = [
    { id: 'act-1', title: 'Stock Dispatch Approved', desc: '450 kg Organic Tomatoes dispatched to Hub 1', date: 'Today, 02:45 PM', icon: Package, color: 'green' },
    { id: 'act-2', title: 'Payout Credit Settled', desc: '₹14,500 credited via UPI to SBI Account', date: 'Yesterday, 05:10 PM', icon: DollarSign, color: 'blue' },
    { id: 'act-3', title: 'Document Verified', desc: 'Patta/Chitta #4521 land record verified', date: '20 Aug 2026', icon: CheckCircle2, color: 'green' },
    { id: 'act-4', title: 'Stock Request Submitted', desc: '200 kg Carrots & 150 kg Spinach request', date: '18 Aug 2026', icon: ArrowUpRight, color: 'orange' }
  ];

  return (
    <div className="farmer-sheet-activity-wrapper">
      <div className="activity-timeline">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="timeline-item">
              <div className={`timeline-icon-box ${act.color}`}>
                <Icon size={14} />
              </div>

              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-title">{act.title}</span>
                  <span className="timeline-date">{act.date}</span>
                </div>
                <p className="timeline-desc">{act.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FarmerSheetActivityTab;
