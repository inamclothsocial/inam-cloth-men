import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { selectIsWishlistOpen, closeWishlist } from '../../store/slices/uiSlice';
import { selectWishlistItems, removeFromWishlist } from '../../store/slices/wishlistSlice';

export default function WishlistModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsWishlistOpen);
  const items = useSelector(selectWishlistItems);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 select-none">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-xs pointer-events-auto" />

          <div className="fixed inset-0 pointer-events-none flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="pointer-events-auto w-full sm:max-w-2xl lg:max-w-3xl bg-white rounded-t-3xl sm:rounded-xl shadow-2xl h-[86dvh] sm:h-[80vh] max-h-[88dvh] flex flex-col overflow-hidden border border-gray-100"
            >
              {/* Mobile Drag Handle */}
              <div className="sm:hidden pt-3 pb-0.5 shrink-0 bg-white">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
              </div>

              {/* Clean Sticky Header */}
              <div className="flex items-center justify-between px-5 sm:px-7 pt-2 sm:pt-4 pb-2 bg-white shrink-0 sticky top-0 z-30">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#6fa993]/15 text-[#426E5F] flex items-center justify-center">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-[#18221F]">My Wishlist</h3>
                </div>

                <button
                  onClick={() => dispatch(closeWishlist())}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-300 group/modalclose shrink-0 focus:outline-none focus:ring-0 active:outline-none outline-none [-webkit-tap-highlight-color:transparent] cursor-pointer"
                  aria-label="Close Wishlist"
                >
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <span className="absolute w-4 h-[2px] bg-[#18221F] rotate-45 group-hover/modalclose:rotate-0 transition-transform duration-300 rounded-full" />
                    <span className="absolute w-4 h-[2px] bg-[#18221F] -rotate-45 group-hover/modalclose:rotate-0 transition-transform duration-300 rounded-full" />
                  </div>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-7 pt-1 [scrollbar-width:none]">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-[#6fa993]/15 text-[#6fa993] flex items-center justify-center">
                      <Heart className="w-8 h-8 stroke-[1.2]" />
                    </div>
                    <h3 className="font-sans text-lg font-bold text-[#18221F]">Your Wishlist is Empty</h3>
                    <p className="text-xs max-w-xs text-gray-500">Explore our luxury festive and bridal collections to save your favorites.</p>
                    <Link to="/shop-by-category" onClick={() => dispatch(closeWishlist())} className="mt-1 inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#6fa993] hover:bg-[#568977] text-white text-xs uppercase tracking-wider font-semibold transition-colors shadow-2xs">
                      <span>Explore Collections</span><ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="p-3 sm:p-3.5 rounded-xl bg-white/80 border border-transparent hover:border-[#6fa993]/60 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 group">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <button
                            onClick={() => dispatch(removeFromWishlist(item.id))}
                            className="w-6 h-6 flex items-center justify-center transition-all duration-300 group/close focus:outline-none focus:ring-0 active:outline-none outline-none [-webkit-tap-highlight-color:transparent] cursor-pointer shrink-0"
                            aria-label="Remove item"
                          >
                            <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                              <span className="absolute w-3.5 h-[1.75px] bg-[#18221F] rotate-45 group-hover/close:rotate-0 group-hover/close:bg-[#E53E3E] transition-all duration-300 rounded-full" />
                              <span className="absolute w-3.5 h-[1.75px] bg-[#18221F] -rotate-45 group-hover/close:rotate-0 group-hover/close:bg-[#E53E3E] transition-all duration-300 rounded-full" />
                            </div>
                          </button>

                          <Link to={`/product/${item.id}`} onClick={() => dispatch(closeWishlist())} className="shrink-0">
                            <img src={item.image || 'https://inamcloth.com/cdn/shop/files/141.jpg?v=1732737874&width=540'} alt={item.name} className="w-14 h-18 sm:w-16 sm:h-20 object-cover object-top rounded-lg bg-[#F5EBDD] border-0" />
                          </Link>

                          <div className="min-w-0 pr-2">
                            <Link to={`/product/${item.id}`} onClick={() => dispatch(closeWishlist())} className="text-xs sm:text-sm font-semibold text-[#18221F] hover:text-[#426E5F] transition-colors line-clamp-2 block leading-snug">
                              {item.name}
                            </Link>
                            <p className="text-[10px] sm:text-[11px] text-[#426E5F] font-semibold mt-1">In Stock</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-xs sm:text-sm font-bold font-sans text-[#18221F]">Rs. {Number(item.price || 0).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
