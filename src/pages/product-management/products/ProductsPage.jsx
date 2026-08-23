import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

// Global UI Components
import Pagination from '../../../components/ui/Pagination/Pagination';
import './ProductsPage.css';

// Baseline products dataset matching reference screenshot
const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Vegetables Mix',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '250 kg',
    totalValue: '6,250',
    status: 'In Stock',
    updatedDate: '12 May 2024',
    updatedTime: '10:20 AM',
    image: vegMixImg
  },
  {
    id: 'prod-2',
    name: 'Apples',
    category: 'Fruits',
    unit: 'kg',
    quantity: '180 kg',
    totalValue: '9,000',
    status: 'In Stock',
    updatedDate: '12 May 2024',
    updatedTime: '09:15 AM',
    image: fruitsMixImg
  },
  {
    id: 'prod-3',
    name: 'Rice (Raw)',
    category: 'Grains',
    unit: 'kg',
    quantity: '500 kg',
    totalValue: '15,000',
    status: 'In Stock',
    updatedDate: '11 May 2024',
    updatedTime: '07:45 PM',
    image: grainsImg
  },
  {
    id: 'prod-4',
    name: 'Toor Dal',
    category: 'Pulses',
    unit: 'kg',
    quantity: '120 kg',
    totalValue: '7,200',
    status: 'Low Stock',
    updatedDate: '11 May 2024',
    updatedTime: '05:30 PM',
    image: pulsesImg
  },
  {
    id: 'prod-5',
    name: 'Potatoes',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '80 kg',
    totalValue: '1,600',
    status: 'Out of Stock',
    updatedDate: '10 May 2024',
    updatedTime: '04:25 PM',
    image: potatoesImg
  },
  {
    id: 'prod-6',
    name: 'Carrots',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '320 kg',
    totalValue: '11,200',
    status: 'In Stock',
    updatedDate: '10 May 2024',
    updatedTime: '02:10 PM',
    image: carrotsImg
  },
  {
    id: 'prod-7',
    name: 'Cauliflower',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '140 kg',
    totalValue: '3,920',
    status: 'Low Stock',
    updatedDate: '10 May 2024',
    updatedTime: '11:45 AM',
    image: cauliflowerImg
  },
  {
    id: 'prod-8',
    name: 'Green Beans',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '210 kg',
    totalValue: '9,450',
    status: 'In Stock',
    updatedDate: '09 May 2024',
    updatedTime: '04:00 PM',
    image: greenBeansImg
  },
  {
    id: 'prod-9',
    name: 'Bell Peppers',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '95 kg',
    totalValue: '5,225',
    status: 'Low Stock',
    updatedDate: '09 May 2024',
    updatedTime: '01:15 PM',
    image: peppersImg
  },
  {
    id: 'prod-10',
    name: 'Leafy Spinach',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '160 kg',
    totalValue: '3,840',
    status: 'In Stock',
    updatedDate: '09 May 2024',
    updatedTime: '09:30 AM',
    image: spinachImg
  },
  {
    id: 'prod-11',
    name: 'Red Onions',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '450 kg',
    totalValue: '11,700',
    status: 'In Stock',
    updatedDate: '08 May 2024',
    updatedTime: '05:20 PM',
    image: onionsImg
  },
  {
    id: 'prod-12',
    name: 'Finger Millets (Ragi)',
    category: 'Millets',
    unit: 'kg',
    quantity: '280 kg',
    totalValue: '14,560',
    status: 'In Stock',
    updatedDate: '08 May 2024',
    updatedTime: '02:00 PM',
    image: milletsImg
  }
];

const ProductsPage = () => {
  const navigate = useNavigate();

  // Primary State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal States
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState('view');

  // Filter Criteria
  const [filterCriteria, setFilterCriteria] = useState({
    category: 'All',
    status: 'All',
    priceRange: 'All'
  });

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  // Desktop Table Pagination (5 per page matches "Showing 1 to 5 of 342 items" in screenshot!)
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
      setMobileVisibleCount((prev) => Math.min(prev + 4, filteredRequestsLength));
      setIsLoadingMoreMobile(false);
    }, 400);
  };

  const filteredRequestsLength = filteredProducts.length;

  // Handlers
  const handleAddStock = () => {
    navigate('/product-management/add');
  };

  const handleViewDetails = (item) => {
    setSelectedProduct(item);
    setModalMode('view');
    setIsDetailsModalOpen(true);
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
    setProducts((prev) => prev.filter((p) => p.id !== item.id));
    showToast(`Product "${item.name}" removed from inventory.`);
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

      {/* 8. Product Details & Edit Modal */}
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
    </div>
  );
};

export default ProductsPage;
