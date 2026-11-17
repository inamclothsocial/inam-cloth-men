import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function HeroBadge({ text = 'NEW ARRIVALS 2025' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      className="hidden md:flex flex-col items-center justify-center w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-[#052922]/90 backdrop-blur-md border border-[#B8893D] text-[#E8D4B7] shadow-luxury select-none"
    >
      <div className="flex gap-0.5 mb-0.5">
        {[...Array(3)].map((_, i) => (
          <Sparkles key={i} className="w-2.5 h-2.5 text-[#B8893D]" />
        ))}
      </div>
      <span className="text-[9px] lg:text-[10px] tracking-widest font-bold uppercase text-center leading-tight px-1">
        NEW
        <br />
        ARRIVALS
      </span>
      <span className="text-[10px] lg:text-[11px] text-[#B8893D] font-bold mt-0.5">2025</span>
    </motion.div>
  );
}
