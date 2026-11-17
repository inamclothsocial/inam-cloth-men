import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../common/Container';
import NavLogo from './NavLogo';
import NavLinks from './NavLinks';
import NavActions from './NavActions';
import MegaMenuCollection from './MegaMenuCollection';
import { useScrollHeader } from '../../hooks/useScrollHeader';
import { selectIsMobileMenuOpen } from '../../store/slices/uiSlice';

export default function Navbar({ showNavbarProp, isScrolledProp }) {
  const location = useLocation();
  const scrollHeader = useScrollHeader();
  const showNavbar = showNavbarProp !== undefined ? showNavbarProp : scrollHeader.showNavbar;
  const isScrolled = isScrolledProp !== undefined ? isScrolledProp : scrollHeader.isScrolled;
  const isMobileMenuOpen = useSelector(selectIsMobileMenuOpen);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const shouldShowNavbar = showNavbar || isMobileMenuOpen || Boolean(activeMegaMenu);
  const closeMegaTimeoutRef = useRef(null);

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );

  const handleOpenMegaMenu = (item) => {
    if (closeMegaTimeoutRef.current) clearTimeout(closeMegaTimeoutRef.current);
    setActiveMegaMenu(item);
  };

  const handleCloseMegaMenu = (immediate = false) => {
    if (closeMegaTimeoutRef.current) clearTimeout(closeMegaTimeoutRef.current);
    if (immediate) {
      setActiveMegaMenu(null);
    } else {
      closeMegaTimeoutRef.current = setTimeout(() => {
        setActiveMegaMenu(null);
      }, 180);
    }
  };

  const handleCancelClose = () => {
    if (closeMegaTimeoutRef.current) clearTimeout(closeMegaTimeoutRef.current);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setActiveMegaMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (closeMegaTimeoutRef.current) clearTimeout(closeMegaTimeoutRef.current);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isMobile ? (shouldShowNavbar ? 0 : -100) : 0 }}
      transition={{ duration: isMobile ? 0.35 : 0, ease: [0.16, 1, 0.3, 1] }}
      className={`${isMobileMenuOpen ? 'fixed' : 'sticky lg:relative'} top-0 z-50 w-full bg-[#FBF8F2] ${
        isScrolled && isMobile ? 'shadow-xs' : ''
      }`}
    >
      <Container size="wide" className="relative z-30">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[82px] transition-all duration-300">
          {/* Left: Authentic INAM CLOTH Logo */}
          <div className="flex items-center shrink-0 w-28 sm:w-36 lg:w-44 xl:w-48 relative z-40">
            <NavLogo />
          </div>

          {/* Center: Desktop Navigation - Sharp Integer-Pixel Centering */}
          <div className="hidden lg:flex items-center justify-center flex-1 h-full z-30">
            <NavLinks
              activeMegaMenu={activeMegaMenu}
              onOpenMegaMenu={handleOpenMegaMenu}
              onCloseMegaMenu={handleCloseMegaMenu}
            />
          </div>

          {/* Right: Action Icons & Mobile Animated Menu/Cross */}
          <div className="flex items-center justify-end shrink-0 w-28 sm:w-36 lg:w-44 xl:w-48 relative z-40">
            <NavActions />
          </div>
        </div>
      </Container>

      {/* Full-Screen Mega Menu for Shop By Collection */}
      <AnimatePresence>
        {activeMegaMenu && (
          <MegaMenuCollection
            isOpen={Boolean(activeMegaMenu)}
            onClose={() => setActiveMegaMenu(null)}
            onMouseEnter={handleCancelClose}
            onMouseLeave={() => handleCloseMegaMenu(false)}
          />
        )}
      </AnimatePresence>

      {/* Bottom Corner Fillets */}
      <svg className="absolute top-full left-0 w-6 h-6 sm:w-9 sm:h-9 md:w-11 md:h-11 pointer-events-none z-30 text-[#FBF8F2]" viewBox="0 0 44 44" fill="none">
        <path d="M 0,0 L 0,44 Q 0,0 44,0 Z" fill="currentColor" />
      </svg>
      <svg className="absolute top-full right-0 w-6 h-6 sm:w-9 sm:h-9 md:w-11 md:h-11 pointer-events-none z-30 text-[#FBF8F2]" viewBox="0 0 44 44" fill="none">
        <path d="M 44,0 L 44,44 Q 44,0 0,0 Z" fill="currentColor" />
      </svg>
    </motion.header>
  );
}
