import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroBadge from './HeroBadge';

export default function HeroOverlayContent({ slide }) {
  return (
    <div className="relative z-20 flex items-center justify-between w-full max-w-6xl mx-auto px-4 sm:px-8 py-10">
      {/* Center Editorial Typography Card */}
      <div className="mx-auto text-center max-w-2xl">
        {/* Eyebrow with decorative lines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-2"
        >
          <span className="h-[1px] w-6 sm:w-10 bg-[#B8893D]" />
          <span className="text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-[#B8893D] uppercase">
            {slide.eyebrow}
          </span>
          <span className="h-[1px] w-6 sm:w-10 bg-[#B8893D]" />
        </motion.div>

        {/* Main Fashion Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-sans text-[#073C32] font-semibold leading-[1.08] tracking-tight"
        >
          <span className="block">{slide.titleMain}</span>
          <span className="block font-sans text-[#B8893D] font-medium text-4xl sm:text-6xl lg:text-7xl -mt-1 sm:-mt-2">
            {slide.titleSub}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-2.5 text-xs sm:text-sm text-[#18221F]/80 font-medium tracking-wide"
        >
          {slide.subtitle}
        </motion.p>

        {/* Offer Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-3 inline-block"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#073C32] uppercase">
            {slide.offerBadge}
          </span>
        </motion.div>

        {/* Luxury CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-5"
        >
          <Link
            to={slide.ctaLink}
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#073C32] text-[#FBF8F2] hover:bg-[#0A3028] text-xs font-semibold tracking-widest uppercase shadow-luxury hover:shadow-floating transition-all duration-300 group border border-[#B8893D]/30"
          >
            <span>{slide.ctaText}</span>
            <ArrowRight className="w-4 h-4 text-[#B8893D] group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Floating Circular Badge on Desktop */}
      <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 hidden xl:block">
        <HeroBadge text={slide.badgeText} />
      </div>
    </div>
  );
}
