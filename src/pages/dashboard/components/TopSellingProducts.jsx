import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight, ArrowUpRight, ArrowRight } from 'lucide-react';

import potatoImg from '../../../assets/prod_potatoes.png';
import tomatoImg from '../../../assets/prod_tomatoes.png';
import onionImg from '../../../assets/prod_onions.png';
import spinachImg from '../../../assets/prod_spinach.png';
import carrotImg from '../../../assets/prod_carrots.png';

import './TopSellingProducts.css';

const products = [
  {
    id: 'p1',
    name: 'Potato',
    orders: '412 Orders',
    price: '₹48,650',
    growth: '18.6%',
    image: potatoImg
  },
  {
    id: 'p2',
    name: 'Tomato',
    orders: '309 Orders',
    price: '₹36,540',
    growth: '15.3%',
    image: tomatoImg
  },
  {
    id: 'p3',
    name: 'Onion',
    orders: '287 Orders',
    price: '₹28,450',
    growth: '12.8%',
    image: onionImg
  },
  {
    id: 'p4',
    name: 'Spinach',
    orders: '204 Orders',
    price: '₹18,750',
    growth: '10.2%',
    image: spinachImg
  },
  {
    id: 'p5',
    name: 'Carrot',
    orders: '176 Orders',
    price: '₹15,230',
    growth: '9.1%',
    image: carrotImg
  }
];

const TopSellingProducts = ({ hideHeader = false }) => {
  const content = (
    <div className="top-products-list">
      {products.map((item) => (
        <div key={item.id} className="product-item-row">
          <div className="product-item-left">
            <div className="product-img-box">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="product-info">
              <span className="product-title">{item.name}</span>
              <span className="product-orders">{item.orders}</span>
            </div>
          </div>

          <div className="product-item-right">
            <span className="product-price">{item.price}</span>
            <span className="product-growth">
              <ArrowUpRight size={12} />
              {item.growth}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  if (hideHeader) return content;

  return (
    <div className="top-products-card">
      <div className="orders-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <h3 className="chart-title">Top Selling Products</h3>
          <span className="card-header-badge">5</span>
        </div>
        <NavLink to="/product-management/products" className="view-all-link">
          View All <ChevronRight size={16} />
        </NavLink>
      </div>

      {content}

      <NavLink to="/product-management/products" className="view-products-btn">
        View All Products <ArrowRight size={15} />
      </NavLink>
    </div>
  );
};

export default TopSellingProducts;
