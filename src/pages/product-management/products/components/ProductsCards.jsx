import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Pencil, Trash2, RefreshCw } from 'lucide-react';
import StatusBadge from '../../../../components/ui/StatusBadge/StatusBadge';
import './ProductsCards.css';

/**
 * ProductsCards Component
 * Mobile stacked card display matching Image 2 design
 */
const ProductsCards = ({
  products = [],
  totalCount = 0,
  hasMore = false,
  isLoading = false,
  onLoadMore,
  onEditProduct,
  onViewDetails,
  onDeleteProduct,
  onUpdateStock
}) => {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  if (products.length === 0) {
    return (
      <div className="products-card-mobile-empty">
        <p className="empty-title">No inventory items found</p>
        <p className="empty-subtitle">Try adjusting your search query or category filter.</p>
      </div>
    );
  }

  return (
    <div className="products-cards-mobile-list">
      {products.map((item) => (
        <div
          key={item.id}
          className="product-mobile-card"
          onClick={() => onViewDetails && onViewDetails(item)}
          role="button"
          tabIndex={0}
        >
          {/* Card Image Thumbnail */}
          <img
            src={item.image}
            alt={item.name}
            className="product-mobile-img"
          />

          {/* Center Info */}
          <div className="product-mobile-center">
            <h3 className="product-mobile-title">{item.name}</h3>
            <span className="product-mobile-cat">Category: <strong>{item.category}</strong></span>
            <span className="product-mobile-unit">Unit: <strong>{item.unit || 'kg'}</strong></span>
          </div>

          {/* Right Metrics & Menu & Status */}
          <div className="product-mobile-right">
            <div className="product-mobile-top-menu">
              <button
                type="button"
                className="mobile-dots-btn"
                onClick={(e) => toggleMenu(item.id, e)}
                aria-label="Options"
              >
                <MoreVertical size={18} />
              </button>

              {activeMenuId === item.id && (
                <div className="mobile-actions-dropdown" ref={menuRef}>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(null);
                      onViewDetails && onViewDetails(item);
                    }}
                  >
                    <Eye size={15} />
                    <span>View Details</span>
                  </button>

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(null);
                      onEditProduct && onEditProduct(item);
                    }}
                  >
                    <Pencil size={15} />
                    <span>Edit Product</span>
                  </button>

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(null);
                      onUpdateStock && onUpdateStock(item);
                    }}
                  >
                    <RefreshCw size={15} />
                    <span>Update Stock</span>
                  </button>

                  <button
                    type="button"
                    className="dropdown-item delete-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(null);
                      onDeleteProduct && onDeleteProduct(item);
                    }}
                  >
                    <Trash2 size={15} />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>

            <div className="product-mobile-metric">
              <span className="metric-lbl">Quantity</span>
              <span className="metric-val">{item.quantity}</span>
            </div>

            <div className="product-mobile-metric">
              <span className="metric-lbl">Value</span>
              <span className="metric-val-green">₹{item.totalValue}</span>
            </div>

            <div className="product-mobile-status">
              <StatusBadge status={item.status} showDot={false} size="sm" />
            </div>
          </div>
        </div>
      ))}

      {/* Infinite Scroll / Load More Footer */}
      {hasMore && (
        <div className="mobile-load-more-wrapper">
          <button
            type="button"
            className="mobile-load-more-btn"
            onClick={onLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Loading more...' : `Load More (${totalCount - products.length} remaining)`}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsCards;
