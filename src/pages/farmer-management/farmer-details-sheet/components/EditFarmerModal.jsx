import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import Modal from '../../../../components/ui/Modal/Modal';
import './EditFarmerModal.css';

const EditFarmerModal = ({ farmer, isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    farmName: '',
    farmSize: '',
    products: ''
  });

  useEffect(() => {
    if (farmer) {
      setForm({
        name: farmer.name || '',
        phone: farmer.phone || '',
        email: farmer.email || '',
        location: farmer.location || '',
        farmName: farmer.farmInfo?.farmName || '',
        farmSize: farmer.farmInfo?.farmSize || '',
        products: farmer.farmInfo?.primaryProducts || ''
      });
    }
  }, [farmer]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(form);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="560px">
      <div className="edit-farmer-modal-content">
        <div className="edit-farmer-header">
          <h3 className="edit-farmer-title">Edit Farmer Information</h3>
          <button type="button" className="edit-farmer-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-farmer-form">
          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location / City</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Farm Name</label>
              <input
                type="text"
                name="farmName"
                value={form.farmName}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Farm Size</label>
              <input
                type="text"
                name="farmSize"
                value={form.farmSize}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Primary Products</label>
            <input
              type="text"
              name="products"
              value={form.products}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="edit-farmer-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              <Save size={15} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditFarmerModal;
