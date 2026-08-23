import React, { useState, useEffect } from 'react';
import { Modal } from '../../../../components/ui';
import './CategoryFormModal.css';

/**
 * CategoryFormModal Component
 * Modal for creating or editing a category.
 */
const CategoryFormModal = ({
  isOpen = false,
  onClose,
  onSave,
  category = null
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    totalProducts: 0,
    status: 'Active'
  });

  const isEditing = Boolean(category && category.id);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        totalProducts: category.totalProducts ?? 0,
        status: category.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        description: '',
        totalProducts: 0,
        status: 'Active'
      });
    }
  }, [category, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onSave({
      ...category,
      name: formData.name.trim(),
      description: formData.description.trim(),
      totalProducts: Number(formData.totalProducts) || 0,
      status: formData.status
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Category' : 'Add New Category'}
      subtitle={isEditing ? 'Update category details' : 'Create a new product category for your catalog'}
      maxWidth="480px"
    >
      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label htmlFor="cat-name" className="form-label">
            Category Name <span className="required-star">*</span>
          </label>
          <input
            id="cat-name"
            type="text"
            className="form-input"
            placeholder="e.g. Vegetables, Fruits, Grains"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cat-desc" className="form-label">Description</label>
          <textarea
            id="cat-desc"
            className="form-textarea"
            placeholder="Brief description of the category..."
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="cat-count" className="form-label">Total Products</label>
            <input
              id="cat-count"
              type="number"
              min="0"
              className="form-input"
              value={formData.totalProducts}
              onChange={(e) => setFormData({ ...formData, totalProducts: e.target.value })}
            />
          </div>

          <div className="form-group flex-1">
            <label htmlFor="cat-status" className="form-label">Status</label>
            <select
              id="cat-status"
              className="form-select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="form-btn form-btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="form-btn form-btn-submit"
          >
            {isEditing ? 'Save Changes' : 'Create Category'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryFormModal;
