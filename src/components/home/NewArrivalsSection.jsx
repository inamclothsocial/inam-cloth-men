import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../common/Container';
import { INSTAGRAM_PRODUCTS } from '../../data/productsData';
import ProductCard from './ProductCard';

export default function NewArrivalsSection() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTouchedCardId, setActiveTouchedCardId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const checkScrollBounds = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    setScrollProgress(scrollLeft / (scrollWidth - clientWidth || 1));
  };

  useEffect(() => {
    checkScrollBounds();
    window.addEventListener('resize', checkScrollBounds);
    return () => window.removeEventListener('resize', checkScrollBounds);
  }, []);

  const scrollBy = (dir) => scrollRef.current?.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });
  const onMouseDown = (e) => { setIsDragging(true); setStartX(e.pageX - scrollRef.current.offsetLeft); setScrollStart(scrollRef.current.scrollLeft); };
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    scrollRef.current.scrollLeft = scrollStart - (e.pageX - scrollRef.current.offsetLeft - startX) * 1.5;
  };
  const onWheel = (e) => {
    if (scrollRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) scrollRef.current.scrollLeft += e.deltaY;
  };

  return (
    <section className="py-8 sm:py-12 bg-white overflow-hidden" aria-label="New Arrivals">
      <Container size="wide">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-xl sm:text-2xl font-semibold text-[#18221F] tracking-tight">
              New Arrivals
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="text-xs sm:text-sm text-[#6F756F] mt-1.5">
              Shop the latest arrivals before they sell out
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <Link to="/new-arrivals" className="text-xs sm:text-sm font-semibold text-[#18221F] hover:text-[#6fa993] transition-colors flex items-center gap-1 group py-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }} className="relative group/carousel">
          {canScrollLeft && (
            <button onClick={() => scrollBy('left')} className="hidden sm:flex absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-[#18221F] hover:bg-[#6fa993] hover:text-white border border-[#CAB27E]/40 shadow-lg items-center justify-center transition-all hover:scale-110 focus:outline-none cursor-pointer" aria-label="Scroll Left">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={checkScrollBounds}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
            onWheel={onWheel}
            className={`flex gap-3.5 sm:gap-6 overflow-x-auto snap-x snap-mandatory pt-1 pb-2 w-full [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth overscroll-x-contain select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
            {INSTAGRAM_PRODUCTS.map((product) => (
              <div key={`arrival-${product.id}`} className="shrink-0 snap-start">
                <ProductCard product={product} isActiveTouched={activeTouchedCardId === product.id} onTouchCard={(id) => setActiveTouchedCardId((p) => (p === id ? null : id))} />
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button onClick={() => scrollBy('right')} className="hidden sm:flex absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-[#18221F] hover:bg-[#6fa993] hover:text-white border border-[#CAB27E]/40 shadow-lg items-center justify-center transition-all hover:scale-110 focus:outline-none cursor-pointer" aria-label="Scroll Right">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mt-5 flex justify-center">
          <div className="w-28 sm:w-36 h-1 bg-[#E9D8C4]/60 rounded-full overflow-hidden">
            <div style={{ width: '35%', transform: `translateX(${scrollProgress * 185}%)` }} className="h-full bg-[#6fa993] rounded-full transition-transform duration-150 will-change-transform" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
