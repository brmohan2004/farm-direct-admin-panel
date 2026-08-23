import React from 'react';
import './AddProductHeader.css';

/**
 * AddProductHeader Component
 * Renders title and subtitle for Add Product page
 */
const AddProductHeader = ({
  title = 'Add Product / Stock',
  subtitle = 'Add new product and update inventory.'
}) => {
  return (
    <div className="add-product-header">
      <h1 className="add-product-title">{title}</h1>
      <p className="add-product-subtitle">{subtitle}</p>
    </div>
  );
};

export default AddProductHeader;
