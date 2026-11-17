import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_SLIDES } from '../../data/heroSlides';
import { selectHomeBanners } from '../../store/slices/navigationSlice';
import { useHeroSlider } from '../../hooks/useHeroSlider';
import HeroSlide from './HeroSlide';
import HeroControls from './HeroControls';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const dynamicBanners = useSelector(selectHomeBanners);
  const slides = dynamicBanners?.length > 0 ? dynamicBanners : HERO_SLIDES;

  const {
    currentIndex,
    direction,
    goToSlide,
    nextSlide,
    prevSlide,
    pause,
    resume,
  } = useHeroSlider({
    totalSlides: slides.length,
    interval: 4500,
  });

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    pause();
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 45) {
      nextSlide();
    } else if (distance < -45) {
      prevSlide();
    }
    setTouchStart(0);
    setTouchEnd(0);
    resume();
  };

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="INAM CLOTH Banner Carousel"
      className="relative w-full aspect-[1505/1045] sm:aspect-[2066/761] overflow-hidden bg-[#F5EBDD] select-none touch-pan-y"
    >
      <AnimatePresence initial={false} custom={direction}>
        <HeroSlide
          key={currentSlide?.id || currentIndex}
          slide={currentSlide}
          direction={direction}
        />
      </AnimatePresence>

      <HeroControls
        slides={slides}
        currentIndex={currentIndex}
        onPrev={prevSlide}
        onNext={nextSlide}
        onDotClick={goToSlide}
      />
    </motion.section>
  );
}
