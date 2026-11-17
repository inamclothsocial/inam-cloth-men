import React from 'react';
import { motion } from 'framer-motion';

export default function CollectionHeroBanner({ desktopBanner, mobileBanner, title }) {
  if (!desktopBanner && !mobileBanner && !title) return null;

  const mobileSrc = mobileBanner || desktopBanner;
  const desktopSrc = desktopBanner || mobileBanner;

  return (
    <div className="w-full select-none bg-[#F5EBDD] relative overflow-hidden aspect-[1505/1045] sm:aspect-[2066/761]">
      <picture className="w-full h-full block">
        {mobileSrc && (
          <source media="(max-width: 639px)" srcSet={mobileSrc} />
        )}
        <img
          src={desktopSrc}
          alt={title || 'Collection Banner'}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center block select-none"
        />
      </picture>

      {title && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center max-w-2xl"
          >
            <h1 className="font-sans text-base sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-[0.16em] sm:tracking-[0.22em] uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] leading-tight">
              {title}
            </h1>
          </motion.div>
        </div>
      )}
    </div>
  );
}
