import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { selectIsCartOpen, selectCartItems, selectCartTotal, closeCartDrawer } from '../../store/slices/cartSlice';
import CartItemCard from './CartItemCard';
import CartSummaryCard from './CartSummaryCard';

function BagNavIcon({ className = 'w-4.5 h-4.5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5.5 8.5h13l-1.5 11.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5L5.5 8.5z" />
      <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
      <line x1="6.8" y1="15.5" x2="17.2" y2="15.5" />
    </svg>
  );
}

export default function CartDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsCartOpen);
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCartDrawer())}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs pointer-events-auto"
          />

          <div className="fixed inset-0 pointer-events-none flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="pointer-events-auto w-full sm:max-w-5xl lg:max-w-6xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl h-[86dvh] sm:h-[82vh] max-h-[88dvh] flex flex-col overflow-hidden border border-gray-100"
            >
              {/* Mobile Drag Handle */}
              <div className="sm:hidden pt-3 pb-0.5 shrink-0 bg-white">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
              </div>

              {/* Clean Sticky Header */}
              <div className="flex items-center justify-between px-5 sm:px-8 pt-2 sm:pt-4 pb-2 bg-white shrink-0 sticky top-0 z-30">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#6fa993]/15 text-[#426E5F] flex items-center justify-center shrink-0">
                    <BagNavIcon className="w-4.5 h-4.5" />
                  </div>
                  <h2 className="font-sans text-xl sm:text-3xl font-semibold text-[#18221F] tracking-tight">Cart</h2>
                </div>

                <button
                  onClick={() => dispatch(closeCartDrawer())}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-300 group/modalclose shrink-0 focus:outline-none focus:ring-0 active:outline-none outline-none [-webkit-tap-highlight-color:transparent] cursor-pointer"
                  aria-label="Close Cart"
                >
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <span className="absolute w-4 h-[2px] bg-[#18221F] rotate-45 group-hover/modalclose:rotate-0 transition-transform duration-300 rounded-full" />
                    <span className="absolute w-4 h-[2px] bg-[#18221F] -rotate-45 group-hover/modalclose:rotate-0 transition-transform duration-300 rounded-full" />
                  </div>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-7 pt-1 sm:pt-2 [scrollbar-width:none]">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-[#6fa993]/15 text-[#6fa993] flex items-center justify-center">
                      <BagNavIcon className="w-8 h-8" />
                    </div>
                    <h3 className="font-sans text-lg font-bold text-[#18221F]">Your Shopping Bag is Empty</h3>
                    <p className="text-xs max-w-xs text-gray-500">Explore our luxury festive and bridal collections to add your favorites.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
                    {/* Items List */}
                    <div className="lg:col-span-7 bg-white/80 rounded-2xl border-0 p-3 sm:p-4 shadow-xs space-y-1">
                      {items.map((item, idx) => (
                        <CartItemCard
                          key={item.id || `cart-${item.productId || idx}-${idx}`}
                          item={item}
                          onCloseModal={() => dispatch(closeCartDrawer())}
                        />
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-5 sticky top-0">
                      <CartSummaryCard total={total} isDrawer={true} />
                    </div>
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
