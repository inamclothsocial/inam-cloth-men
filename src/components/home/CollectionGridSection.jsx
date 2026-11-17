import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../common/Container';
import { selectCollectionSections, selectCollectionBanners } from '../../store/slices/navigationSlice';
import { useCuratedCollections } from '../../hooks/useCuratedCollections';
import ShopByCollectionCard from './ShopByCollectionCard';

export default function CollectionGridSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const pauseUntilRef = useRef(0);

  const dynamicSections = useSelector(selectCollectionSections);
  const collectionBanners = useSelector(selectCollectionBanners);
  const collections = useCuratedCollections(dynamicSections, collectionBanners);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerPage = isMobile ? 3 : 4;
  const totalPages = Math.max(1, Math.ceil(collections.length / itemsPerPage));

  useEffect(() => { setCurrentPage(0); }, [isMobile]);

  const pauseAutoSlide = (ms = 6000) => { pauseUntilRef.current = Date.now() + ms; };
  const handleNext = (manual = false) => { if (manual) pauseAutoSlide(); setCurrentPage((p) => (p + 1) % totalPages); };
  const handlePrev = (manual = false) => { if (manual) pauseAutoSlide(); setCurrentPage((p) => (p - 1 + totalPages) % totalPages); };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovered || Date.now() < pauseUntilRef.current) return;
      setCurrentPage((p) => (p + 1) % totalPages);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, totalPages]);

  const handleTouchEnd = (e) => {
    pauseAutoSlide(6000);
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 30) { if (diff > 0) handleNext(true); else handlePrev(true); }
  };

  return (
    <section className="py-8 sm:py-14 bg-white" aria-label="SHOP BY CATEGORY">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Text & Controls Column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3.5 xl:col-span-3 flex flex-col justify-center max-w-sm"
          >
            <div className="inline-block pb-1.5 border-b-2 border-[#18221F] w-fit mb-1">
              <h2 className="font-sans text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#18221F] tracking-wider uppercase leading-tight">
                SHOP BY CATEGORY
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6F756F] leading-relaxed mt-2.5">
              Explore the newest summer arrivals — fresh prints, breezy fabrics, and styles made for the season.
            </p>
            <Link
              to="/shop-by-category"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#18221F] font-semibold text-xs sm:text-sm border border-[#E9D8C4] hover:bg-[#6fa993] hover:text-white hover:border-[#6fa993] shadow-xs transition-all w-fit mt-4 group"
            >
              <span>Shop The Look</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="mt-4 sm:mt-5 flex items-center justify-between w-full sm:max-w-[260px]">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { pauseAutoSlide(); setCurrentPage(idx); }}
                    className={`h-1 rounded-full transition-all duration-300 focus:outline-none ${currentPage === idx ? 'w-8 bg-[#18221F]' : 'w-4 bg-[#D8D2C4] hover:bg-[#A8A296]'}`}
                    aria-label={`Go to page ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handlePrev(true)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#CAB27E]/50 bg-white text-[#18221F] hover:bg-[#6fa993] hover:text-white hover:border-[#6fa993] flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-108 active:scale-95 focus:outline-none"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4.5 h-4.5 stroke-[1.8]" />
                </button>
                <button
                  onClick={() => handleNext(true)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#CAB27E]/50 bg-white text-[#18221F] hover:bg-[#6fa993] hover:text-white hover:border-[#6fa993] flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-108 active:scale-95 focus:outline-none"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4.5 h-4.5 stroke-[1.8]" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Sliding Track: Laptop 2x2 (4 items) / Mobile 1x3 (3 items) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={(e) => { pauseAutoSlide(); setTouchStartX(e.touches[0].clientX); }}
            onTouchEnd={handleTouchEnd}
            className="lg:col-span-8.5 xl:col-span-9 overflow-hidden select-none relative"
          >
            <motion.div
              animate={{ x: `-${currentPage * 100}%` }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full flex-row will-change-transform"
            >
              {Array.from({ length: totalPages }).map((_, pIdx) => (
                <div key={pIdx} className="w-full shrink-0 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-3 sm:gap-4 lg:gap-4.5 px-0.5">
                  {collections.slice(pIdx * itemsPerPage, (pIdx + 1) * itemsPerPage).map((col) => (
                    <ShopByCollectionCard key={col.id} collection={col} isMobileView={isMobile} />
                  ))}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
