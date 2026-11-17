import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import { selectBrandLogos } from '../../store/slices/navigationSlice';
import { BRAND_PARTNERS } from '../../data/brandsData';

export default function BrandShowcaseSection() {
  const dynamicLogos = useSelector(selectBrandLogos);
  const logos = dynamicLogos?.length ? dynamicLogos : BRAND_PARTNERS;

  if (!logos || !logos.length) return null;

  // Ensure enough items for seamless infinite marquee loop
  const repeatCount = Math.max(4, Math.ceil(16 / (logos.length || 1)));
  const marqueeItems = Array.from({ length: repeatCount }).flatMap(() => logos);

  return (
    <section className="py-10 sm:py-14 bg-white border-t border-gray-100 overflow-hidden relative select-none" aria-label="Brand Partners">
      <Container size="wide">
        {/* Section Headline & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-7 sm:mb-9 px-4"
        >
          <h3 className="text-xl sm:text-2xl md:text-[26px] font-sans font-semibold text-[#18221F] tracking-tight">
            Trusted Fabric Partners
          </h3>
          <p className="text-xs sm:text-sm text-[#6F756F] font-normal leading-relaxed mt-1.5 max-w-xl mx-auto">
            Featuring the finest fabric mills and textile brands trusted for exceptional quality and craftsmanship.
          </p>
        </motion.div>
      </Container>

      {/* Infinite Logo Marquee Slider (Left to Right, Smooth Flow) */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left & Right Soft Edge Fades */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Continuous Smooth Scrolling Marquee Track (Left to Right) */}
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 44,
              ease: 'linear',
            },
          }}
          className="flex items-center gap-6 sm:gap-10 lg:gap-14 w-max will-change-transform"
        >
          {marqueeItems.map((brand, index) => (
            <div
              key={`${brand.id || brand.handle || index}-${index}`}
              className="flex items-center justify-center shrink-0 px-2 sm:px-4 group cursor-pointer"
            >
              <img
                src={brand.src || brand.logo}
                alt={brand.name || 'Brand Logo'}
                loading="lazy"
                className="h-10 sm:h-12 md:h-14 lg:h-15 w-auto max-w-[140px] sm:max-w-[180px] lg:max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-110 opacity-90 hover:opacity-100"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
