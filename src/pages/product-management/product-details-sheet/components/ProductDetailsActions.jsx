import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import './ProductDetailsActions.css';

const ProductDetailsActions = ({ onEditProduct, onDeleteProduct, onClose }) => {
  return (
    <div className="product-details-bottom-actions">
      <button
        type="button"
        className="details-action-btn btn-edit-green"
        onClick={onEditProduct}
      >
        <Pencil size={16} />
        <span>Edit Product</span>
      </button>

      <button
        type="button"
        className="details-action-btn btn-delete-red"
        onClick={onDeleteProduct}
      >
        <Trash2 size={16} />
        <span>Delete Product</span>
      </button>

      {onClose && (
        <button
          type="button"
          className="details-action-btn btn-close-gray"
          onClick={onClose}
        >
          Close
        </button>
      )}
    </div>
  );
};

export default ProductDetailsActions;
