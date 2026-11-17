import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const CONTACT_FAQS = [
  {
    q: 'Do you have Allow To Open policy?',
    a: 'No, courier delivery partners do not permit opening parcels before delivery acceptance. However, to guarantee 100% peace of mind, every single parcel is thoroughly quality-checked and recorded with video confirmation prior to dispatch.',
  },
  {
    q: 'Do you return or exchange products?',
    a: 'To guarantee pristine fabric hygiene, exclusive handcrafted quality, and brand authenticity, INAM CLOTH operates under a strict No Return & No Exchange policy. Our team is always available on WhatsApp to share HD video close-ups and exact measurements before you order.',
  },
  {
    q: 'How much time does delivery take?',
    a: 'We provide 100% FREE express shipping across India on prepaid orders. Deliveries to Delhi/NCR take 3–5 business days, while rest of India takes 7–10 business days with real-time tracking.',
  },
  {
    q: 'Do you have a physical store?',
    a: 'Yes! You can visit our flagship retail emporium at A-68, New Noorani Market, Patparganj Rd, near SBI, Khureji Khas, Delhi 110051 (Tue–Sun: 11:00 am – 8:00 pm).',
  },
  {
    q: 'Do you offer international shipping?',
    a: 'Yes, we ship our luxury ethnic collections worldwide via express international couriers. Please reach out on WhatsApp (+91 81304 67030) for country-specific shipping rates.',
  },
  {
    q: 'What payment methods are available?',
    a: 'We accept all major prepaid methods including UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking, and Visa/Mastercard/RuPay Credit & Debit Cards via our 100% secure payment gateway.',
  },
];

export default function ContactFAQ() {
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <div className="mt-14 sm:mt-20 pt-8 border-t border-[#E9D8C4]/60 select-none">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
      >
        <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#CAB27E]">GOT QUESTIONS?</p>
        <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#18221F] mt-1">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-[#6F756F] mt-1.5">
          Find instant answers to common questions about store visits, shipping, and order guidelines.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-3">
        {CONTACT_FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
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
