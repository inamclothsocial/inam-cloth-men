import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroControls({
  slides,
  currentIndex,
  onPrev,
  onNext,
  onDotClick,
}) {
  return (
    <>
      {/* Left Arrow Button - Desktop only */}
      <button
        onClick={onPrev}
        className="hidden sm:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#18221F] hover:text-[#6fa993] border border-[#CAB27E]/40 items-center justify-center transition-all duration-200 focus:outline-none shadow-sm hover:scale-105"
        aria-label="Previous Banner"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right Arrow Button - Desktop only */}
      <button
        onClick={onNext}
        className="hidden sm:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-[#18221F] hover:text-[#6fa993] border border-[#CAB27E]/40 items-center justify-center transition-all duration-200 focus:outline-none shadow-sm hover:scale-105"
        aria-label="Next Banner"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Center Indicator Dots (Active Dot Scales Up in Place) */}
      <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 pointer-events-auto">
        {slides.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={index}
              onClick={() => onDotClick(index)}
              className="relative p-1 focus:outline-none flex items-center justify-center"
              aria-label={`Go to banner ${index + 1}`}
            >
              {/* Dot Base */}
              <div
                className={`transition-all duration-300 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.3)] ${
                  isActive
                    ? 'w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#6fa993] scale-110 shadow-[0_2px_6px_rgba(111,169,147,0.5)]'
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />

              {/* Active Morphing Spring Ring/Glow */}
              {isActive && (
                <motion.div
                  layoutId="active-hero-dot-indicator"
                  className="absolute inset-0 m-auto w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-[#6fa993]/60 pointer-events-none"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 26,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
