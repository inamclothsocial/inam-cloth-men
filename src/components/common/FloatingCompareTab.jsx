import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  openCompareModal,
  selectCompareCount,
} from '../../store/slices/compareSlice';

export default function FloatingCompareTab() {
  const dispatch = useDispatch();
  const compareCount = useSelector(selectCompareCount);

  return (
    <motion.button
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onClick={() => dispatch(openCompareModal())}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#6fa993] hover:bg-[#5a937e] text-white flex flex-col items-center justify-center py-3.5 px-2 rounded-l-xl shadow-[0_4px_16px_rgba(0,0,0,0.18)] cursor-pointer select-none transition-all duration-300 hover:-translate-x-1 focus:outline-none group border-y border-l border-[#6fa993]/40"
      aria-label={`Open compare drawer, ${compareCount} items selected`}
    >
      <span className="[writing-mode:vertical-rl] rotate-180 text-xs sm:text-[13px] font-semibold tracking-wider text-white mb-2 group-hover:tracking-widest transition-all">
        Compare
      </span>
      <span className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-white text-[#18221F] font-bold text-[11px] flex items-center justify-center shadow-xs transition-transform group-hover:scale-110">
        {compareCount}
      </span>
    </motion.button>
  );
}
