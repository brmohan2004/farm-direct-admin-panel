import React, { useState, useRef, useEffect } from 'react';
import { Pencil, MoreVertical, Eye, Trash2, RefreshCw } from 'lucide-react';
import StatusBadge from '../../../../components/ui/StatusBadge/StatusBadge';
import './ProductsTable.css';

/**
 * ProductsTable Component
 * Table layout for Desktop & Tablet view matching Image 1 design
 */
const ProductsTable = ({
  products = [],
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
      <div className="products-table-card empty-state">
        <p className="empty-title">No inventory items found</p>
        <p className="empty-subtitle">Try adjusting your search term or category filters.</p>
      </div>
    );
  }

  return (
    <div className="products-table-card">
      <div className="products-table-responsive-wrapper">
        <table className="products-inventory-table">
          <thead>
            <tr>
              <th className="col-product">Product</th>
              <th className="col-category">Category</th>
              <th className="col-unit">Unit</th>
              <th className="col-quantity">Quantity</th>
              <th className="col-value">Value</th>
              <th className="col-status">Status</th>
              <th className="col-date">Last Updated</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="products-table-row">
                {/* Product Thumbnail & Title */}
                <td className="col-product">
                  <div className="product-title-cell">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-table-thumbnail"
                    />
                    <span className="product-table-name">{item.name}</span>
                  </div>
                </td>

                {/* Category */}
                <td className="col-category">
                  <span className="category-green-lbl">{item.category}</span>
                </td>

                {/* Unit */}
                <td className="col-unit">
                  <span className="unit-text">{item.unit || 'kg'}</span>
                </td>

                {/* Quantity */}
                <td className="col-quantity">
                  <span className="quantity-val">{item.quantity}</span>
                </td>

                {/* Value */}
                <td className="col-value">
                  <span className="value-green-val">₹{item.totalValue}</span>
                </td>

                {/* Status Badge */}
                <td className="col-status">
                  <StatusBadge status={item.status} showDot={false} size="md" />
                </td>

                {/* Last Updated */}
                <td className="col-date">
                  <div className="date-cell">
                    <span className="date-main">{item.updatedDate}</span>
                    <span className="date-sub">{item.updatedTime}</span>
                  </div>
                </td>

                {/* Actions: Edit icon button + ⋮ menu */}
                <td className="col-actions">
                  <div className="actions-cell">
                    <button
                      type="button"
                      className="icon-action-btn edit-btn"
                      onClick={() => onEditProduct && onEditProduct(item)}
                      aria-label="Edit Product"
                      title="Edit Product"
                    >
                      <Pencil size={15} />
                    </button>

                    <div className="dropdown-menu-wrapper">
                      <button
                        type="button"
                        className="icon-action-btn menu-btn"
                        onClick={(e) => toggleMenu(item.id, e)}
                        aria-label="More Options"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {activeMenuId === item.id && (
                        <div className="actions-dropdown-menu" ref={menuRef}>
                          <button
                            type="button"
                            className="dropdown-item"
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                            onClick={() => {
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
