import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';
import { SERVICE_ICONS } from './ServiceItem';
import { useScrollHeader } from '../../hooks/useScrollHeader';

const MOBILE_SERVICES = [
  { id: 'gift', icon: 'GiftVoucher', title: 'Gift Voucher', subtitle: '20% off when you shop online now' },
  { id: 'shipping', icon: 'TruckBox', title: 'Free Shipping', subtitle: 'From all orders over Rs. 3,999' },
  { id: 'return', icon: 'PackageReturn', title: 'Return & Refund', subtitle: 'No Refund / No Return' },
  { id: 'support', icon: 'LadySupport', title: 'Quality Support', subtitle: '24/7 feedback' },
];

export default function MobileServiceFab() {
  const [isOpen, setIsOpen] = useState(false);
  const { showBottomNav } = useScrollHeader();

  // Lock background body scroll when mobile gift service menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const buttonBottom = showBottomNav
    ? 'calc(84px + env(safe-area-inset-bottom, 0px))'
    : 'calc(20px + env(safe-area-inset-bottom, 0px))';

  const cardsBottom = showBottomNav
    ? 'calc(156px + env(safe-area-inset-bottom, 0px))'
    : 'calc(90px + env(safe-area-inset-bottom, 0px))';

  return (
    <div className="lg:hidden">
      {/* Backdrop overlay when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40"
          />
        )}
      </AnimatePresence>

      {/* Floating Service Cards placed above trigger */}
      <AnimatePresence>
        {isOpen && (
          <div
            style={{ bottom: cardsBottom }}
            className="fixed right-4 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto transition-all duration-300"
          >
            {MOBILE_SERVICES.map((item, index) => {
              const IconComp = SERVICE_ICONS[item.icon];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.5, y: 30, x: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20, x: 15 }}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 26,
                    delay: (MOBILE_SERVICES.length - 1 - index) * 0.06,
                  }}
                  className="flex items-center gap-3 bg-white py-2.5 px-4 rounded-full shadow-floating border border-gray-100"
                >
                  <div className="text-left">
                    <h5 className="text-xs font-semibold text-[#18221F] leading-tight">{item.title}</h5>
                    <p className="text-[10px] text-[#6F756F] leading-tight mt-0.5 whitespace-nowrap">{item.subtitle}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[#426E5F]/40 bg-[#6fa993]/15 flex items-center justify-center text-[#426E5F] shrink-0 shadow-xs">
                    {IconComp && <IconComp className="w-5 h-5" />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Fixed Bottom-Right Floating Trigger Button */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ bottom: buttonBottom }}
        className="fixed right-4 sm:right-6 z-50 w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#6fa993] text-white shadow-floating flex items-center justify-center focus:outline-none transition-all duration-300"
        aria-label="Toggle Service Guarantees"
      >
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.25 }} className="flex items-center justify-center">
          {isOpen ? (
            <X className="w-7 h-7 text-white stroke-[2]" />
          ) : (
            <Gift className="w-7.5 h-7.5 sm:w-8 sm:h-8 text-white stroke-[1.75]" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
