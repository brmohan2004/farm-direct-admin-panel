import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

// Asset Images from src/assets
import vegMixImg from '../../../assets/cat_vegetables.png';
import fruitsMixImg from '../../../assets/cat_fruits.png';
import grainsImg from '../../../assets/cat_grains_pulses.png';
import pulsesImg from '../../../assets/cat_oils_condiments.png';
import potatoesImg from '../../../assets/prod_potatoes.png';
import carrotsImg from '../../../assets/prod_carrots.png';
import cauliflowerImg from '../../../assets/prod_cauliflower.png';
import greenBeansImg from '../../../assets/prod_green_beans.png';
import peppersImg from '../../../assets/prod_peppers.png';
import spinachImg from '../../../assets/prod_spinach.png';
import onionsImg from '../../../assets/prod_onions.png';
import milletsImg from '../../../assets/cat_herbs_spices.png';

// Modular Page Components
import {
  ProductsHeader,
  ProductsStatCards,
  ProductsFilterBar,
  ProductsCategoryPills,
  ProductsTable,
  ProductsCards,
  ProductsFilterModal,
  ProductDetailsModal
} from './components';
import { ProductDetailsSheet } from '../product-details-sheet';

// Global UI Components
import Modal from '../../../components/ui/Modal/Modal';
import Pagination from '../../../components/ui/Pagination/Pagination';
import './ProductsPage.css';

// Baseline products dataset matching reference screenshot
const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    productId: '#PROD12345',
    name: 'Vegetables Mix',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '250 kg',
    reorderLevel: '50 kg',
    purchasePrice: '25',
    sellingPrice: '40',
    totalValue: '6,250',
    status: 'In Stock',
    createdDate: '10 May 2024, 09:15 AM',
    updatedDate: '12 May 2024',
    updatedTime: '10:20 AM',
    addedBy: 'Admin (Super Admin)',
    description: 'A fresh mix of handpicked seasonal vegetables.',
    image: vegMixImg
  },
  {
    id: 'prod-2',
    productId: '#PROD12346',
    name: 'Apples',
    category: 'Fruits',
    unit: 'kg',
    quantity: '180 kg',
    reorderLevel: '40 kg',
    purchasePrice: '35',
    sellingPrice: '50',
    totalValue: '9,000',
    status: 'In Stock',
    createdDate: '11 May 2024, 08:30 AM',
    updatedDate: '12 May 2024',
    updatedTime: '09:15 AM',
    addedBy: 'Admin (Super Admin)',
    description: 'Fresh crisp red apples direct from regional orchards.',
    image: fruitsMixImg
  },
  {
    id: 'prod-3',
    productId: '#PROD12347',
    name: 'Rice (Raw)',
    category: 'Grains',
    unit: 'kg',
    quantity: '500 kg',
    reorderLevel: '100 kg',
    purchasePrice: '22',
    sellingPrice: '30',
    totalValue: '15,000',
    status: 'In Stock',
    createdDate: '09 May 2024, 02:15 PM',
    updatedDate: '11 May 2024',
    updatedTime: '07:45 PM',
    addedBy: 'Admin (Super Admin)',
    description: 'Premium quality polished raw rice grains.',
    image: grainsImg
  },
  {
    id: 'prod-4',
    productId: '#PROD12348',
    name: 'Toor Dal',
    category: 'Pulses',
    unit: 'kg',
    quantity: '120 kg',
    reorderLevel: '150 kg',
    purchasePrice: '50',
    sellingPrice: '60',
    totalValue: '7,200',
    status: 'Low Stock',
    createdDate: '08 May 2024, 11:00 AM',
    updatedDate: '11 May 2024',
    updatedTime: '05:30 PM',
    addedBy: 'Admin (Super Admin)',
    description: 'High-protein unpolished yellow pigeon peas.',
    image: pulsesImg
  },
  {
    id: 'prod-5',
    productId: '#PROD12349',
    name: 'Potatoes',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '80 kg',
    reorderLevel: '100 kg',
    purchasePrice: '15',
    sellingPrice: '20',
    totalValue: '1,600',
    status: 'Out of Stock',
    createdDate: '07 May 2024, 04:00 PM',
    updatedDate: '10 May 2024',
    updatedTime: '04:25 PM',
    addedBy: 'Admin (Super Admin)',
    description: 'Farm-fresh organic potatoes harvested locally.',
    image: potatoesImg
  },
  {
    id: 'prod-6',
    productId: '#PROD12350',
    name: 'Carrots',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '320 kg',
    reorderLevel: '60 kg',
    purchasePrice: '28',
    sellingPrice: '35',
    totalValue: '11,200',
    status: 'In Stock',
    createdDate: '06 May 2024, 01:20 PM',
    updatedDate: '10 May 2024',
    updatedTime: '02:10 PM',
    addedBy: 'Admin (Super Admin)',
    description: 'Sweet and crunchy orange carrots.',
    image: carrotsImg
  },
  {
    id: 'prod-7',
    productId: '#PROD12351',
    name: 'Cauliflower',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '140 kg',
    reorderLevel: '150 kg',
    purchasePrice: '20',
    sellingPrice: '28',
    totalValue: '3,920',
    status: 'Low Stock',
    createdDate: '05 May 2024, 10:45 AM',
    updatedDate: '10 May 2024',
    updatedTime: '11:45 AM',
    addedBy: 'Admin (Super Admin)',
    description: 'Fresh white cauliflower heads.',
    image: cauliflowerImg
  },
  {
    id: 'prod-8',
    productId: '#PROD12352',
    name: 'Green Beans',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '210 kg',
    reorderLevel: '50 kg',
    purchasePrice: '35',
    sellingPrice: '45',
    totalValue: '9,450',
    status: 'In Stock',
    createdDate: '04 May 2024, 03:30 PM',
    updatedDate: '09 May 2024',
    updatedTime: '04:00 PM',
    addedBy: 'Admin (Super Admin)',
    description: 'Tender French green beans harvested daily.',
    image: greenBeansImg
  },
  {
    id: 'prod-9',
    productId: '#PROD12353',
    name: 'Bell Peppers',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '95 kg',
    reorderLevel: '100 kg',
    purchasePrice: '45',
    sellingPrice: '55',
    totalValue: '5,225',
    status: 'Low Stock',
    createdDate: '03 May 2024, 09:10 AM',
    updatedDate: '09 May 2024',
    updatedTime: '01:15 PM',
    addedBy: 'Admin (Super Admin)',
    description: 'Vibrant green capsicum bell peppers.',
    image: peppersImg
  },
  {
    id: 'prod-10',
    productId: '#PROD12354',
    name: 'Leafy Spinach',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '160 kg',
    reorderLevel: '40 kg',
    purchasePrice: '18',
    sellingPrice: '24',
    totalValue: '3,840',
    status: 'In Stock',
    createdDate: '02 May 2024, 08:00 AM',
    updatedDate: '09 May 2024',
    updatedTime: '09:30 AM',
    addedBy: 'Admin (Super Admin)',
    description: 'Fresh organic leafy palak spinach bunches.',
    image: spinachImg
  },
  {
    id: 'prod-11',
    productId: '#PROD12355',
    name: 'Red Onions',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '450 kg',
    reorderLevel: '80 kg',
    purchasePrice: '20',
    sellingPrice: '26',
    totalValue: '11,700',
    status: 'In Stock',
    createdDate: '01 May 2024, 02:00 PM',
    updatedDate: '08 May 2024',
    updatedTime: '05:20 PM',
    addedBy: 'Admin (Super Admin)',
    description: 'High quality dried red onions.',
    image: onionsImg
  },
  {
    id: 'prod-12',
    productId: '#PROD12356',
    name: 'Finger Millets (Ragi)',
    category: 'Millets',
    unit: 'kg',
    quantity: '280 kg',
    reorderLevel: '50 kg',
    purchasePrice: '42',
    sellingPrice: '52',
    totalValue: '14,560',
    status: 'In Stock',
    createdDate: '30 Apr 2024, 11:30 AM',
    updatedDate: '08 May 2024',
    updatedTime: '02:00 PM',
    addedBy: 'Admin (Super Admin)',
    description: 'Nutritious organic finger millet grains.',
    image: milletsImg
  }
];

const ProductsPage = () => {
  const navigate = useNavigate();

  // Primary State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFabVisible, setIsFabVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 40) {
        setIsFabVisible(false);
      } else {
        setIsFabVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Modal & Sheet States
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteTargetProduct, setDeleteTargetProduct] = useState(null);

  // Filter Criteria
  const [filterCriteria, setFilterCriteria] = useState({
    category: 'All',
    status: 'All',
    priceRange: 'All'
  });

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  // Desktop Table Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Mobile Infinite Scroll State
  const [mobileVisibleCount, setMobileVisibleCount] = useState(4);
  const [isLoadingMoreMobile, setIsLoadingMoreMobile] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Static/Dynamic Stats Summary
  const stats = useMemo(() => {
    return {
      totalItems: 342,
      totalQuantity: '1,245',
      totalValue: '₹8,45,230',
      lowStockItems: 24
    };
  }, []);

  // Filtered Products computation
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // 1. Category Pill / Dropdown Filter
      if (activeCategory !== 'All' && activeCategory !== 'All Categories' && item.category !== activeCategory) {
        return false;
      }

      // 2. Search Term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesCat) return false;
      }

      // 3. Modal Filters
      if (filterCriteria.category !== 'All' && item.category !== filterCriteria.category) {
        return false;
      }
      if (filterCriteria.status !== 'All' && item.status !== filterCriteria.status) {
        return false;
      }
      if (filterCriteria.priceRange !== 'All') {
        const val = parseFloat((item.totalValue || '0').replace(/,/g, '')) || 0;
        if (filterCriteria.priceRange === 'under5000' && val >= 5000) return false;
        if (filterCriteria.priceRange === '5000to10000' && (val < 5000 || val > 10000)) return false;
        if (filterCriteria.priceRange === 'above10000' && val <= 10000) return false;
      }

      return true;
    });
  }, [products, activeCategory, searchTerm, filterCriteria]);

  // Reset pagination on filter changes
  useEffect(() => {
    setCurrentPage(1);
    setMobileVisibleCount(4);
  }, [activeCategory, searchTerm, filterCriteria]);

  // Desktop Sliced Items
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(342 / itemsPerPage) || 1;

  // Mobile Sliced Items
  const mobileProducts = useMemo(() => {
    return filteredProducts.slice(0, mobileVisibleCount);
  }, [filteredProducts, mobileVisibleCount]);

  const hasMoreMobile = mobileVisibleCount < filteredProducts.length;

  const handleLoadMoreMobile = () => {
    if (isLoadingMoreMobile || !hasMoreMobile) return;
    setIsLoadingMoreMobile(true);
    setTimeout(() => {
      setMobileVisibleCount((prev) => Math.min(prev + 4, filteredProducts.length));
      setIsLoadingMoreMobile(false);
    }, 400);
  };

  // Handlers
  const handleAddStock = () => {
    navigate('/product-management/add');
  };

  const handleViewDetails = (item) => {
    setSelectedProduct(item);
    setIsDetailsSheetOpen(true);
  };

  const handleEditProduct = (item) => {
    setSelectedProduct(item);
    setModalMode('edit');
    setIsDetailsModalOpen(true);
  };

  const handleUpdateStock = (item) => {
    setSelectedProduct(item);
    setModalMode('stock');
    setIsDetailsModalOpen(true);
  };

  const handleDeleteProduct = (item) => {
    setDeleteTargetProduct(item);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteProduct = () => {
    if (!deleteTargetProduct) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTargetProduct.id));
    showToast(`Product "${deleteTargetProduct.name}" removed from inventory.`);
    setIsDeleteConfirmOpen(false);
    setDeleteTargetProduct(null);
  };

  const handleSaveProduct = (updatedItem) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedItem.id ? updatedItem : p))
    );
    showToast(`Inventory item "${updatedItem.name}" updated successfully!`);
  };

  const hasActiveFilters = Boolean(
    filterCriteria.category !== 'All' || filterCriteria.status !== 'All' || filterCriteria.priceRange !== 'All'
  );

  return (
    <div className="products-page-container">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="products-toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Page Header */}
      <ProductsHeader
        title="Inventory"
        subtitle="Manage and track all available stock."
        onAddStock={handleAddStock}
      />

      {/* 2. Top Summary Stat Cards */}
      <ProductsStatCards
        stats={stats}
        onStatClick={(statId) => {
          if (statId === 'Low Stock') {
            setFilterCriteria((prev) => ({ ...prev, status: 'Low Stock' }));
          } else {
            setFilterCriteria((prev) => ({ ...prev, status: 'All' }));
          }
        }}
      />

      {/* 3. Control & Filter Bar */}
      <ProductsFilterBar
        searchTerm={searchTerm}
        onSearchChange={(val) => setSearchTerm(val)}
        onSearchClear={() => setSearchTerm('')}
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
        selectedCategory={activeCategory}
        onCategorySelectChange={(cat) => setActiveCategory(cat)}
        hasActiveFilters={hasActiveFilters}
      />

      {/* 4. Category Filter Pills Row */}
      <ProductsCategoryPills
        activeCategory={activeCategory}
        onCategoryChange={(cat) => setActiveCategory(cat)}
      />

      {/* 5. Main Content Area */}
      {/* Desktop & Tablet Table View */}
      <div className="products-desktop-tablet-view">
        <ProductsTable
          products={paginatedProducts}
          onEditProduct={handleEditProduct}
          onViewDetails={handleViewDetails}
          onDeleteProduct={handleDeleteProduct}
          onUpdateStock={handleUpdateStock}
        />
      </div>

      {/* Mobile Stacked Card View */}
      <div className="products-mobile-cards-view">
        <ProductsCards
          products={mobileProducts}
          totalCount={filteredProducts.length}
          hasMore={hasMoreMobile}
          isLoading={isLoadingMoreMobile}
          onLoadMore={handleLoadMoreMobile}
          onEditProduct={handleEditProduct}
          onViewDetails={handleViewDetails}
          onDeleteProduct={handleDeleteProduct}
          onUpdateStock={handleUpdateStock}
        />
      </div>

      {/* 6. Desktop Pagination Footer */}
      <div className="products-desktop-pagination">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={342}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(num) => {
            setItemsPerPage(num);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* 7. Filter Modal */}
      <ProductsFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        currentFilters={filterCriteria}
        onApplyFilters={(filters) => setFilterCriteria(filters)}
        onResetFilters={() => setFilterCriteria({ category: 'All', status: 'All', priceRange: 'All' })}
      />

      {/* 8. Product Details Sheet (Mobile Slide-Up Sheet & Desktop Popup) */}
      <ProductDetailsSheet
        product={selectedProduct}
        isOpen={isDetailsSheetOpen}
        onClose={() => {
          setIsDetailsSheetOpen(false);
          setSelectedProduct(null);
        }}
        onEditProduct={(itemToEdit) => {
          setIsDetailsSheetOpen(false);
          setSelectedProduct(itemToEdit || selectedProduct);
          setModalMode('edit');
          setIsDetailsModalOpen(true);
        }}
        onDeleteProduct={handleDeleteProduct}
      />

      {/* 9. Quick Edit Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isDetailsModalOpen}
        mode={modalMode}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedProduct(null);
        }}
        onSaveProduct={handleSaveProduct}
      />

      {/* 10. Mobile Floating Add Stock FAB */}
      <button
        type="button"
        className={`products-floating-add-fab ${isFabVisible ? 'fab-visible' : 'fab-hidden'}`}
        onClick={handleAddStock}
        aria-label="Add Stock"
      >
        <Plus size={22} />
      </button>

      {/* 11. Delete Warning Popup Modal */}
      {isDeleteConfirmOpen && (
        <Modal
          isOpen={isDeleteConfirmOpen}
          onClose={() => {
            setIsDeleteConfirmOpen(false);
            setDeleteTargetProduct(null);
          }}
          isPopup={true}
          title="Delete Inventory Item"
          subtitle={`Are you sure you want to delete "${deleteTargetProduct?.name}"?`}
          maxWidth="440px"
        >
          <div className="delete-modal-content">
            <p className="delete-modal-warning">
              Warning: This action will permanently remove <strong>{deleteTargetProduct?.name}</strong> from all active inventory views and stock records.
            </p>
            <div className="delete-modal-actions">
              <button
                type="button"
                className="delete-cancel-btn"
                onClick={() => {
                  setIsDeleteConfirmOpen(false);
                  setDeleteTargetProduct(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="delete-confirm-btn"
                onClick={confirmDeleteProduct}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductsPage;
