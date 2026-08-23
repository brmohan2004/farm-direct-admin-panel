import React, { useState } from 'react';
import { X, User, Phone, Mail, MapPin } from 'lucide-react';
import './AddConsumerModal.css';

/**
 * AddConsumerModal Component
 * Modal form for creating a new consumer record
 */
const AddConsumerModal = ({ isOpen = false, onClose, onAddConsumer }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    status: 'Active',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide consumer full name and phone number.');
      return;
    }

    const newConsumer = {
      id: `CONS${Date.now().toString().slice(-3)}`,
      name: formData.name,
      status: formData.status,
      phone: formData.phone,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      location: formData.location || 'Lucknow, Uttar Pradesh',
      fullLocation: `${formData.location || 'Lucknow, Uttar Pradesh'}, India`,
      joinedOn: 'Today',
      joinedOnTime: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, 10:00 AM`,
      totalOrders: 0,
      totalSpent: 0,
      formattedTotalSpent: '₹0.00',
      avgOrderValue: '₹0.00',
      lastOrderTimeAgo: 'Never',
      firstOrderDate: 'N/A',
      lastOrderDate: 'N/A',
      notes: [],
      recentOrders: [],
      addresses: [],
      activities: [{ id: 'act-new', text: 'Consumer account created by admin', time: 'Just now' }]
    };

    onAddConsumer(newConsumer);
    onClose();
  };

  return (
    <div className="add-consumer-modal-overlay" onClick={onClose}>
      <div className="add-consumer-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="add-consumer-modal-header">
          <h3 className="add-consumer-modal-title">Add New Consumer</h3>
          <button className="add-consumer-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-consumer-modal-body">
          <div className="add-consumer-form-group">
            <label className="add-consumer-label">Full Name *</label>
            <div className="add-consumer-input-wrap">
              <User size={16} className="input-icon" />
              <input
                type="text"
                name="name"
                className="add-consumer-input"
                placeholder="Enter full name (e.g. Ramesh Kumar)"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="add-consumer-form-group">
            <label className="add-consumer-label">Phone Number *</label>
            <div className="add-consumer-input-wrap">
              <Phone size={16} className="input-icon" />
              <input
                type="tel"
                name="phone"
                className="add-consumer-input"
                placeholder="Enter 10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="add-consumer-form-group">
            <label className="add-consumer-label">Email Address</label>
            <div className="add-consumer-input-wrap">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                name="email"
                className="add-consumer-input"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="add-consumer-form-group">
            <label className="add-consumer-label">Location / City</label>
            <div className="add-consumer-input-wrap">
              <MapPin size={16} className="input-icon" />
              <input
                type="text"
                name="location"
                className="add-consumer-input"
                placeholder="e.g. Lucknow, Uttar Pradesh"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="add-consumer-form-group">
            <label className="add-consumer-label">Initial Status</label>
            <select
              name="status"
              className="add-consumer-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="add-consumer-modal-footer">
            <button type="button" className="add-consumer-btn add-consumer-btn--cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-consumer-btn add-consumer-btn--submit">
              Add Consumer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddConsumerModal;
