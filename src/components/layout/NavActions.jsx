import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Search, User, Heart } from 'lucide-react';
import { selectCartCount, toggleCartDrawer } from '../../store/slices/cartSlice';
import { selectWishlistCount } from '../../store/slices/wishlistSlice';
import { openSearch, toggleMobileMenu, showToast, selectIsMobileMenuOpen, openWishlist } from '../../store/slices/uiSlice';

function BagNavIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5.5 8.5h13l-1.5 11.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5L5.5 8.5z" />
      <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
      <line x1="6.8" y1="15.5" x2="17.2" y2="15.5" />
    </svg>
  );
}

export default function NavActions({ className = '' }) {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const isMobileMenuOpen = useSelector(selectIsMobileMenuOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center ${className}`}
    >
      {/* Desktop Only: 4 Action Icons */}
      <div className="hidden lg:flex items-center gap-3.5 lg:gap-4">
        <button onClick={() => dispatch(openSearch())} className="p-2 text-[#111111] hover:text-[#568977] transition-colors rounded-full focus:outline-none cursor-pointer" aria-label="Search Catalog">
          <Search className="w-5 h-5 stroke-[1.8]" />
        </button>

        <button onClick={() => dispatch(showToast('Account Portal: Secure Login available soon.'))} className="p-2 text-[#111111] hover:text-[#568977] transition-colors rounded-full focus:outline-none cursor-pointer" aria-label="User Account">
          <User className="w-5 h-5 stroke-[1.8]" />
        </button>

        <button onClick={() => dispatch(openWishlist())} className="relative p-2 text-[#111111] hover:text-[#568977] transition-colors rounded-full focus:outline-none cursor-pointer" aria-label={`Wishlist (${wishlistCount} items)`}>
          <Heart className="w-5 h-5 stroke-[1.8]" />
          {wishlistCount > 0 && <span className="absolute top-1 right-1 bg-[#568977] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlistCount}</span>}
        </button>

        <button onClick={() => dispatch(toggleCartDrawer())} className="relative p-2 text-[#111111] hover:text-[#568977] transition-colors rounded-full focus:outline-none cursor-pointer" aria-label={`Cart (${cartCount} items)`}>
          <BagNavIcon className="w-5 h-5" />
          {cartCount > 0 && <span className="absolute top-1 right-1 bg-[#568977] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
        </button>
      </div>

      {/* Mobile Only: Perfectly Spaced 3-Line Hamburger to Centered Cross */}
      <button
        onClick={() => dispatch(toggleMobileMenu())}
        className="lg:hidden p-2 mr-1 sm:mr-2 text-[#111111] hover:text-[#568977] transition-colors rounded-lg focus:outline-none flex items-center justify-center cursor-pointer"
        aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
      >
        <div className="relative w-6 h-5 flex flex-col justify-between items-center py-0.5">
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-6 h-[2px] bg-[#111111] rounded-full origin-center shrink-0"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-6 h-[2px] bg-[#111111] rounded-full shrink-0"
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-6 h-[2px] bg-[#111111] rounded-full origin-center shrink-0"
          />
        </div>
      </button>
    </motion.div>
  );
}
