import React from 'react';
import { Check } from 'lucide-react';
import { AVAILABLE_SIZES } from '../../data/productsData';

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Customer Rating', value: 'rating' },
];

export default function FilterSections({ filters, setFilters }) {
  const minVal = Number(filters.minPrice) || 0;
  const maxVal = Number(filters.maxPrice) || 0;
  const activeMax = (filters.selectedMax !== undefined && filters.selectedMax !== '') ? Number(filters.selectedMax) : maxVal;
  const sliderCeiling = maxVal > minVal ? maxVal : minVal + 100;
  const range = sliderCeiling - minVal;
  const pct = (range > 0 && activeMax >= minVal) ? Math.min(Math.max(((activeMax - minVal) / range) * 100, 0), 100) : 0;

  const toggleSize = (szLabel) => {
    setFilters((p) => {
      const cur = p.sizes || [];
      return { ...p, sizes: cur.includes(szLabel) ? cur.filter((s) => s !== szLabel) : [...cur, szLabel] };
    });
  };

  return (
    <div className="p-4 sm:p-5 overflow-y-auto [scrollbar-width:none] flex-1 space-y-5 sm:space-y-6 text-xs text-[#18221F]">
      {/* 1. Size Section (Premium Pill Grid) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="font-semibold text-sm text-[#18221F]">Select Size</h4>
          {filters.sizes?.length > 0 && (
            <button onClick={() => setFilters((p) => ({ ...p, sizes: [] }))} className="text-[11px] text-[#426E5F] hover:underline font-semibold cursor-pointer">
              Clear ({filters.sizes.length})
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {AVAILABLE_SIZES.map((sz) => {
            const isSelected = filters.sizes?.includes(sz.label);
            return (
              <button
                key={sz.id}
                type="button"
                onClick={() => toggleSize(sz.label)}
                className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer select-none flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-[#6fa993] text-white border-[#6fa993] font-bold shadow-2xs'
                    : 'bg-white text-[#18221F] border-[#6fa993]/40 hover:border-[#6fa993] hover:bg-[#F5EBDD]/40'
                }`}
              >
                <span className="text-xs font-semibold leading-tight">{sz.name}</span>
                <span className={`text-[10px] leading-tight ${isSelected ? 'text-white/85' : 'text-[#6F756F]'}`}>({sz.number})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Price Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-sm text-[#18221F]">Price</h4>
          <span className="text-[11px] text-[#18221F] font-medium">Max: ₹{activeMax}</span>
        </div>
        <div className="relative w-full h-8 flex items-center select-none my-1">
          <div className="absolute left-0 w-3.5 h-3.5 rounded-full bg-[#426E5F] pointer-events-none -translate-x-0.5 z-10 shadow-2xs" />
          <input
            type="range" min={minVal} max={sliderCeiling} step={1} value={activeMax}
            onChange={(e) => setFilters((p) => ({ ...p, selectedMax: Number(e.target.value), isPriceFiltered: true }))}
            style={{ background: `linear-gradient(to right, #426E5F 0%, #426E5F ${pct}%, #e2ece8 ${pct}%, #e2ece8 100%)` }}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#426E5F] outline-none z-20"
          />
        </div>
        <div className="text-center py-1.5 px-3 bg-white/80 rounded-lg border border-[#6fa993]/35 my-2 shadow-2xs">
          <p className="text-xs font-semibold text-[#18221F]">Selected: <span className="text-[#426E5F]">₹{minVal}</span> — <span className="text-[#426E5F]">₹{activeMax}</span></p>
        </div>
        <div className="flex items-center justify-between gap-3 mt-2">
          <div className="flex items-center gap-1.5 flex-1">
            <span className="text-xs font-semibold text-[#18221F]">₹</span>
            <input
              type="number" value={filters.minPrice !== undefined ? filters.minPrice : 0}
              onChange={(e) => setFilters((p) => ({ ...p, minPrice: e.target.value === '' ? '' : Number(e.target.value), isPriceFiltered: true }))}
              placeholder="0" className="w-full p-2 border border-[#6fa993]/45 rounded-lg text-center font-medium text-xs text-[#18221F] focus:border-[#426E5F] focus:outline-none bg-white shadow-2xs"
            />
          </div>
          <span className="text-gray-400 font-medium">—</span>
          <div className="flex items-center gap-1.5 flex-1">
            <span className="text-xs font-semibold text-[#18221F]">₹</span>
            <input
              type="number" value={filters.maxPrice !== undefined ? filters.maxPrice : 0}
              onChange={(e) => setFilters((p) => ({ ...p, maxPrice: e.target.value === '' ? '' : Number(e.target.value), selectedMax: e.target.value === '' ? '' : Number(e.target.value), isPriceFiltered: true }))}
              placeholder="0" className="w-full p-2 border border-[#6fa993]/45 rounded-lg text-center font-medium text-xs text-[#18221F] focus:border-[#426E5F] focus:outline-none bg-white shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* 3. Availability / Stock */}
      <div>
        <h4 className="font-semibold text-sm text-[#18221F] mb-2.5">Availability</h4>
        <div className="grid grid-cols-2 gap-2">
          {[{ label: 'All Items', value: 'all' }, { label: 'In Stock Only', value: 'in-stock' }].map((opt) => (
            <button
              key={opt.value} onClick={() => setFilters((p) => ({ ...p, availability: opt.value }))}
              className={`py-2 px-3 rounded-lg border text-center font-medium transition-all cursor-pointer ${
                filters.availability === opt.value ? 'bg-[#6fa993] text-white border-[#6fa993] font-medium shadow-2xs' : 'bg-white text-[#18221F] border-[#6fa993]/45 hover:border-[#6fa993]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Sort By */}
      <div>
        <h4 className="font-semibold text-sm text-[#18221F] mb-2.5">Sort By</h4>
        <div className="space-y-1.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value} onClick={() => setFilters((p) => ({ ...p, sortBy: opt.value }))}
              className={`w-full py-2 px-3 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                filters.sortBy === opt.value ? 'bg-[#6fa993]/15 text-[#426E5F] border-[#6fa993] font-medium' : 'bg-white text-[#18221F] border-[#6fa993]/45 hover:border-[#6fa993]'
              }`}
            >
              <span>{opt.label}</span>
              {filters.sortBy === opt.value && <Check className="w-3.5 h-3.5 text-[#426E5F]" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
