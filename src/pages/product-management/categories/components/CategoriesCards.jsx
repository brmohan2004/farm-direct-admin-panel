import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { CategoryIconAvatar } from '../../../../components/ui';
import './CategoriesCards.css';

/**
 * CategoriesCards Component
 * Mobile-focused stacked card view for category list matching Image 1.
 */
const CategoriesCards = ({ categories = [], onEditCategory, onDeleteCategory }) => {
  if (categories.length === 0) {
    return (
      <div className="categories-cards-empty">
        <p>No categories found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="categories-cards-container">
      {categories.map((category) => (
        <div key={category.id} className="category-card">
          <div className="category-card-left">
            <CategoryIconAvatar 
              categoryName={category.name} 
              size="md" 
            />
            <div className="category-card-meta">
              <h3 className="category-card-title">{category.name}</h3>
              <p className="category-card-count">{category.totalProducts} Items</p>
            </div>
          </div>

          <div className="category-card-actions">
            <button
              type="button"
              className="category-action-btn category-action-edit"
              onClick={() => onEditCategory(category)}
              title={`Edit ${category.name}`}
              aria-label={`Edit ${category.name}`}
            >
              <Pencil size={16} />
            </button>
            <button
              type="button"
              className="category-action-btn category-action-delete"
              onClick={() => onDeleteCategory(category)}
              title={`Delete ${category.name}`}
              aria-label={`Delete ${category.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesCards;
