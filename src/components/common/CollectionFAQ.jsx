import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function CollectionFAQ({ collectionName }) {
  const [openIdx, setOpenIdx] = useState(-1);
  const name = collectionName || 'Signature';

  const faqs = [
    {
      q: `What fabric quality and embroidery defines the ${name} Collection?`,
      a: `The ${name} Collection is handcrafted using 100% authentic pure organza, festive chiffon, and raw silk with intricate zari and sequin embellishments for grand celebrations.`,
    },
    {
      q: `Are ${name} pieces available in unstitched or ready-to-wear sizes?`,
      a: `Yes, ${name} includes unstitched 3-piece luxury sets with generous stitching margins as well as tailored ready-to-wear sizes (L, XL, XXL, 3XL).`,
    },
    {
      q: `What are the delivery timelines for ${name} orders?`,
      a: `We provide 100% FREE express shipping across India. Delivery takes 7-10 days for Delhi/NCR and 10-14 business days across other states.`,
    },
    {
      q: `What is the return or exchange policy for ${name} outfits?`,
      a: `To guarantee absolute brand authenticity and exclusive perfection, we follow a strict No Return / No Exchange policy. Our team is available on WhatsApp to share video close-ups and sizing measurements before dispatch.`,
    },
    {
      q: `How should I wash and preserve garments from ${name}?`,
      a: `To protect hand-embroidered zari and pure fabrics, Dry Clean Only is strictly advised. Store folded in muslin cloth away from moisture.`,
    },
  ];

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
          {name} Collection FAQs
        </h2>
        <p className="text-xs sm:text-sm text-[#6F756F] mt-1.5">
          Frequently asked questions regarding fabric quality, stitching, and express delivery for {name}.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, idx) => {
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
                <ChevronDown className={`w-4 h-4 text-[#426E5F] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
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
