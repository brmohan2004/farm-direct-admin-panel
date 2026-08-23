import React from 'react';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import './ProductSheetHeader.css';

const ProductSheetHeader = ({
  title = "Product Details",
  subtitle = "View and manage product information",
  onBack,
  onEditProduct,
  onDeleteProduct
}) => {
  return (
    <div className="product-sheet-header">
      <div className="sheet-header-left">
        {onBack && (
          <button type="button" className="sheet-back-btn" onClick={onBack}>
            <ArrowLeft size={18} />
          </button>
        )}
        <div>
          <h2 className="sheet-header-title">{title}</h2>
          <p className="sheet-header-subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="sheet-header-actions">
        {onEditProduct && (
          <button type="button" className="sheet-action-btn edit-btn" onClick={onEditProduct}>
            <Edit2 size={15} />
            <span>Edit</span>
          </button>
        )}
        {onDeleteProduct && (
          <button type="button" className="sheet-action-btn delete-btn" onClick={onDeleteProduct}>
            <Trash2 size={15} />
            <span>Delete</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductSheetHeader;
