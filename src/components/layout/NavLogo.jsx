import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { selectBrandInfo } from '../../store/slices/navigationSlice';

export default function NavLogo({ className = '' }) {
  const brandInfo = useSelector(selectBrandInfo);
  return (
    <motion.div
      initial={{ opacity: 0, y: -45, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.85,
        delay: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative z-50 translate-y-1 sm:translate-y-2"
    >
      {/* Circular curved pod smoothly sliding in from top to bottom after links load */}
      <div className="relative -mb-6 sm:-mb-8 md:-mb-10 pt-2 pb-3 px-3.5 sm:px-4.5 bg-[#FBF8F2] rounded-b-[40px] sm:rounded-b-[48px] shadow-[0_4px_14px_rgba(202,178,126,0.18)] border-b border-l border-r border-[#CAB27E]/35 flex items-center justify-center">
        <Link
          to="/"
          className={`inline-flex items-center group py-0.5 select-none focus:outline-none ${className}`}
          aria-label="INAM CLOTH Home"
        >
          <img
            src={brandInfo.logoUrl}
            alt="INAM CLOTH"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            width="200"
            height="90"
          />
        </Link>
      </div>
    </motion.div>
  );
}
