import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

const MAP_QUERY = 'Inam+Cloth+Emporium+A-68+new+noorani+market+Patparganj+Rd+near+SBI+Khureji+Khas+Delhi+110051';
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

function StoreInfoCard() {
  return (
    <div className="p-5 sm:p-6 rounded-xl bg-white/95 backdrop-blur-md border border-[#E9D8C4]/80 shadow-md w-full">
      <div className="flex items-center gap-2 text-[#426E5F] mb-1">
        <MapPin className="w-4 h-4 text-[#6fa993]" />
        <span className="text-[11px] font-bold uppercase tracking-wider">Our Store</span>
      </div>

      <h3 className="font-sans text-base sm:text-lg font-bold text-[#18221F]">
        Inam Cloth Emporium
      </h3>

      <p className="text-xs text-[#6F756F] mt-1.5 leading-relaxed">
        A-68, new noorani market, Patparganj Rd, near SBI, Khureji Khas, Delhi 110051
      </p>

      <div className="mt-3 pt-3 border-t border-[#E9D8C4]/60 text-[11px] text-[#18221F]/80 space-y-1">
        <p><span className="font-semibold text-[#18221F]">Tuesday – Sunday:</span> 11:00 am – 8:00 pm</p>
        <p><span className="font-semibold text-[#18221F]">Friday:</span> 11:30 am – 1:00 pm, 2:00 – 8:00 pm</p>
        <p className="text-[#426E5F] font-semibold pt-0.5">Monday Closed</p>
      </div>

      <a
        href={DIRECTIONS_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-4 w-full py-2.5 px-4 rounded-md bg-[#6fa993] hover:bg-[#568977] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-xs hover:scale-102 cursor-pointer"
      >
        <Navigation className="w-3.5 h-3.5 fill-current" />
        <span>GET DIRECTIONS</span>
      </a>
    </div>
  );
}

export default function ContactMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14 sm:mb-20 select-none"
    >
      {/* On Mobile: Store Card is displayed JUST ABOVE the location map */}
      <div className="block sm:hidden mb-3.5">
        <StoreInfoCard />
      </div>

      {/* Interactive Google Map Container */}
      <div className="relative w-full rounded-xl overflow-hidden border border-[#E9D8C4]/80 shadow-sm bg-white">
        <div className="relative w-full h-[280px] sm:h-[450px] lg:h-[480px]">
          <iframe
            title="Inam Cloth Emporium Store Location"
            src={`https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full border-0 filter saturate-[0.95]"
            loading="lazy"
            allowFullScreen
          />

          {/* On Desktop/Laptop: Store Card floats over map on the top-right */}
          <div className="hidden sm:block absolute top-6 right-6 max-w-xs sm:max-w-sm w-full z-10">
            <StoreInfoCard />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
