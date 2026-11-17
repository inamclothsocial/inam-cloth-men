import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function ExchangeReturnPolicy() {
  const points = [
    {
      num: '1',
      title: 'Order Cancellation & Exchange',
      description: 'Order Cannot be cancelled returned or exchanged once they have been placed.'
    },
    {
      num: '2',
      title: 'Refund Policy',
      description: 'NO REFUND / NO EXCHANGE'
    },
    {
      num: '3',
      title: 'Quality Check & Packaging',
      description: 'We have a Proper Team that check defects and do packaging. So our team makes it sure that there is no defect in our Articles.'
    }
  ];

  return (
    <div className="bg-[#FAF9F5] min-h-screen pt-8 sm:pt-12 pb-12 sm:pb-16 select-none">
      <Container size="default" className="px-4 sm:px-6 md:px-8 max-w-3xl mx-auto">
        <Breadcrumbs items={[{ label: 'No Exchange & Return' }]} />

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-6 sm:mb-8 pt-1"
        >
          <span className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-[#CAB27E] mb-1.5 block">
            Store Guidelines
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-[#18221F] tracking-tight">
            Return & Exchange Policy
          </h1>
          <div className="w-10 h-0.5 bg-[#6fa993] mx-auto mt-2.5 rounded-full" />
        </motion.div>

        {/* Compact Policy Cards */}
        <div className="space-y-2.5 sm:space-y-3">
          {points.map((point, idx) => (
            <motion.div
              key={point.num}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-xl p-3.5 sm:p-4 border border-gray-100/90 shadow-2xs hover:shadow-xs transition-shadow flex items-start gap-3 sm:gap-3.5"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#6fa993]/12 text-[#426E5F] flex items-center justify-center shrink-0 mt-0.5 font-sans font-bold text-xs sm:text-sm">
                {point.num}
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <h3 className="font-sans text-xs sm:text-[13px] font-bold text-[#18221F]">
                  {point.title}
                </h3>
                <p className="text-[11.5px] sm:text-xs text-[#555E59] leading-relaxed font-normal">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact Support Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 p-3.5 sm:p-4 rounded-xl bg-white/80 border border-dashed border-[#CAB27E]/50 flex items-start gap-2.5"
        >
          <HelpCircle className="w-4 h-4 text-[#CAB27E] shrink-0 mt-0.5" />
          <div className="text-[11.5px] text-[#6F756F] space-y-0.5">
            <p className="font-semibold text-[#18221F]">Need Clarification on an Order?</p>
            <p className="leading-relaxed">
              Before placing your order, please verify your size, color, and address details. For any product inquiries, our dedicated team is always available via WhatsApp support.
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
