/**
 * CategoriesPage Component
 * Main page for Product Categories management.
 * Supports mobile card view, desktop/tablet table view, search filtering, and CRUD modals.
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Plus } from 'lucide-react';
import {
  CategoriesHeader,
  CategoriesSearch,
  CategoriesCards,
  CategoriesTable,
  CategoryFormModal,
  CategoryDeleteModal
} from './components';
import './CategoriesPage.css';

const INITIAL_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Vegetables',
    description: 'Fresh and seasonal vegetables',
    totalProducts: 120,
    status: 'Active'
  },
  {
    id: 'cat-2',
    name: 'Fruits',
    description: 'Fresh fruits and berries',
    totalProducts: 85,
    status: 'Active'
  },
  {
    id: 'cat-3',
    name: 'Grains',
    description: 'Rice, wheat, millet and other grains',
    totalProducts: 60,
    status: 'Active'
  },
  {
    id: 'cat-4',
    name: 'Pulses',
    description: 'Lentils, beans, chickpeas and more',
    totalProducts: 45,
    status: 'Active'
  },
  {
    id: 'cat-5',
    name: 'Dairy',
    description: 'Milk, cheese, butter and more',
    totalProducts: 30,
    status: 'Active'
  },
  {
    id: 'cat-6',
    name: 'Spices',
    description: 'Herbs, masalas and spices',
    totalProducts: 40,
    status: 'Active'
  },
  {
    id: 'cat-7',
    name: 'Oils',
    description: 'Cooking oils and ghee',
    totalProducts: 25,
    status: 'Active'
  },
  {
    id: 'cat-8',
    name: 'Beverages',
    description: 'Juices, drinks and other beverages',
    totalProducts: 20,
    status: 'Active'
  }
];

const CategoriesPage = () => {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);

  // FAB Scroll state
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

  // Filtered categories
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const query = searchQuery.toLowerCase().trim();
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        (cat.description && cat.description.toLowerCase().includes(query))
    );
  }, [categories, searchQuery]);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setEditingCategory(category);
    setIsFormModalOpen(true);
  };

  const handleSaveCategory = (savedCategory) => {
    if (savedCategory.id) {
      // Update
      setCategories((prev) =>
        prev.map((c) => (c.id === savedCategory.id ? savedCategory : c))
      );
    } else {
      // Create new
      const newCategory = {
        ...savedCategory,
        id: `cat-${Date.now()}`
      };
      setCategories((prev) => [newCategory, ...prev]);
    }
  };

  const handleOpenDeleteModal = (category) => {
    setDeletingCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (idToDelete) => {
    setCategories((prev) => prev.filter((c) => c.id !== idToDelete));
  };

  return (
    <div className="categories-page-container">
      <CategoriesHeader onAddCategory={handleOpenAddModal} />
      
      <div className="categories-content-wrapper">
        <CategoriesSearch
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />

        {/* Desktop & Tablet Table View */}
        <div className="categories-desktop-view">
          <CategoriesTable
            categories={filteredCategories}
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCategories.length / itemsPerPage) || 1}
            totalItems={filteredCategories.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onEditCategory={handleOpenEditModal}
            onDeleteCategory={handleOpenDeleteModal}
          />
        </div>

        {/* Mobile Stacked Card View */}
        <div className="categories-mobile-view">
          <CategoriesCards
            categories={filteredCategories}
            onEditCategory={handleOpenEditModal}
            onDeleteCategory={handleOpenDeleteModal}
          />
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      <CategoryFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveCategory}
        category={editingCategory}
      />

      {/* Delete Confirmation Modal */}
      <CategoryDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        category={deletingCategory}
      />

      {/* Mobile Floating Add Category FAB */}
      <button
        type="button"
        className={`categories-floating-add-fab ${isFabVisible ? 'fab-visible' : 'fab-hidden'}`}
        onClick={handleOpenAddModal}
        aria-label="Add Category"
      >
        <Plus size={22} />
      </button>
    </div>
  );
};

export default CategoriesPage;
