import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { slugify } from '../../data/collectionsData';

export default function ShopByCollectionCard({ collection, isMobileView }) {
  const slug = collection.slug || slugify(collection.name || '');
  const targetLink = collection.link || collection.path || `/${slug}`;

  return (
    <Link
      to={targetLink}
      className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-xs hover:shadow-lg border border-[#E9D8C4]/40 transition-all duration-500 ease-out hover:-translate-y-1 bg-[#F5EBDD] flex flex-col justify-end select-none block ${
        isMobileView
          ? 'aspect-[16/8.5] sm:aspect-[16/8] p-3.5 sm:p-4'
          : 'aspect-[16/8.4] sm:aspect-[16/8] lg:aspect-[16/8.2] xl:aspect-[16/8] p-3.5 sm:p-4'
      }`}
    >
      <img
        src={collection.image}
        alt={collection.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
      />

      {/* Clean & Bright: Subtle bottom-only text backing without card darkness */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 via-black/15 to-transparent pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-xs sm:text-sm lg:text-[14px] font-semibold text-white tracking-wide uppercase leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-1">
            {collection.name}
          </h3>
        </div>

        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/50 text-white flex items-center justify-center group-hover:bg-[#6fa993] group-hover:border-[#6fa993] group-hover:text-white group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shrink-0">
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}
