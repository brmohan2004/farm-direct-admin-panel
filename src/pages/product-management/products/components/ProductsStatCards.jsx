import React from 'react';
import { Package, ShoppingBag, IndianRupee, PieChart } from 'lucide-react';
import './ProductsStatCards.css';

/**
 * ProductsStatCards Component
 * Displays 4 inventory metric summary cards:
 * 1. Total Items (342)
 * 2. Total Quantity (1,245)
 * 3. Total Value (₹8,45,230)
 * 4. Low Stock Items (24)
 */
const ProductsStatCards = ({
  stats = {
    totalItems: 342,
    totalQuantity: '1,245',
    totalValue: '₹8,45,230',
    lowStockItems: 24
  },
  activeStat = 'All',
  onStatClick
}) => {
  const cards = [
    {
      id: 'All',
      label: 'Total Items',
      value: stats.totalItems,
      icon: Package,
      type: 'items'
    },
    {
      id: 'Quantity',
      label: 'Total Quantity',
      value: stats.totalQuantity,
      icon: ShoppingBag,
      type: 'quantity'
    },
    {
      id: 'Value',
      label: 'Total Value',
      value: stats.totalValue,
      icon: IndianRupee,
      type: 'value'
    },
    {
      id: 'Low Stock',
      label: 'Low Stock Items',
      value: stats.lowStockItems,
      icon: PieChart,
      type: 'lowstock'
    }
  ];

  return (
    <div className="products-stat-cards-wrapper">
      <div className="products-stat-cards-grid">
        {cards.map((card) => {
          const IconComponent = card.icon;
          const isActive = activeStat === card.id;

          return (
            <div
              key={card.id}
              className={`product-stat-card stat-card--${card.type} ${isActive ? 'is-active' : ''}`}
              onClick={() => onStatClick && onStatClick(card.id)}
              role="button"
              tabIndex={0}
            >
              <div className={`stat-icon-circle icon-circle--${card.type}`}>
                <IconComponent size={22} className="stat-card-icon" />
              </div>
              <div className="stat-card-info">
                <span className="stat-card-val">{card.value}</span>
                <span className="stat-card-lbl">{card.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsStatCards;
