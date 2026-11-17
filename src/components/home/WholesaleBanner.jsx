import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Phone, Building2 } from 'lucide-react';
import Container from '../common/Container';
import { selectBrandInfo } from '../../store/slices/navigationSlice';

export default function WholesaleBanner() {
  const brandInfo = useSelector(selectBrandInfo);
  return (
    <section className="py-5 sm:py-7 bg-transparent select-none" aria-label="Wholesale Orders">
      <Container size="wide">
        {/* Luxury Card Styled with Light Green & Gold Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl bg-white p-5 sm:p-7 border border-[#6fa993]/35 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Left: Luxury Business Icon & Title */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-[#6fa993]/15 border border-[#6fa993]/30 flex items-center justify-center shrink-0 shadow-2xs text-[#426E5F]">
              <Building2 className="w-6 h-6 stroke-[1.6]" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs tracking-[0.2em] text-[#CAB27E] uppercase font-semibold">
                B2B Inquiries &amp; Custom Orders
              </p>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-[#18221F] mt-0.5 font-sans">
                For Bulk &amp; Wholesale Purchases
              </h3>
            </div>
          </div>

          {/* Right: Theme Light Green Phone Call Button */}
          <a
            href={`tel:${(brandInfo?.phone || '').replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full bg-[#6fa993] hover:bg-[#568977] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-xs transition-all shrink-0 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>{brandInfo?.phone}</span>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
