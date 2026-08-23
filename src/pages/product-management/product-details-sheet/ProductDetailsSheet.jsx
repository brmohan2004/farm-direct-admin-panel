import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ProductSheetHeader,
  ProductSheetBanner,
  ProductSheetMetrics,
  ProductInfoCard,
  ProductDescriptionCard,
  ProductStockHistoryCard,
  ProductDetailsActions,
} from './components';
import Modal from '../../../components/ui/Modal/Modal';
import ProductDetailsModal from '../products/components/ProductDetailsModal';
import './ProductDetailsSheet.css';

/**
 * ProductDetailsSheet Component
 * Responsive Mobile Bottom Sheet & Desktop Popup Modal for Product Details with fluid gestures
 */
const ProductDetailsSheet = ({
  product: propProduct,
  isOpen = true,
  onClose,
  onEditProduct,
  onDeleteProduct
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const mockProduct = propProduct || {
    id: id || '1',
    name: 'Organic Tomatoes',
    category: 'Vegetables',
    price: 60,
    formattedPrice: '₹60',
    unit: '1 kg',
    stock: '450 kg',
    status: 'In Stock',
    organic: true,
    description: 'Fresh organic tomatoes harvested directly from local farms. Chemical-free and 100% natural.',
    totalSold: '1,240 kg',
    revenue: '₹74,400',
    rating: 4.8
  };

  const product = mockProduct;

  if (!isOpen || !product) return null;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

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
        handleClose();
      }
    }
  };

  const handleEditClick = () => {
    handleClose();
    if (onEditProduct) {
      onEditProduct(product);
    } else {
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteClick = () => {
    handleClose();
    if (onDeleteProduct) {
      onDeleteProduct(product);
    } else {
      setIsDeleteModalOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    if (onDeleteProduct) onDeleteProduct(product);
    handleClose();
  };

  const handleSaveProduct = (updatedProduct) => {
    setIsEditModalOpen(false);
    if (onEditProduct) onEditProduct(updatedProduct);
  };

  return (
    <div className="product-details-sheet-backdrop" onClick={handleClose}>
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
          <ProductSheetBanner
            product={product}
          />

          <ProductSheetMetrics product={product} />

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
          onClose={handleClose}
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
          isPopup={true}
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
