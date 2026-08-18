import React from 'react';
import { ShoppingBag, IndianRupee, Users, Package, ArrowUpRight } from 'lucide-react';
import './StatCards.css';

const statData = [
  {
    id: 'orders',
    title: 'Total Orders',
    value: '1,248',
    change: '18.6%',
    period: 'vs last week',
    icon: ShoppingBag,
    colorClass: 'green'
  },
  {
    id: 'sales',
    title: 'Total Sales',
    value: '₹3,48,650',
    change: '21.4%',
    period: 'vs last week',
    icon: IndianRupee,
    colorClass: 'blue'
  },
  {
    id: 'farmers',
    title: 'Farmers',
    value: '512',
    change: '12.5%',
    period: 'vs last week',
    icon: Users,
    colorClass: 'orange'
  },
  {
    id: 'products',
    title: 'Products',
    value: '842',
    change: '8.4%',
    period: 'vs last week',
    icon: Package,
    colorClass: 'purple'
  }
];

const StatCards = () => {
  return (
    <div className="stat-cards-grid">
      {statData.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className="stat-card">
            <div className={`stat-icon-box ${stat.colorClass}`}>
              <Icon size={16} />
            </div>

            <div className="stat-card-title">{stat.title}</div>
            <h2 className="stat-card-value">{stat.value}</h2>

            <div className="stat-card-bottom">
              <span className="stat-trend">
                <ArrowUpRight size={11} />
                {stat.change}
              </span>
              <span className="stat-trend-sub">{stat.period}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatCards;
