import React, { useState } from 'react';
import { X } from 'lucide-react';
import {
  ProductDetailsHeader,
  ProductDetailsBanner,
  ProductDetailsMetrics,
  ProductInfoCard,
  ProductDescriptionCard,
  ProductStockHistoryCard,
  ProductDetailsActions
} from '../../product-details/components';
import Modal from '../../../../components/ui/Modal/Modal';
import ProductDetailsModal from './ProductDetailsModal';
import './ProductDetailsSheet.css';

/**
 * ProductDetailsSheet Component
 * Responsive Mobile Bottom Sheet & Desktop Popup Modal for Product Details
 */
const ProductDetailsSheet = ({
  product,
  isOpen = false,
  onClose,
  onEditProduct,
  onDeleteProduct
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  if (!isOpen || !product) return null;

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    if (onDeleteProduct) onDeleteProduct(product);
    if (onClose) onClose();
  };

  const handleSaveProduct = (updatedProduct) => {
    setIsEditModalOpen(false);
    if (onEditProduct) onEditProduct(updatedProduct);
  };

  return (
    <div className="product-details-sheet-backdrop" onClick={onClose}>
      <div
        className="product-details-sheet-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sheet Drag Handle / Top Header Bar */}
        <div className="sheet-top-drag-header">
          <div className="sheet-drag-indicator" />
          <button
            type="button"
            className="sheet-close-btn"
            onClick={onClose}
            aria-label="Close Product Details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Sheet Body */}
        <div className="sheet-scrollable-body">
          {/* Header */}
          <ProductDetailsHeader
            title="Product Details"
            subtitle="View and manage product information"
            onBack={onClose}
            onEditProduct={handleEditClick}
            onDeleteProduct={handleDeleteClick}
          />

          {/* Banner */}
          <ProductDetailsBanner
            product={product}
            onMoreOptions={handleEditClick}
          />

          {/* 4 Metric Cards */}
          <ProductDetailsMetrics product={product} />

          {/* Details Content Layout */}
          <div className="product-details-content-grid">
            <div className="details-grid-left">
              <ProductInfoCard product={product} />
              <ProductDescriptionCard description={product.description} />
            </div>

            <div className="details-grid-right">
              <ProductStockHistoryCard
                onViewAll={() => setIsHistoryModalOpen(true)}
              />
            </div>
          </div>

          {/* Bottom Actions */}
          <ProductDetailsActions
            onEditProduct={handleEditClick}
            onDeleteProduct={handleDeleteClick}
          />
        </div>
      </div>

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <ProductDetailsModal
          product={product}
          isOpen={isEditModalOpen}
          mode="edit"
          onClose={() => setIsEditModalOpen(false)}
          onSaveProduct={handleSaveProduct}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete Product"
          subtitle={`Are you sure you want to delete "${product.name}"?`}
          maxWidth="440px"
        >
          <div className="delete-modal-content">
            <p className="delete-modal-warning">
              This action will remove the product from all active inventory views and stock records.
            </p>
            <div className="delete-modal-actions">
              <button
                type="button"
                className="delete-cancel-btn"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="delete-confirm-btn"
                onClick={handleDeleteConfirm}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Complete Stock History Modal */}
      {isHistoryModalOpen && (
        <Modal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          title="Complete Stock History"
          subtitle={`Stock transaction log for ${product.name}`}
          maxWidth="540px"
        >
          <ProductStockHistoryCard onViewAll={() => {}} />
        </Modal>
      )}
    </div>
  );
};

export default ProductDetailsSheet;
