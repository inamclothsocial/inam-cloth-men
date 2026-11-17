import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Info } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { privacyData } from '../data/privacyData';

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen pt-11 sm:pt-14 lg:pt-18 pb-14 sm:pb-20 select-none">
      <Container size="default" className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: privacyData.breadcrumb }]} />

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 pt-2"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#CAB27E] mb-2 block">
            Data Protection & Trust
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold text-[#18221F] tracking-tight">
            {privacyData.title}
          </h1>
          <div className="w-12 h-0.5 bg-[#6fa993] mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Intro Box & Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs mb-8 space-y-3"
        >
          <div className="flex items-center gap-2.5 pb-1">
            <Shield className="w-5 h-5 text-[#6fa993]" />
            <h2 className="font-sans text-base sm:text-lg font-bold text-[#18221F]">
              Your Privacy Matters
            </h2>
          </div>
          <p className="text-xs sm:text-[13px] text-[#18221F]/85 leading-relaxed">
            {privacyData.intro}
          </p>
          <div className="p-3.5 rounded-xl bg-[#6fa993]/10 border border-[#6fa993]/20 flex items-start gap-2.5 text-xs text-[#18221F]">
            <Info className="w-4 h-4 text-[#426E5F] shrink-0 mt-0.5" />
            <p className="font-medium">{privacyData.note}</p>
          </div>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-4 sm:space-y-5">
          {privacyData.sections.map((sec, idx) => (
            <motion.div
              key={sec.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-xs hover:border-[#6fa993]/40 transition-colors space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#6fa993]/15 text-[#426E5F] text-xs font-bold flex items-center justify-center shrink-0">
                  {sec.num}
                </span>
                <h3 className="font-sans text-xs sm:text-sm font-bold text-[#18221F]">
                  {sec.title}
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-[#6F756F] leading-relaxed pt-1 whitespace-pre-line">
                {sec.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Security Assurance Badge */}
        <div className="mt-8 p-5 rounded-2xl bg-white/70 border border-dashed border-[#CAB27E]/60 flex items-center gap-3 text-xs text-[#6F756F]">
          <Lock className="w-5 h-5 text-[#CAB27E] shrink-0" />
          <p>
            All personal information and checkout data are encrypted and secured with strict 256-bit SSL protocols.
          </p>
        </div>
      </Container>
    </div>
  );
}
