import React from 'react';
import { Package, TrendingUp, DollarSign, Star } from 'lucide-react';
import './ProductSheetMetrics.css';

const ProductSheetMetrics = ({ product }) => {
  if (!product) return null;

  return (
    <div className="product-sheet-metrics-grid">
      <div className="sheet-metric-card green">
        <div className="metric-icon"><Package size={16} /></div>
        <span className="metric-val">{product.stock || '450 kg'}</span>
        <span className="metric-lbl">In Stock</span>
      </div>

      <div className="sheet-metric-card blue">
        <div className="metric-icon"><TrendingUp size={16} /></div>
        <span className="metric-val">{product.totalSold || '1,240 kg'}</span>
        <span className="metric-lbl">Total Sold</span>
      </div>

      <div className="sheet-metric-card purple">
        <div className="metric-icon"><DollarSign size={16} /></div>
        <span className="metric-val">{product.revenue || '₹62,000'}</span>
        <span className="metric-lbl">Total Revenue</span>
      </div>

      <div className="sheet-metric-card orange">
        <div className="metric-icon"><Star size={16} /></div>
        <span className="metric-val">{product.rating || '4.8'}</span>
        <span className="metric-lbl">Avg Rating</span>
      </div>
    </div>
  );
};

export default ProductSheetMetrics;
