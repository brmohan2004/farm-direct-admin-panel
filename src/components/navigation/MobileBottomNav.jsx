import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  Inbox, 
  Users, 
  Grid, 
  ShoppingCart, 
  UserPlus, 
  Package, 
  Layers, 
  Map,
  ChevronRight,
  X 
} from 'lucide-react';
import './MobileBottomNav.css';

const mainNavItems = [
  { label: 'Home', path: '/dashboard', icon: Home },
  { label: 'Transactions', path: '/payment-management/payments', icon: CreditCard },
  { label: 'Stock Inbox', path: '/stock-management/inbox', icon: Inbox, badge: 24 },
  { label: 'Consumers', path: '/consumer-management/consumers', icon: Users },
];

const moreNavItems = [
  { label: 'Orders', path: '/order-management/orders', icon: ShoppingCart, badge: 56 },
  { label: 'Farmer Requests', path: '/farmer-management/requests', icon: UserPlus, badge: 18 },
  { label: 'Products', path: '/product-management/products', icon: Package },
  { label: 'Categories', path: '/product-management/categories', icon: Layers },
];

const MobileBottomNav = () => {
  const [showMore, setShowMore] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/dashboard' || location.pathname === '/';

  if (location.pathname.includes('/settings') || location.pathname.includes('/notifications')) {
    return null;
  }

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 20 && currentScrollY > lastScrollY) {
        setIsScrolledDown(true);
      } else if (currentScrollY <= 20 || currentScrollY < lastScrollY - 10) {
        setIsScrolledDown(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMoreActive = moreNavItems.some(item => location.pathname.startsWith(item.path));

  return (
    <>
      {/* Floating View Farmers Banner Floating Above Mobile Navbar - ONLY on Home page */}
      {isHomePage && (
        <NavLink 
          to="/farmer-management/farmers" 
          className={`floating-view-farmers-btn ${isScrolledDown ? 'hidden' : ''}`}
        >
          <div className="floating-farmers-icon-circle">
            <Users size={18} />
          </div>
          <div className="floating-farmers-text">
            <span className="floating-farmers-title">View Farmers</span>
            <span className="floating-farmers-subtitle">View active farmers</span>
          </div>
          <div className="floating-farmers-arrow-circle">
            <ChevronRight size={15} />
          </div>
        </NavLink>
      )}

      <nav className="mobile-bottom-nav-root mobile-bottom-nav">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path) || (item.path === '/dashboard' && location.pathname === '/');
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="mobile-nav-icon-wrap">
                <Icon size={20} />
                {item.badge !== undefined && (
                  <span className="mobile-nav-badge">{item.badge}</span>
                )}
              </div>

              {isActive && (
                <span className="mobile-nav-label">{item.label}</span>
              )}
            </NavLink>
          );
        })}

        <button 
          className={`mobile-nav-item ${isMoreActive || showMore ? 'active' : ''}`}
          onClick={() => setShowMore(!showMore)}
        >
          <div className="mobile-nav-icon-wrap">
            <Grid size={20} />
          </div>
          {(isMoreActive || showMore) && (
            <span className="mobile-nav-label">More</span>
          )}
        </button>
      </nav>

      {showMore && (
        <>
          <div className="more-sheet-backdrop" onClick={() => setShowMore(false)} />
          <div className="more-sheet-container">
            <div className="more-sheet-header">
              <h3 className="more-sheet-title">More Options</h3>
              <button className="more-sheet-close" onClick={() => setShowMore(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="more-sheet-grid">
              {moreNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`more-grid-item ${isActive ? 'active' : ''}`}
                    onClick={() => setShowMore(false)}
                  >
                    <div className="more-grid-icon-box">
                      <Icon size={20} />
                      {item.badge !== undefined && (
                        <span className="more-grid-badge">{item.badge}</span>
                      )}
                    </div>
                    <span className="more-grid-label">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileBottomNav;
