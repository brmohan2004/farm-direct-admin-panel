import React, { useState } from 'react';
import Modal from '../../../../components/ui/Modal/Modal';
import './EditFarmerModal.css';

/**
 * EditFarmerModal Component
 * Renders editing form dialog to update farmer details (Name, Phone, Address, Farm Size, Products)
 */
const EditFarmerModal = ({
  farmer,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: farmer?.name || 'Ramesh Kumar',
    phone: farmer?.phone || '+91 98765 43210',
    email: farmer?.email || 'ramesh.kumar@email.com',
    location: farmer?.location || 'Coimbatore, Tamil Nadu, India',
    farmName: farmer?.farmInfo?.farmName || 'Green Valley Farms',
    farmSize: farmer?.farmInfo?.farmSize || '5 Acres',
    products: farmer?.farmInfo?.primaryProducts || 'Vegetables, Fruits'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave && onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Farmer Profile & Farm Details"
      size="md"
    >
      <form onSubmit={handleSubmit} className="edit-farmer-form">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row-2col">
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="form-input"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Address / Location</label>
          <input
            type="text"
            name="location"
            className="form-input"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-row-2col">
          <div className="form-group">
            <label className="form-label">Farm Name</label>
            <input
              type="text"
              name="farmName"
              className="form-input"
              value={formData.farmName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Farm Size</label>
            <input
              type="text"
              name="farmSize"
              className="form-input"
              value={formData.farmSize}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Primary Crop Categories</label>
          <input
            type="text"
            name="products"
            className="form-input"
            value={formData.products}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-save">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditFarmerModal;
