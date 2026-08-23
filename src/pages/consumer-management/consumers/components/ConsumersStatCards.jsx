import React from 'react';
import { Users, UserCheck, UserX, UserPlus } from 'lucide-react';
import './ConsumersStatCards.css';

/**
 * ConsumersStatCards Component
 * Minimalist metric cards showing total, active, inactive, and new consumers
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
      label: 'Total',
      value: stats.total.toLocaleString(),
      change: '+8%',
      icon: <Users size={15} />,
      color: '#16a34a',
      bgLight: '#f0fdf4',
    },
    {
      id: 'active',
      label: 'Active',
      value: stats.active.toLocaleString(),
      change: '87.8%',
      icon: <UserCheck size={15} />,
      color: '#2563eb',
      bgLight: '#eff6ff',
    },
    {
      id: 'inactive',
      label: 'Inactive',
      value: stats.inactive.toLocaleString(),
      change: '12.2%',
      icon: <UserX size={15} />,
      color: '#d97706',
      bgLight: '#fff7ed',
    },
    {
      id: 'new',
      label: 'New',
      value: stats.newThisMonth.toLocaleString(),
      change: '+18%',
      icon: <UserPlus size={15} />,
      color: '#9333ea',
      bgLight: '#faf5ff',
    },
  ];

  return (
    <div className="consumers-stat-grid">
      {cards.map((card) => (
        <div key={card.id} className="consumers-stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon-pill" style={{ color: card.color, backgroundColor: card.bgLight }}>
              {card.icon}
            </div>
            <span className="stat-card-label">{card.label}</span>
          </div>
          <div className="stat-card-body">
            <span className="stat-card-val">{card.value}</span>
            <span className="stat-card-badge" style={{ color: card.color, backgroundColor: card.bgLight }}>
              {card.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConsumersStatCards;
