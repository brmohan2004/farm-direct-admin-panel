import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '../../../../components/ui';
import './CategoryDeleteModal.css';

/**
 * CategoryDeleteModal Component
 * Modal for confirming category deletion.
 */
const CategoryDeleteModal = ({
  isOpen = false,
  onClose,
  onConfirm,
  category = null
}) => {
  if (!category) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Category"
      maxWidth="420px"
    >
      <div className="category-delete-content">
        <div className="category-delete-icon-wrapper">
          <AlertTriangle size={32} className="category-delete-icon" />
        </div>
        <h3 className="category-delete-heading">Are you sure?</h3>
        <p className="category-delete-message">
          You are about to delete <strong>{category.name}</strong>. This action will remove the category from your store catalog.
        </p>

        <div className="category-delete-actions">
          <button
            type="button"
            className="delete-btn delete-btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="delete-btn delete-btn-confirm"
            onClick={() => {
              onConfirm(category.id);
              onClose();
            }}
          >
            Delete Category
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryDeleteModal;
