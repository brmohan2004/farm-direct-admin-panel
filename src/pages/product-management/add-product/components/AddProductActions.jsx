import React from 'react';
import { Save } from 'lucide-react';
import './AddProductActions.css';

/**
 * AddProductActions Component
 * Action buttons bar for Add Product page (Cancel & Save Product)
 */
const AddProductActions = ({
  onCancel,
  onSave,
  isSubmitting = false
}) => {
  return (
    <div className="add-product-actions-bar">
      <button
        type="button"
        className="add-product-cancel-btn"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </button>

      <button
        type="button"
        className="add-product-save-btn"
        onClick={onSave}
        disabled={isSubmitting}
      >
        <Save size={18} className="save-btn-icon" />
        <span>{isSubmitting ? 'Saving...' : 'Save Product'}</span>
      </button>
    </div>
  );
};

export default AddProductActions;
