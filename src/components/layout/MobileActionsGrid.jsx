import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, User, Heart } from 'lucide-react';
import { closeMobileMenu, openSearch, showToast, openWishlist } from '../../store/slices/uiSlice';
import { selectCartCount, toggleCartDrawer } from '../../store/slices/cartSlice';
import { selectWishlistCount } from '../../store/slices/wishlistSlice';

function BagNavIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5.5 8.5h13l-1.5 11.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5L5.5 8.5z" />
      <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
      <line x1="6.8" y1="15.5" x2="17.2" y2="15.5" />
    </svg>
  );
}

export default function MobileActionsGrid() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);

  return (
    <div className="grid grid-cols-4 gap-2 py-3.5 border-b border-[#E9D8C4]">
      {/* 1. Search */}
      <button
        onClick={() => {
          dispatch(closeMobileMenu());
          dispatch(openSearch());
        }}
        className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#F5EBDD]/60 hover:bg-[#F5EBDD] text-[#426E5F] transition-colors"
      >
        <Search className="w-4 h-4 stroke-[1.8]" />
        <span className="text-[10px] font-medium text-[#18221F] mt-1">Search</span>
      </button>

      {/* 2. Account */}
      <button
        onClick={() => {
          dispatch(closeMobileMenu());
          dispatch(showToast('Account Portal: Secure Login available soon.'));
        }}
        className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#F5EBDD]/60 hover:bg-[#F5EBDD] text-[#426E5F] transition-colors"
      >
        <User className="w-4 h-4 stroke-[1.8]" />
        <span className="text-[10px] font-medium text-[#18221F] mt-1">Account</span>
      </button>

      {/* 3. Wishlist */}
      <button
        onClick={() => {
          dispatch(closeMobileMenu());
          dispatch(openWishlist());
        }}
        className="relative flex flex-col items-center justify-center p-2 rounded-lg bg-[#F5EBDD]/60 hover:bg-[#F5EBDD] text-[#426E5F] transition-colors cursor-pointer"
      >
        <Heart className="w-4 h-4 stroke-[1.8]" />
        {wishlistCount > 0 && (
          <span className="absolute top-1 right-2 bg-[#426E5F] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
            {wishlistCount}
          </span>
        )}
        <span className="text-[10px] font-medium text-[#18221F] mt-1">Wishlist</span>
      </button>

      {/* 4. Bag / Cart */}
      <button
        onClick={() => {
          dispatch(closeMobileMenu());
          dispatch(toggleCartDrawer());
        }}
        className="relative flex flex-col items-center justify-center p-2 rounded-lg bg-[#F5EBDD]/60 hover:bg-[#F5EBDD] text-[#426E5F] transition-colors"
      >
        <BagNavIcon className="w-4 h-4" />
        {cartCount > 0 && (
          <span className="absolute top-1 right-2 bg-[#426E5F] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-medium text-[#18221F] mt-1">Cart</span>
      </button>
    </div>
  );
}
