import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { termsData } from '../data/termsData';

export default function TermsConditions() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen pt-11 sm:pt-14 lg:pt-18 pb-14 sm:pb-20 select-none">
      <Container size="default" className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: termsData.breadcrumb }]} />

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 pt-2"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#CAB27E] mb-2 block">
            Legal & Terms of Service
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold text-[#18221F] tracking-tight">
            {termsData.title}
          </h1>
          <div className="w-12 h-0.5 bg-[#6fa993] mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Lead Intro Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs mb-8 space-y-3.5"
        >
          <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
            <FileText className="w-5 h-5 text-[#6fa993]" />
            <h2 className="font-sans text-base sm:text-lg font-bold text-[#18221F]">
              Overview & Acceptance
            </h2>
          </div>
          {termsData.lead.map((para, idx) => (
            <p key={idx} className="text-xs sm:text-[13px] text-[#18221F]/80 leading-relaxed">
              {para}
            </p>
          ))}
        </motion.div>

        {/* All Sections */}
        <div className="space-y-4 sm:space-y-5">
          {termsData.sections.map((sec, idx) => (
            <motion.div
              key={sec.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: (idx % 4) * 0.05 }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-xs hover:border-[#6fa993]/40 transition-colors space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#426E5F] bg-[#6fa993]/10 px-2.5 py-0.5 rounded-md">
                  {sec.num}
                </span>
                <h3 className="font-sans text-xs sm:text-sm font-bold text-[#18221F] tracking-tight">
                  {sec.title}
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-[#6F756F] leading-relaxed pt-1">
                {sec.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Governing Law Bottom Note */}
        <div className="mt-8 p-5 rounded-2xl bg-white/70 border border-dashed border-[#CAB27E]/60 flex items-center gap-3 text-xs text-[#6F756F]">
          <ShieldCheck className="w-5 h-5 text-[#CAB27E] shrink-0" />
          <p>
            These Terms of Service are governed by and construed in accordance with the laws of India and the jurisdiction of Delhi.
          </p>
        </div>
      </Container>
    </div>
  );
}
