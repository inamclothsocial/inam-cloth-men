import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function ShippingPolicy() {
  const deliveryEstimates = [
    {
      region: 'DELHI / NCR',
      duration: '7 to 10 Days (Approx.)',
      description: 'Standard expedited metropolitan dispatch & doorstep delivery.',
      badge: 'Fastest Delivery'
    },
    {
      region: 'Rest of India',
      duration: '10 to 15 DAYS (Approx.)',
      description: 'Covering state capitals, tier-2 cities, and major municipal zones.',
      badge: 'Pan-India Reach'
    },
    {
      region: 'Village / Remote Areas',
      duration: '12 to 15 days (Approx.)',
      description: 'Delivered via trusted regional postal and surface carrier networks.',
      badge: 'Deep Coverage'
    }
  ];

  return (
    <div className="bg-[#FAF9F5] min-h-screen pt-11 sm:pt-14 lg:pt-18 pb-14 sm:pb-20 select-none">
      <Container size="default" className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: 'Shipping policy' }]} />

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 pt-2"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#CAB27E] mb-2 block">
            Delivery & Transit Times
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold text-[#18221F] tracking-tight">
            Shipping Policy
          </h1>
          <div className="w-12 h-0.5 bg-[#6fa993] mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Highlight Banner: Free Shipping & Prepaid Only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#18221F] text-[#FBF8F2] rounded-2xl p-5 sm:p-7 shadow-luxury mb-8 border border-[#CAB27E]/40"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#6fa993]/20 text-[#6fa993] flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold text-white">Free Shipping All Over India</h3>
                <p className="text-xs text-[#E8D4B7] mt-0.5">Item will be delivered with Free Shipping all over India / No COD.</p>
              </div>
            </div>
            <span className="bg-[#6fa993] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-xl shrink-0 shadow-xs">
              Prepaid Orders Only
            </span>
          </div>
        </motion.div>

        {/* Shipping Duration Title */}
        <div className="mb-4">
          <h2 className="font-sans text-lg sm:text-xl font-bold text-[#18221F] flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#6fa993]" />
            <span>Shipping Duration (All Over India)</span>
          </h2>
        </div>

        {/* Delivery Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {deliveryEstimates.map((item, idx) => (
            <motion.div
              key={item.region}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#426E5F] bg-[#6fa993]/10 px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                  <MapPin className="w-4 h-4 text-[#CAB27E]" />
                </div>
                <h3 className="font-sans text-sm sm:text-base font-bold text-[#18221F]">
                  {item.region}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-[#426E5F]">
                <CheckCircle className="w-4 h-4 text-[#6fa993] shrink-0" />
                <span>{item.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Terms Footer Note */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-gray-100 text-xs text-gray-600 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-[#CAB27E] shrink-0 mt-0.5" />
          <p>
            Delivery timelines are approximate and estimated from the date of dispatch. Real-time tracking link with courier partner details will be shared on your registered WhatsApp/email once your order ships.
          </p>
        </div>
      </Container>
    </div>
  );
}
