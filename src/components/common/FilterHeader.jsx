import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import SearchBar from './SearchBar';

export default function FilterHeader({
  title = 'New Arrivals',
  subtitle,
  totalCount,
  activeFiltersCount,
  onOpenFilter,
  filters,
  onReset,
  onRemoveFilter,
  searchTerm,
  setSearchTerm,
  searchPlaceholder = 'Search designs...',
}) {
  const hasPriceFilter = filters.isPriceFiltered === true;
  const currentDisplayMax = (filters.selectedMax !== undefined && filters.selectedMax !== '')
    ? filters.selectedMax
    : (filters.maxPrice || '∞');

  return (
    <div className="mb-8 select-none">
      {/* Top Bar: Title on Left, Filter Button Pinned Right on Mobile & Desktop */}
      <div className="flex flex-row items-center justify-between gap-3 pb-4 border-b border-[#E9D8C4]/60">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-[#18221F] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-gray-500 font-normal leading-relaxed mt-0.5 max-w-xl line-clamp-1 sm:line-clamp-none">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Side: SearchBar (Desktop) + Count + Filter Button (Pinned Right) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {setSearchTerm && (
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder={searchPlaceholder}
              className="hidden sm:block w-48 md:w-56"
            />
          )}

          <span className="text-xs text-gray-500 font-medium hidden sm:inline-block">
            {totalCount} {totalCount === 1 ? 'Design' : 'Designs'}
          </span>

          <button
            onClick={onOpenFilter}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white border border-[#6fa993]/50 hover:border-[#6fa993] text-[#18221F] text-xs font-medium shadow-2xs hover:shadow-xs transition-all cursor-pointer group shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#6fa993] group-hover:scale-105 transition-transform" />
            <span className="font-semibold text-[#18221F]">Filter</span>
            {activeFiltersCount > 0 && (
              <span className="text-xs font-semibold text-[#18221F] ml-0.5">
                ({activeFiltersCount})
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#18221F] mr-1">
            Active Filters:
          </span>

          {hasPriceFilter && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6fa993]/15 text-[#18221F] border border-[#6fa993]/30 text-xs font-medium">
              ₹{filters.minPrice || 0} – ₹{currentDisplayMax}
              <button onClick={() => onRemoveFilter('price')} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.availability === 'in-stock' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6fa993]/15 text-[#18221F] border border-[#6fa993]/30 text-xs font-medium">
              In Stock Only
              <button onClick={() => onRemoveFilter('availability')} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.sizes?.map((sz) => (
            <span key={sz} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6fa993]/15 text-[#18221F] border border-[#6fa993]/30 text-xs font-medium">
              Size: {sz}
              <button onClick={() => onRemoveFilter('size', sz)} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            onClick={onReset}
            className="text-[11px] text-[#426E5F] hover:underline font-semibold ml-2 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
