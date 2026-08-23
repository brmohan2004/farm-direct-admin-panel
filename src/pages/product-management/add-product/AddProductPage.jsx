import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AddProductHeader,
  AddProductForm,
  AddProductActions
} from './components';
import vegMixImg from '../../../assets/cat_vegetables.png';
import './AddProductPage.css';

const AddProductPage = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    unit: '',
    stockQuantity: '',
    purchasePrice: '',
    sellingPrice: '',
    reorderLevel: '',
    description: ''
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (imageUrl) => {
    setPreviewImage(imageUrl);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
  };

  const handleCancel = () => {
    navigate('/product-management/products');
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.name.trim()) {
      showToast('Please enter a product name.', 'error');
      return;
    }
    if (!formData.category) {
      showToast('Please select a category.', 'error');
      return;
    }
    if (!formData.unit) {
      showToast('Please select a unit (e.g. kg, liter).', 'error');
      return;
    }
    if (!formData.stockQuantity) {
      showToast('Please enter stock quantity.', 'error');
      return;
    }
    if (!formData.purchasePrice) {
      showToast('Please enter purchase price.', 'error');
      return;
    }
    if (!formData.sellingPrice) {
      showToast('Please enter selling price.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToast(`Product "${formData.name}" added to inventory successfully!`);

      // Redirect to products list after short delay
      setTimeout(() => {
        navigate('/product-management/products');
      }, 1200);
    }, 600);
  };

  return (
    <div className="add-product-page-container">
      {/* Toast Banner */}
      {toastMessage && (
        <div className={`add-product-toast-notification toast--${toastType}`}>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header */}
      <AddProductHeader
        title="Add Product / Stock"
        subtitle="Add new product and update inventory."
      />

      {/* 2. Main Form Card */}
      <AddProductForm
        formData={formData}
        onFormChange={handleFormChange}
        previewImage={previewImage}
        onImageSelect={handleImageSelect}
        onRemoveImage={handleRemoveImage}
      />

      {/* 3. Action Buttons */}
      <AddProductActions
        onCancel={handleCancel}
        onSave={handleSave}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AddProductPage;
