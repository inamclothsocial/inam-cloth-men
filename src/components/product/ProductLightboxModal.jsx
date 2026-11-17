import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductLightboxModal({ isOpen, onClose, images = [], initialIndex = 0, productName = '' }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1));
      else if (e.key === 'ArrowRight') setCurrentIndex((p) => (p === images.length - 1 ? 0 : p + 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, onClose]);

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 40) setCurrentIndex((p) => (p === images.length - 1 ? 0 : p + 1));
    else if (diff < -40) setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1));
    setTouchStartX(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0d0d] select-none">
        {/* Top Centered Counter Capsule Pill */}
        <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <span className="px-4 py-1.5 rounded-full bg-[#202020] text-gray-200 text-xs font-sans font-medium shadow-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        {/* Top-Right Circular Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-5 sm:right-6 z-50 w-9 h-9 rounded-full bg-[#202020] hover:bg-[#2c2c2c] text-gray-200 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close fullscreen"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Laptop: Left Screen Thumbnails (Pinned to left side of screen) */}
        <div className="hidden md:flex flex-col gap-3.5 absolute left-6 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-30">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-16 sm:w-20 aspect-[3/4] rounded-xl overflow-hidden transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'border-2 border-[#D8C7A5] scale-102 shadow-md'
                  : 'border-2 border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>

        {/* Center: Main Image (100% Screen Centered) */}
        <div className="relative flex items-center justify-center max-w-full max-h-full px-4">
          {/* Prev Arrow - Laptop Only */}
          <button
            onClick={() => setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1))}
            className="hidden md:flex absolute -left-14 lg:-left-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#202020] hover:bg-[#2c2c2c] text-white items-center justify-center transition-colors cursor-pointer shadow-md"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4.5 h-4.5" />
          </button>

          {/* Centered Photo with Touch Swipe on Mobile */}
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={images[currentIndex]}
            alt={productName || 'Product'}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="max-h-[68vh] md:max-h-[82vh] max-w-[88vw] md:max-w-[55vw] lg:max-w-[48vw] object-cover rounded-2xl shadow-2xl touch-pan-y"
          />

          {/* Next Arrow - Laptop Only */}
          <button
            onClick={() => setCurrentIndex((p) => (p === images.length - 1 ? 0 : p + 1))}
            className="hidden md:flex absolute -right-14 lg:-right-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#202020] hover:bg-[#2c2c2c] text-white items-center justify-center transition-colors cursor-pointer shadow-md"
            aria-label="Next"
          >
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Mobile: Horizontal Thumbnails at Screen Bottom */}
        <div className="flex md:hidden absolute bottom-5 inset-x-0 items-center justify-center gap-2.5 z-30 overflow-x-auto px-4 py-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-12 h-16 rounded-lg overflow-hidden transition-all cursor-pointer shrink-0 ${
                currentIndex === idx
                  ? 'border-2 border-[#D8C7A5] scale-105 shadow-md'
                  : 'border-2 border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
}
