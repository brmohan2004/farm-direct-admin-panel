import React from 'react';
import { Users, UserCheck, UserX, UserPlus } from 'lucide-react';
import './ConsumersStatCards.css';

/**
 * ConsumersStatCards Component
 * Metric cards showing total, active, inactive, and new consumers
 */
const ConsumersStatCards = ({
  stats = {
    total: 1248,
    active: 1096,
    inactive: 152,
    newThisMonth: 48,
  },
}) => {
  const cards = [
    {
      id: 'total',
      title: 'Total Consumers',
      value: stats.total.toLocaleString(),
      subtext: '+8% this month',
      subtextType: 'positive',
      icon: <Users size={20} />,
      iconTheme: 'green',
    },
    {
      id: 'active',
      title: 'Active Consumers',
      value: stats.active.toLocaleString(),
      subtext: '87.8% of total',
      subtextType: 'neutral',
      icon: <UserCheck size={20} />,
      iconTheme: 'purple',
    },
    {
      id: 'inactive',
      title: 'Inactive Consumers',
      value: stats.inactive.toLocaleString(),
      subtext: '12.2% of total',
      subtextType: 'neutral',
      icon: <UserX size={20} />,
      iconTheme: 'orange',
    },
    {
      id: 'new',
      title: 'New This Month',
      value: stats.newThisMonth.toLocaleString(),
      subtext: '+18.2% vs last month',
      subtextType: 'positive',
      icon: <UserPlus size={20} />,
      iconTheme: 'blue',
    },
  ];

  return (
    <div className="consumers-stat-grid">
      {cards.map((card) => (
        <div key={card.id} className="consumers-stat-card">
          <div className="consumers-stat-top">
            <div className={`consumers-stat-icon-wrap consumers-stat-icon-wrap--${card.iconTheme}`}>
              {card.icon}
            </div>
          </div>
          <div className="consumers-stat-info">
            <span className="consumers-stat-title">{card.title}</span>
            <span className="consumers-stat-value">{card.value}</span>
            <span className={`consumers-stat-subtext consumers-stat-subtext--${card.subtextType}`}>
              {card.subtext}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConsumersStatCards;
