import React from 'react';
import {
  Package,
  LayoutGrid,
  Ruler,
  Layers,
  IndianRupee,
  Bell,
  FileText
} from 'lucide-react';
import IconInput from '../../../../components/ui/IconInput/IconInput';
import AddProductImageUpload from './AddProductImageUpload';
import './AddProductForm.css';

/**
 * AddProductForm Component
 * Renders the 2-column form card (Desktop) or single-column stacked form (Mobile)
 */
const AddProductForm = ({
  formData,
  onFormChange,
  previewImage,
  onImageSelect,
  onRemoveImage
}) => {
  const handleChange = (field, value) => {
    if (onFormChange) {
      onFormChange(field, value);
    }
  };

  const categoryOptions = [
    { value: '', label: 'Select category' },
    { value: 'Vegetables', label: 'Vegetables' },
    { value: 'Fruits', label: 'Fruits' },
    { value: 'Grains', label: 'Grains' },
    { value: 'Pulses', label: 'Pulses' },
    { value: 'Millets', label: 'Millets' },
    { value: 'Dairy', label: 'Dairy' },
    { value: 'Spices', label: 'Spices' },
    { value: 'Oils', label: 'Oils' },
    { value: 'Beverages', label: 'Beverages' }
  ];

  const unitOptions = [
    { value: '', label: 'e.g., kg, liter, pcs' },
    { value: 'kg', label: 'kg' },
    { value: 'liter', label: 'liter' },
    { value: 'pcs', label: 'pcs' },
    { value: 'pack', label: 'pack' },
    { value: 'box', label: 'box' }
  ];

  return (
    <div className="add-product-form-card">
      <div className="add-product-form-grid">
        {/* Left Column Fields */}
        <div className="add-product-form-left">
          {/* Product Name */}
          <IconInput
            label="Product Name"
            required
            icon={Package}
            placeholder="Enter product name"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />

          {/* Category */}
          <IconInput
            label="Category"
            required
            icon={LayoutGrid}
            isSelect
            options={categoryOptions}
            value={formData.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
          />

          {/* Unit & Stock Quantity Side-by-Side Row */}
          <div className="unit-quantity-row">
            <IconInput
              label="Unit"
              required
              icon={Ruler}
              isSelect
              options={unitOptions}
              value={formData.unit || ''}
              onChange={(e) => handleChange('unit', e.target.value)}
              className="unit-field-item"
            />

            <IconInput
              label="Stock Quantity"
              required
              icon={Layers}
              type="number"
              placeholder="Enter quantity"
              value={formData.stockQuantity || ''}
              onChange={(e) => handleChange('stockQuantity', e.target.value)}
              className="quantity-field-item"
            />
          </div>

          {/* Purchase Price */}
          <IconInput
            label="Purchase Price (per unit)"
            required
            icon={IndianRupee}
            type="number"
            placeholder="Enter purchase price"
            value={formData.purchasePrice || ''}
            onChange={(e) => handleChange('purchasePrice', e.target.value)}
          />

          {/* Selling Price */}
          <IconInput
            label="Selling Price (per unit)"
            required
            icon={IndianRupee}
            type="number"
            placeholder="Enter selling price"
            value={formData.sellingPrice || ''}
            onChange={(e) => handleChange('sellingPrice', e.target.value)}
          />

          {/* Reorder Level */}
          <IconInput
            label="Reorder Level (Low Stock Alert)"
            required
            icon={Bell}
            type="number"
            placeholder="Enter reorder level"
            value={formData.reorderLevel || ''}
            onChange={(e) => handleChange('reorderLevel', e.target.value)}
          />
        </div>

        {/* Right Column Fields */}
        <div className="add-product-form-right">
          {/* Product Image Upload */}
          <AddProductImageUpload
            previewUrl={previewImage}
            onImageSelect={onImageSelect}
            onRemoveImage={onRemoveImage}
          />

          {/* Description Optional */}
          <IconInput
            label="Description (Optional)"
            icon={FileText}
            isTextarea
            rows={5}
            maxLength={200}
            placeholder="Enter product description"
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
