import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({ value, onChange, options = [], className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-3.5 py-2.5 bg-white border border-[#6fa993] rounded-lg text-xs text-[#18221F] font-medium flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-[#6fa993] transition-all cursor-pointer shadow-2xs"
      >
        <span className="truncate">{value || 'Select Subject'}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#426E5F] shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-[#6fa993] rounded-lg shadow-xl overflow-hidden py-1"
          >
            {options.map((opt) => {
              const isSelected = opt === value;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#6fa993]/15 text-[#426E5F] font-semibold'
                      : 'text-[#18221F] hover:bg-[#6fa993]/10 hover:text-[#426E5F]'
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#426E5F] shrink-0 stroke-[2.2]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
