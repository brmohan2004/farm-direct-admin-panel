import React, { useRef } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import vegMixImg from '../../../../assets/cat_vegetables.png';
import fruitsMixImg from '../../../../assets/cat_fruits.png';
import grainsImg from '../../../../assets/cat_grains_pulses.png';
import potatoesImg from '../../../../assets/prod_potatoes.png';
import carrotsImg from '../../../../assets/prod_carrots.png';
import tomatoesImg from '../../../../assets/prod_tomatoes.png';
import './AddProductImageUpload.css';

const SAMPLE_ASSETS = [
  { label: 'Vegetables', src: vegMixImg },
  { label: 'Fruits', src: fruitsMixImg },
  { label: 'Grains', src: grainsImg },
  { label: 'Tomatoes', src: tomatoesImg },
  { label: 'Potatoes', src: potatoesImg },
  { label: 'Carrots', src: carrotsImg }
];

/**
 * AddProductImageUpload Component
 * Drag & Drop Image Uploader matching design specifications
 */
const AddProductImageUpload = ({
  previewUrl,
  onImageSelect,
  onRemoveImage,
  label = 'Product Image',
  required = false
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (onImageSelect) onImageSelect(url, file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (onImageSelect) onImageSelect(url, file);
    }
  };

  return (
    <div className="add-product-image-upload-group">
      <label className="image-upload-label">
        {label}
        {required && <span className="required-asterisk"> *</span>}
      </label>

      {previewUrl ? (
        <div className="image-preview-container">
          <img src={previewUrl} alt="Product Preview" className="image-preview-img" />
          <button
            type="button"
            className="remove-preview-btn"
            onClick={onRemoveImage}
            title="Remove Image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className="image-upload-dropzone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp"
            className="hidden-file-input"
          />
          <div className="upload-icon-circle">
            <UploadCloud size={28} className="upload-cloud-icon" />
          </div>
          <span className="upload-main-text">Upload product image</span>
          <span className="upload-sub-text">JPG, PNG up to 5MB</span>
        </div>
      )}

      {/* Asset Quick Pick Bar */}
      {!previewUrl && (
        <div className="asset-quick-pick">
          <span className="quick-pick-label">Or select from assets:</span>
          <div className="quick-pick-thumbnails">
            {SAMPLE_ASSETS.map((asset, idx) => (
              <img
                key={idx}
                src={asset.src}
                alt={asset.label}
                title={`Use ${asset.label} image`}
                className="quick-pick-img"
                onClick={() => onImageSelect && onImageSelect(asset.src)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductImageUpload;
