import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectIsMobileMenuOpen } from '../store/slices/uiSlice';

export function useScrollHeader() {
  const isMobileMenuOpen = useSelector(selectIsMobileMenuOpen);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showBottomNav, setShowBottomNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  // When mobile menu is opened or closed, keep Navbar visible until user scrolls
  useEffect(() => {
    lastScrollY.current = typeof window !== 'undefined' ? window.scrollY : 0;
    setShowNavbar(true);
    setShowBottomNav(false);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isMobileMenuOpen) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY =
            window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
          const prevY = lastScrollY.current;
          const diff = currentY - prevY;

          setIsScrolled(currentY > 20);

          const isMobile = window.innerWidth < 1024;

          if (isMobile) {
            // Near top of page: Top navbar visible, bottom nav hidden
            if (currentY < 30) {
              setShowNavbar(true);
              setShowBottomNav(false);
            } else if (diff < -1) {
              // Niche scroll: Top navbar aa jayega, bottom nav chala jayega
              setShowNavbar(true);
              setShowBottomNav(false);
            } else if (diff > 1) {
              // Upper scroll: Top navbar chala jayega, bottom navigation bar aa jayega
              setShowNavbar(false);
              setShowBottomNav(true);
            }
          } else {
            // Desktop: Navbar stays in natural flow at top, bottom nav always hidden
            setShowNavbar(true);
            setShowBottomNav(false);
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  return { showNavbar, showBottomNav, isScrolled };
}
