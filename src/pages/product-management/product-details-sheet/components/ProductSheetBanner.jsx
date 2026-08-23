import React from 'react';
import { Tag, Sparkles } from 'lucide-react';
import StatusBadge from '../../../../components/ui/StatusBadge/StatusBadge';
import './ProductSheetBanner.css';

const ProductSheetBanner = ({ product }) => {
  if (!product) return null;

  return (
    <div className="product-sheet-banner">
      <div className="sheet-banner-img-wrap">
        {product.image ? (
          <img src={product.image} alt={product.name} className="sheet-banner-img" />
        ) : (
          <div className="sheet-banner-placeholder">
            <Tag size={32} />
          </div>
        )}
      </div>

      <div className="sheet-banner-info">
        <div className="sheet-banner-title-row">
          <h3 className="sheet-banner-title">{product.name}</h3>
          <StatusBadge status={product.status || 'Active'} size="sm" />
        </div>
        <p className="sheet-banner-category">{product.category} • {product.unit || '1 kg'}</p>
        <div className="sheet-banner-price-row">
          <span className="sheet-banner-price">{product.formattedPrice || product.price}</span>
          {product.organic && (
            <span className="organic-badge">
              <Sparkles size={11} /> Organic
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSheetBanner;
