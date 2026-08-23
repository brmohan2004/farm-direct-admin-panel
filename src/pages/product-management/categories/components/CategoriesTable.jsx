import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { CategoryIconAvatar, StatusBadge, Pagination } from '../../../../components/ui';
import './CategoriesTable.css';

/**
 * CategoriesTable Component
 * Desktop & Tablet tabular view for product categories matching Image 2.
 */
const CategoriesTable = ({
  categories = [],
  currentPage = 1,
  totalPages = 1,
  totalItems = 8,
  itemsPerPage = 10,
  onPageChange,
  onEditCategory,
  onDeleteCategory
}) => {
  return (
    <div className="categories-table-wrapper">
      <div className="categories-table-container">
        <table className="categories-table">
          <thead>
            <tr>
              <th className="th-category">Category</th>
              <th className="th-description">Description</th>
              <th className="th-products">Total Products</th>
              <th className="th-status">Status</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="categories-table-empty">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="categories-table-row">
                  <td className="td-category">
                    <div className="category-cell">
                      <CategoryIconAvatar 
                        categoryName={category.name} 
                        size="md" 
                      />
                      <span className="category-name">{category.name}</span>
                    </div>
                  </td>
                  <td className="td-description">{category.description}</td>
                  <td className="td-products">{category.totalProducts}</td>
                  <td className="td-status">
                    <StatusBadge status={category.status} showDot={false} />
                  </td>
                  <td className="td-actions">
                    <div className="table-actions-group">
                      <button
                        type="button"
                        className="table-action-btn table-action-edit"
                        onClick={() => onEditCategory(category)}
                        title={`Edit ${category.name}`}
                        aria-label={`Edit ${category.name}`}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        className="table-action-btn table-action-delete"
                        onClick={() => onDeleteCategory(category)}
                        title={`Delete ${category.name}`}
                        aria-label={`Delete ${category.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="categories-pagination-wrapper">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemLabel="categories"
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default CategoriesTable;
