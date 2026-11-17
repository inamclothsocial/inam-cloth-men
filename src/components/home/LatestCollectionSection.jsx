import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Container from '../common/Container';
import ProductCard from './ProductCard';
import { fetchProductsByCollection } from '../../services/productService';
import { INSTAGRAM_PRODUCTS } from '../../data/productsData';

export default function LatestCollectionSection() {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState(INSTAGRAM_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTouchedCardId, setActiveTouchedCardId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  // Fetch real "Instagram Sale" collection directly from Shopify
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchProductsByCollection('instagram-sale', 24)
      .then((shopifyProducts) => {
        if (!isMounted) return;
        if (shopifyProducts && shopifyProducts.length > 0) {
          setProducts(shopifyProducts);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Error fetching Shopify Instagram Sale collection:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
  }, [products]);

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });
  };

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollStart(scrollRef.current.scrollLeft);
  };
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    scrollRef.current.scrollLeft = scrollStart - (e.pageX - scrollRef.current.offsetLeft - startX) * 1.5;
  };
  const onWheel = (e) => {
    if (scrollRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-white overflow-hidden select-none" aria-label="Latest Collection">
      <Container size="wide">
        {/* Section Header matching exact photo style */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl font-bold text-[#18221F] tracking-tight"
            >
              Latest Collection
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-xs sm:text-sm text-[#6F756F] mt-1"
            >
              Shop the latest collection before they sell out
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/collections/instagram-sale"
              className="text-xs sm:text-sm font-semibold text-[#18221F] hover:text-[#6fa993] transition-colors flex items-center gap-1 group py-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Carousel of Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative group/carousel"
        >
          {canScrollLeft && (
            <button
              onClick={() => scrollBy('left')}
              className="hidden sm:flex absolute -left-3 md:-left-4 top-[40%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-[#18221F] hover:bg-[#6fa993] hover:text-white border border-gray-200 shadow-lg items-center justify-center transition-all hover:scale-110 focus:outline-none cursor-pointer"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2]" />
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
            className={`flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pt-1 pb-3 w-full [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth overscroll-x-contain ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {products.map((product, idx) => (
              <div key={product.id || `instagram-prod-${idx}`} className="shrink-0 snap-start">
                <ProductCard
                  product={product}
                  collectionSlug="instagram-sale"
                  collectionTitle="Instagram Sale"
                  isActiveTouched={activeTouchedCardId === product.id}
                  onTouchCard={(id) => setActiveTouchedCardId((p) => (p === id ? null : id))}
                />
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={() => scrollBy('right')}
              className="flex absolute right-1 sm:-right-3 md:-right-4 top-[40%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-[#18221F] hover:bg-[#6fa993] hover:text-white border border-gray-200 shadow-lg items-center justify-center transition-all hover:scale-110 focus:outline-none cursor-pointer"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5 stroke-[2]" />
            </button>
          )}
        </motion.div>

        {/* Subtle scroll progress line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-4 flex justify-center"
        >
          <div className="w-28 sm:w-36 h-1 bg-[#E9D8C4]/60 rounded-full overflow-hidden">
            <div
              style={{ width: '35%', transform: `translateX(${scrollProgress * 185}%)` }}
              className="h-full bg-[#6fa993] rounded-full transition-transform duration-150 will-change-transform"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
