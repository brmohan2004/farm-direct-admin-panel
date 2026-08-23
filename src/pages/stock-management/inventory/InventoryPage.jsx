/**
 * InventoryPage Component
 * 
 * Re-exports ProductsPage to serve Inventory Stock Management
 */

import ProductsPage from '../../product-management/products/ProductsPage';

const InventoryPage = (props) => {
  return <ProductsPage {...props} />;
};

export default InventoryPage;
