import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, Trash2 } from 'lucide-react';
import {
  closeCompareModal,
  clearCompare,
  selectCompareItems,
  selectIsCompareModalOpen,
} from '../../store/slices/compareSlice';
import CompareItemCard from './CompareItemCard';

export default function CompareModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsCompareModalOpen);
  const items = useSelector(selectCompareItems);

  // Lock background body scroll when compare modal is open
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(closeCompareModal())}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window: Minimal-Radius Seamless Page Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded sm:rounded-md shadow-2xl border-0 flex flex-col z-10 overflow-hidden"
        >
          {/* Header on 1 Single Clean Line (No border divider) */}
          <div className="p-4 sm:p-7 pb-2 sm:pb-3 flex items-center justify-between gap-2 bg-transparent">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#6fa993]/15 text-[#6fa993] flex items-center justify-center shrink-0">
                <ArrowLeftRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-xl font-semibold text-[#18221F] tracking-tight truncate">
                  Compare Products
                </h3>
                <p className="text-[11px] sm:text-xs text-[#6F756F] truncate">
                  {items.length}/4 Products Selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {items.length > 0 && (
                <button
                  onClick={() => dispatch(clearCompare())}
                  className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#E53E3E] hover:bg-[#E53E3E]/10 px-2.5 sm:px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}

              {/* Circle-Free Animated 2-Line Crossing Close Button */}
              <button
                onClick={() => dispatch(closeCompareModal())}
                className="w-8 h-8 flex items-center justify-center transition-all duration-300 group/modalclose shrink-0 focus:outline-none cursor-pointer"
                aria-label="Close modal"
              >
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <span className="absolute w-4 h-[1.75px] bg-[#18221F] rotate-45 group-hover/modalclose:rotate-0 group-active/modalclose:rotate-0 transition-transform duration-300 rounded-full" />
                  <span className="absolute w-4 h-[1.75px] bg-[#18221F] -rotate-45 group-hover/modalclose:rotate-0 group-active/modalclose:rotate-0 transition-transform duration-300 rounded-full" />
                </div>
              </button>
            </div>
          </div>

          {/* Body: Safe Padding so cards never cut at top */}
          <div className="p-4 sm:p-7 pt-4 pb-6 overflow-y-auto max-h-[82vh] flex-1 flex flex-col justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {items.length === 0 ? (
              <div className="py-14 sm:py-20 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#6fa993]/10 text-[#6fa993] flex items-center justify-center mb-3">
                  <ArrowLeftRight className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h4 className="text-base font-semibold text-[#18221F]">
                  No Products to Compare
                </h4>
                <p className="text-xs sm:text-sm text-[#6F756F] max-w-sm mt-1">
                  Browse products and click the Compare icon on any item to compare up to 4 styles side-by-side.
                </p>
              </div>
            ) : (
              <div className="flex flex-row overflow-x-auto scrollbar-none snap-x snap-mandatory lg:overflow-visible lg:flex-nowrap justify-start sm:justify-center items-stretch gap-3.5 sm:gap-5 py-3 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {items.map((prod) => (
                  <CompareItemCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
