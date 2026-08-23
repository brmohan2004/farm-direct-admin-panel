import React from 'react';
import { FileText } from 'lucide-react';
import './ProductInfoCard.css';

/**
 * ProductInfoCard Component
 * Renders Product Information breakdown card
 */
const ProductInfoCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="product-info-card">
      <div className="card-section-header">
        <FileText size={18} className="header-icon-green" />
        <h3 className="section-title-text">Product Information</h3>
      </div>

      <div className="info-rows-list">
        <div className="info-item-row">
          <span className="info-row-label">Product ID</span>
          <span className="info-row-val green-text">{product.productId || '#PROD12345'}</span>
        </div>

        <div className="info-item-row">
          <span className="info-row-label">Added On</span>
          <span className="info-row-val">{product.createdDate || '10 May 2024, 09:15 AM'}</span>
        </div>

        <div className="info-item-row">
          <span className="info-row-label">Last Updated</span>
          <span className="info-row-val">{product.updatedDate ? `${product.updatedDate}, ${product.updatedTime}` : '12 May 2024, 10:20 AM'}</span>
        </div>

        <div className="info-item-row">
          <span className="info-row-label">Added By</span>
          <span className="info-row-val">{product.addedBy || 'Admin (Super Admin)'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoCard;
