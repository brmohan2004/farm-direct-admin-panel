import React, { useState, useEffect } from 'react';
import { Pencil, Save, RefreshCw, X } from 'lucide-react';
import Modal from '../../../../components/ui/Modal/Modal';
import StatusBadge from '../../../../components/ui/StatusBadge/StatusBadge';
import './ProductDetailsModal.css';

/**
 * ProductDetailsModal Component
 * View & Quick Edit Modal for an inventory product
 */
const ProductDetailsModal = ({
  product,
  isOpen = false,
  onClose,
  onSaveProduct,
  mode = 'view' // 'view' | 'edit' | 'stock'
}) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    unit: 'kg',
    quantity: '',
    pricePerUnit: '',
    status: 'In Stock'
  });

  useEffect(() => {
    setCurrentMode(mode);
    if (product) {
      const numericQty = parseFloat(product.quantity) || 0;
      const totalVal = parseFloat((product.totalValue || '0').replace(/,/g, '')) || 0;
      const unitPrice = numericQty > 0 ? (totalVal / numericQty).toFixed(2) : '25';

      setFormData({
        name: product.name || '',
        category: product.category || 'Vegetables',
        unit: product.unit || 'kg',
        quantity: numericQty,
        pricePerUnit: unitPrice,
        status: product.status || 'In Stock'
      });
    }
  }, [product, mode, isOpen]);

  if (!product) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const numQty = parseFloat(formData.quantity) || 0;
    const numPrice = parseFloat(formData.pricePerUnit) || 0;
    const computedTotal = (numQty * numPrice).toLocaleString('en-IN');

    // Auto update status based on quantity if changed
    let autoStatus = formData.status;
    if (numQty === 0) autoStatus = 'Out of Stock';
    else if (numQty < 150) autoStatus = 'Low Stock';
    else autoStatus = 'In Stock';

    const updatedProduct = {
      ...product,
      name: formData.name,
      category: formData.category,
      unit: formData.unit,
      quantity: `${numQty} ${formData.unit}`,
      totalValue: computedTotal,
      status: autoStatus,
      updatedDate: 'Today',
      updatedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (onSaveProduct) onSaveProduct(updatedProduct);
    onClose && onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={currentMode === 'edit' ? `Edit Product: ${product.name}` : `Inventory Details: ${product.name}`}
      subtitle={`Category: ${product.category} • Updated ${product.updatedDate || 'Recently'}`}
      maxWidth="580px"
    >
      <div className="product-details-modal-wrapper">
        {/* Top Summary Banner */}
        <div className="product-modal-banner">
          <img src={product.image} alt={product.name} className="product-modal-img" />
          <div className="product-modal-banner-info">
            <h3 className="modal-banner-title">{product.name}</h3>
            <span className="modal-banner-cat">Category: <strong>{product.category}</strong></span>
            <div className="modal-status-row">
              <StatusBadge status={formData.status} showDot={false} size="md" />
            </div>
          </div>
          <div className="product-modal-banner-val">
            <span className="banner-val-lbl">Total Value</span>
            <span className="banner-val-num">₹{product.totalValue}</span>
          </div>
        </div>

        {currentMode === 'view' ? (
          <div className="view-mode-details">
            <div className="details-metrics-grid">
              <div className="detail-box">
                <span className="detail-lbl">Current Stock</span>
                <span className="detail-val">{product.quantity}</span>
              </div>
              <div className="detail-box">
                <span className="detail-lbl">Unit Standard</span>
                <span className="detail-val">{product.unit || 'kg'}</span>
              </div>
              <div className="detail-box">
                <span className="detail-lbl">Est. Price / Unit</span>
                <span className="detail-val green-text">
                  ₹{formData.pricePerUnit} / {product.unit || 'kg'}
                </span>
              </div>
              <div className="detail-box">
                <span className="detail-lbl">Stock Status</span>
                <span className="detail-val">{product.status}</span>
              </div>
            </div>

            <div className="modal-action-bar">
              <button
                type="button"
                className="modal-btn outline-btn"
                onClick={() => setCurrentMode('edit')}
              >
                <Pencil size={15} />
                <span>Edit Product Details</span>
              </button>
              <button
                type="button"
                className="modal-btn primary-btn"
                onClick={() => setCurrentMode('stock')}
              >
                <RefreshCw size={15} />
                <span>Update Quantity</span>
              </button>
            </div>
          </div>
        ) : (
          /* Edit / Stock Update Form */
          <div className="edit-mode-form">
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains</option>
                  <option value="Pulses">Pulses</option>
                  <option value="Millets">Millets</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Spices">Spices</option>
                  <option value="Oils">Oils</option>
                  <option value="Beverages">Beverages</option>
                </select>
              </div>
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Unit</label>
                <select
                  className="form-select"
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                >
                  <option value="kg">kg</option>
                  <option value="liter">liter</option>
                  <option value="pack">pack</option>
                  <option value="box">box</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Price / {formData.unit}</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.pricePerUnit}
                  onChange={(e) => handleInputChange('pricePerUnit', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Stock Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div className="modal-action-bar">
              <button
                type="button"
                className="modal-btn secondary-btn"
                onClick={() => setCurrentMode('view')}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-btn primary-btn"
                onClick={handleSave}
              >
                <Save size={15} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
