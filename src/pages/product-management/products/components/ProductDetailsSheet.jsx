import React, { useState, useEffect, useRef } from 'react';
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
 * Responsive Mobile Bottom Sheet & Desktop Popup Modal for Product Details with fluid gestures
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

  const [isExpanded, setIsExpanded] = useState(false);
  const touchStartY = useRef(0);
  const lastScrollTop = useRef(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsExpanded(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleScroll = (e) => {
    const currentScrollTop = e.target.scrollTop;
    if (currentScrollTop > 15 && !isExpanded) {
      setIsExpanded(true);
    } else if (currentScrollTop <= 2 && isExpanded && currentScrollTop < lastScrollTop.current) {
      setIsExpanded(false);
    }
    lastScrollTop.current = currentScrollTop;
  };

  const handleWheel = (e) => {
    const bodyScrollTop = bodyRef.current ? bodyRef.current.scrollTop : 0;
    if (e.deltaY > 0 && !isExpanded) {
      setIsExpanded(true);
    } else if (e.deltaY < 0 && bodyScrollTop <= 2 && isExpanded) {
      setIsExpanded(false);
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - touchStartY.current;
    const bodyScrollTop = bodyRef.current ? bodyRef.current.scrollTop : 0;

    if (deltaY < -20 && !isExpanded) {
      setIsExpanded(true);
    } else if (deltaY > 30 && bodyScrollTop <= 5) {
      if (isExpanded) {
        setIsExpanded(false);
        touchStartY.current = touchY;
      } else {
        if (onClose) onClose();
      }
    }
  };

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
        className={`product-details-sheet-container ${isExpanded ? 'expanded' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onWheel={handleWheel}
      >
        {/* Sheet Drag Handle / Top Header Bar */}
        <div
          className="sheet-top-drag-header"
          onClick={() => setIsExpanded((prev) => !prev)}
          role="button"
          aria-label="Toggle sheet height"
        >
          <div className="sheet-drag-indicator" />
        </div>

        {/* Scrollable Sheet Body */}
        <div
          className="sheet-scrollable-body"
          ref={bodyRef}
          onScroll={handleScroll}
        >
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
        </div>

        {/* Fixed Bottom Actions */}
        <ProductDetailsActions
          onEditProduct={handleEditClick}
          onDeleteProduct={handleDeleteClick}
          onClose={onClose}
        />
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
