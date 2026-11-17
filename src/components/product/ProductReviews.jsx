import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Ayesha Khan',
    role: 'Verified Buyer, Delhi',
    rating: 5,
    comment: "Inam Cloth is probably one of the best ethnic fashion labels I've come across. Exquisite embroidery, premium pure fabric, and above all, super regal drape.",
  },
  {
    name: 'Fatima Zahra',
    role: 'Verified Buyer, Mumbai',
    rating: 5,
    comment: "The suit arrived in luxury packaging and the pure chiffon feel is genuinely breathtaking. The zari threadwork does not snag at all. Absolutely worth it!",
  },
  {
    name: 'Mariam Siddiqui',
    role: 'Verified Buyer, Bangalore',
    rating: 5,
    comment: "Tailoring and cut margins given are very generous. My master tailor was full of praise for the fabric density and sheen. Received so many compliments!",
  },
  {
    name: 'Zainab Ali',
    role: 'Verified Buyer, Hyderabad',
    rating: 5,
    comment: "Ordered for my sister's wedding festivities. Delivered in 5 days across state lines. The festive colors match the catalog photoshoot 100%.",
  },
  {
    name: 'Sana Parveen',
    role: 'Verified Buyer, Kolkata',
    rating: 5,
    comment: "The four-sided embroidered dupatta alone is worth the price. Handcrafted luxury at its best. Extremely pleased with my purchase.",
  },
  {
    name: 'Hina Sheikh',
    role: 'Verified Buyer, Lucknow',
    rating: 5,
    comment: "Such soft, breathable fabric with authentic festive sparkle. Smooth shopping experience and fast doorstep delivery. Highly recommended!",
  },
];

export default function ProductReviews() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-14 pt-8 border-t border-[#E9D8C4]/60 select-none">
      {/* Clean Header: Heading Only without Stars/Verified line */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#18221F]">
          Customer Reviews
        </h2>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-[#6fa993] hover:text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-[#6fa993] hover:text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Compact Horizontal Scroll Testimonial Cards with Rating in Top-Right */}
      <div
        ref={scrollRef}
        className="flex gap-3.5 sm:gap-4 overflow-x-auto pb-3 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
      >
        {REVIEWS.map((rev, idx) => (
          <div
            key={idx}
            className="w-[240px] sm:w-[280px] md:w-[300px] shrink-0 snap-start p-4 sm:p-5 bg-white rounded-2xl border border-gray-100/90 shadow-2xs relative flex flex-col justify-between"
          >
            <div>
              {/* Header: Left Mint Quote, Right Golden Stars */}
              <div className="flex items-center justify-between mb-2">
                <svg className="w-6 h-6 text-[#A8D5C2] opacity-85" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Review Testimonial Text */}
              <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed font-normal">
                {rev.comment}
              </p>
            </div>

            {/* Author Name & Subtitle */}
            <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex flex-col">
              <h4 className="font-bold text-xs text-slate-900 tracking-wide uppercase">
                {rev.name}
              </h4>
              <p className="text-[10.5px] text-slate-500 mt-0.5">
                {rev.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
