import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCartCount, toggleCartDrawer } from '../../store/slices/cartSlice';
import { openSearch, toggleMobileMenu, showToast, selectIsMobileMenuOpen } from '../../store/slices/uiSlice';

function HomeNavIcon({ isActive }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isActive ? '1.85' : '1.5'} strokeLinecap="round" strokeLinejoin="round" className="w-[23.5px] h-[23.5px]">
      <path d="M3.5 10.8L12 3.8l8.5 7V20a1.5 1.5 0 0 1-1.5 1.5h-4.5a1 1 0 0 1-1-1v-3.5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1V20a1 1 0 0 1-1 1.5H5A1.5 1.5 0 0 1 3.5 20v-9.2z" />
    </svg>
  );
}

function MenuNavIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
      <line x1="4" y1="6.5" x2="20" y2="6.5" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17.5" x2="20" y2="17.5" />
    </svg>
  );
}

function SearchNavIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
      <circle cx="11" cy="11" r="6.8" />
      <path d="m20.5 20.5-3.8-3.8" />
    </svg>
  );
}

function BagNavIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[23.5px] h-[23.5px]">
      <path d="M5.5 8.5h13l-1.5 11.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5L5.5 8.5z" />
      <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
      <line x1="6.8" y1="15.5" x2="17.2" y2="15.5" />
    </svg>
  );
}

function AccountNavIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
      <circle cx="12" cy="7.5" r="4" />
      <path d="M4.5 20.5c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5" />
    </svg>
  );
}

export default function MobileBottomNav({ isVisible }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const cartCount = useSelector(selectCartCount);
  const isMobileMenuOpen = useSelector(selectIsMobileMenuOpen);
  const isHome = location.pathname === '/';
  const shouldShow = isVisible && !isMobileMenuOpen;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 70, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] inset-x-3.5 z-40 lg:hidden flex justify-center pointer-events-auto select-none"
        >
          <div className="w-full max-w-md bg-[#FBF8F2] rounded-2xl shadow-[0_6px_22px_rgba(24,34,31,0.08)] px-2 py-2 grid grid-cols-5 items-center">
            {/* 1. Home */}
            <NavLink
              to="/"
              className={`flex-1 flex flex-col items-center justify-center min-h-[46px] py-1 gap-1 transition-colors ${
                isHome ? 'text-[#18221F] font-medium' : 'text-[#8E8E93] hover:text-[#18221F]'
              }`}
            >
              <div className="w-6.5 h-6.5 flex items-center justify-center">
                <HomeNavIcon isActive={isHome} />
              </div>
              <span className="text-[10px] sm:text-[11px] leading-none tracking-tight">Home</span>
            </NavLink>

            {/* 2. Menu */}
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="flex-1 flex flex-col items-center justify-center min-h-[46px] py-1 gap-1 text-[#8E8E93] hover:text-[#18221F] transition-colors focus:outline-none"
              aria-label="Menu"
            >
              <div className="w-6.5 h-6.5 flex items-center justify-center">
                <MenuNavIcon />
              </div>
              <span className="text-[10px] sm:text-[11px] leading-none tracking-tight">Menu</span>
            </button>

            {/* 3. Search */}
            <button
              onClick={() => dispatch(openSearch())}
              className="flex-1 flex flex-col items-center justify-center min-h-[46px] py-1 gap-1 text-[#8E8E93] hover:text-[#18221F] transition-colors focus:outline-none"
              aria-label="Search"
            >
              <div className="w-6.5 h-6.5 flex items-center justify-center">
                <SearchNavIcon />
              </div>
              <span className="text-[10px] sm:text-[11px] leading-none tracking-tight">Search</span>
            </button>

            {/* 4. Cart */}
            <button
              onClick={() => dispatch(toggleCartDrawer())}
              className="flex-1 flex flex-col items-center justify-center min-h-[46px] py-1 gap-1 text-[#8E8E93] hover:text-[#18221F] transition-colors focus:outline-none relative"
              aria-label="Cart"
            >
              <div className="w-6.5 h-6.5 flex items-center justify-center relative">
                <BagNavIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#426E5F] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] sm:text-[11px] leading-none tracking-tight">Cart</span>
            </button>

            {/* 5. Account */}
            <button
              onClick={() => dispatch(showToast('Account Portal: Secure Login available soon.'))}
              className="flex-1 flex flex-col items-center justify-center min-h-[46px] py-1 gap-1 text-[#8E8E93] hover:text-[#18221F] transition-colors focus:outline-none"
              aria-label="Account"
            >
              <div className="w-6.5 h-6.5 flex items-center justify-center">
                <AccountNavIcon />
              </div>
              <span className="text-[10px] sm:text-[11px] leading-none tracking-tight">Account</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
