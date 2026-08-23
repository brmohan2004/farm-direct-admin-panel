import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Ensures that whenever the route changes, the page scrolls back to the very top (0, 0).
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset window scroll
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // Reset document element & body scroll
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Reset layout content container scroll if overflow is styled
    const adminContent = document.querySelector('.admin-content');
    if (adminContent) {
      adminContent.scrollTop = 0;
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
