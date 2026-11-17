import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  searchTerm = '',
  setSearchTerm,
  placeholder = 'Search collections, fabrics...',
  className = '',
}) {
  return (
    <div className={`relative select-none ${className || 'w-full max-w-xs'}`}>
      <div className="relative flex items-center">
        {/* Search Icon */}
        <Search className="absolute left-3.5 w-4 h-4 text-[#6fa993] pointer-events-none" />

        {/* Search Input: Light green border default, dark green on select */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-9 py-2.5 sm:py-2 bg-white border border-[#6fa993] focus:border-[#426E5F] focus:ring-1 focus:ring-[#426E5F] outline-none focus:outline-none rounded-full text-xs text-[#18221F] placeholder-gray-400 shadow-2xs transition-all"
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-2.5 w-4.5 h-4.5 rounded-full bg-gray-100 hover:bg-[#6fa993] hover:text-white text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        )}
      </div>
    </div>
  );
}
