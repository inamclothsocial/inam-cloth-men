import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { slugify } from '../../data/collectionsData';

const MotionLink = motion(Link);

export default function CollectionCard({ collection }) {
  const title = collection.name || collection.title;
  const slug = collection.slug || slugify(title);
  const targetLink = collection.link || `/${slug}`;

  return (
    <MotionLink
      to={targetLink}
      whileHover={{ y: -7, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[3/4.7] sm:aspect-[3/4.6] lg:aspect-[3/4.8] rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl border-0 bg-[#F5EBDD] flex flex-col justify-end p-3.5 sm:p-5 select-none block transition-shadow duration-500 will-change-transform"
    >
      <img
        src={collection.image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out will-change-transform"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex items-end justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-xs sm:text-sm md:text-[15px] font-semibold text-white leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] line-clamp-2">
            {title}
          </h3>
        </div>

        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/35 backdrop-blur-md border border-white/40 text-white flex items-center justify-center group-hover:bg-[#6fa993] group-hover:border-[#6fa993] group-hover:text-white group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shrink-0">
          <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white stroke-[2.2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>
      </div>
    </MotionLink>
  );
}
