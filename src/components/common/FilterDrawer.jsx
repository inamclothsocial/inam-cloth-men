import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import FilterSections from './FilterSections';

export default function FilterDrawer({ isOpen, onClose, filters, setFilters, onReset, totalCount }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Seamless Drawer with Subtle Reduced Border Radius on Top-Right & Bottom-Right */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-[82vw] max-w-[300px] sm:w-[320px] sm:max-w-[320px] lg:w-[320px] bg-white h-full shadow-2xl flex flex-col justify-between rounded-r-lg sm:rounded-r-xl overflow-hidden border-0"
          >
            {/* Header (Border-free) */}
            <div className="p-4 sm:p-5 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="w-5 h-5 text-[#426E5F]" />
                <h3 className="font-sans text-xl sm:text-[22px] font-normal text-[#18221F] tracking-tight">
                  Filter
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onReset}
                  className="text-xs font-semibold text-[#6fa993] hover:text-[#426E5F] flex items-center gap-1 cursor-pointer focus:outline-none"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                {/* 2-Line Animated Cross Icon */}
                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-300 group/close shrink-0 outline-none focus:outline-none focus:ring-0 active:outline-none border-0 bg-transparent cursor-pointer select-none"
                  aria-label="Close filters"
                >
                  <div className="relative w-5 h-5 flex items-center justify-center pointer-events-none">
                    <span className="absolute w-5 h-[2px] bg-[#18221F] rotate-45 group-hover/close:rotate-0 group-active/close:rotate-0 transition-transform duration-300 rounded-full" />
                    <span className="absolute w-5 h-[2px] bg-[#18221F] -rotate-45 group-hover/close:rotate-0 group-active/close:rotate-0 transition-transform duration-300 rounded-full" />
                  </div>
                </button>
              </div>
            </div>

            {/* Drawer Body */}
            <FilterSections filters={filters} setFilters={setFilters} />

            {/* Footer Apply Button (Border-free) */}
            <div className="p-4 bg-white">
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-[#6fa993] hover:bg-[#568977] text-white font-semibold text-xs uppercase tracking-widest rounded-xl transition-colors shadow-xs cursor-pointer text-center"
              >
                Show {totalCount} Designs
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
