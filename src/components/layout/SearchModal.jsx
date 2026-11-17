import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { selectIsSearchOpen, closeSearch } from '../../store/slices/uiSlice';
import { INSTAGRAM_PRODUCTS } from '../../data/productsData';

export default function SearchModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsSearchOpen);
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? INSTAGRAM_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeSearch())}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-10 p-6"
          >
            <div className="flex items-center gap-3 border-b border-[#E9D8C4] pb-4">
              <Search className="w-5 h-5 text-[#6fa993] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search luxury suits, bridal, georgette..."
                className="w-full bg-transparent text-sm sm:text-base text-[#18221F] placeholder-[#6F756F] focus:outline-none font-sans"
              />
              <button
                onClick={() => dispatch(closeSearch())}
                className="p-1 text-[#6F756F] hover:text-[#18221F] transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Suggestions / Results */}
            <div className="mt-4 max-h-80 overflow-y-auto">
              {query.trim() === '' ? (
                <div className="py-4">
                  <p className="text-xs font-semibold tracking-wider text-[#CAB27E] uppercase mb-2">
                    Popular Collections
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Pure Georgette', 'Karachi Suits', 'Bridal Couture', 'Cotton Dupatta'].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="text-xs bg-[#F5EBDD] text-[#18221F] px-3 py-1.5 rounded-full hover:bg-[#6fa993]/20 transition-colors"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : filtered.length > 0 ? (
                <div className="space-y-3 py-2">
                  {filtered.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F5EBDD] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-14 object-cover rounded"
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-[#18221F] line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#6fa993] font-bold">Rs. {item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#6F756F]" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-6 text-center text-xs text-[#6F756F]">
                  No matching products found for "{query}".
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
