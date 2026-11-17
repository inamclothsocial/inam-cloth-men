import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1,
  }),
  center: {
    zIndex: 2,
    x: '0%',
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 1,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 1,
  }),
};

const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '-20%' : '20%',
  }),
  center: {
    x: '0%',
  },
  exit: (direction) => ({
    x: direction < 0 ? '-20%' : '20%',
  }),
};

const transitionConfig = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1],
};

export default function HeroSlide({ slide, direction }) {
  if (!slide) return null;

  return (
    <motion.div
      custom={direction}
      variants={containerVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transitionConfig}
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#F5EBDD]"
    >
      <motion.picture
        custom={direction}
        variants={imageVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={transitionConfig}
        className="block w-full h-full will-change-transform"
      >
        {slide.mobileImage && (
          <source media="(max-width: 639px)" srcSet={slide.mobileImage} />
        )}
        <img
          src={slide.desktopImage || slide.imageUrl}
          alt={`INAM CLOTH Banner ${slide.id || ''}`}
          loading={slide.eager ? 'eager' : 'lazy'}
          fetchPriority={slide.eager ? 'high' : 'auto'}
          className="w-full h-full object-fill sm:object-cover object-center select-none"
          draggable={false}
        />
      </motion.picture>
    </motion.div>
  );
}
