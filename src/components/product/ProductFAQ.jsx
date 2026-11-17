import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'What fabric quality and embroidery work is used in this outfit?',
    a: 'Each masterpiece is handcrafted using 100% authentic premium Organza, Pure Chiffon, or Raw Silk featuring intricate Zari, Threadwork, and hand-embellished sequins designed for regal celebratory occasions.',
  },
  {
    q: 'How does custom size and stitching work?',
    a: 'We offer standard ready-to-wear sizes (L, XL, XXL, 3XL) as well as unstitched options with generous fabric margins that can be easily customized up to 48" bust by your local master tailor.',
  },
  {
    q: 'What are the delivery timelines and shipping charges?',
    a: 'We provide 100% FREE express shipping across all states in India on all prepaid orders. Delivery to Delhi/NCR takes 7-10 days, while rest of India takes 10-15 business days.',
  },
  {
    q: 'What is the return and exchange policy?',
    a: 'To maintain pristine fabric hygiene and exclusive artisan quality, we follow a strict No Return / No Exchange policy. Our team is always available on WhatsApp to share HD video close-ups and exact measurements before dispatch.',
  },
  {
    q: 'How should I wash and care for this luxury garment?',
    a: 'Due to the delicate nature of pure zari and handcrafted embroidery, we strictly recommend Dry Clean Only. Store in muslin cloth in a cool, dry place away from direct sunlight.',
  },
];

export default function ProductFAQ() {
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <div className="mt-14 pt-8 border-t border-[#E9D8C4]/60 select-none">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto mb-6"
      >
        <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#18221F]">
          Frequently Asked Questions
        </h2>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className={`rounded-2xl border transition-colors duration-300 overflow-hidden bg-white ${
                isOpen ? 'border-[#6fa993] shadow-xs' : 'border-[#E9D8C4]/70 hover:border-[#6fa993]/50'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-[#18221F] cursor-pointer"
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#426E5F] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-[13px] text-[#6F756F] leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
