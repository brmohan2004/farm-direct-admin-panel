import React from 'react';
import { FileText } from 'lucide-react';
import './ProductDescriptionCard.css';

/**
 * ProductDescriptionCard Component
 * Displays full product description text
 */
const ProductDescriptionCard = ({ description }) => {
  return (
    <div className="product-description-card">
      <div className="card-section-header">
        <FileText size={18} className="header-icon-green" />
        <h3 className="section-title-text">Description</h3>
      </div>

      <p className="description-content-text">
        {description || 'A fresh mix of handpicked seasonal vegetables.'}
      </p>
    </div>
  );
};

export default ProductDescriptionCard;
