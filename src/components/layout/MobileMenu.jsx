import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, ChevronRight } from 'lucide-react';
import { selectIsMobileMenuOpen, closeMobileMenu } from '../../store/slices/uiSlice';
import { selectMobileNavLinks, selectBrandInfo } from '../../store/slices/navigationSlice';
import MobileActionsGrid from './MobileActionsGrid';
import MobileMenuItem from './MobileMenuItem';

const itemVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.36, delay: 0.1 + i * 0.04, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function MobileMenu() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsMobileMenuOpen);
  const mobileNavLinks = useSelector(selectMobileNavLinks);
  const brandInfo = useSelector(selectBrandInfo);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-x-0 top-14 sm:top-16 md:top-18 bottom-0 z-40 lg:hidden flex flex-col pointer-events-auto">
          {/* Backdrop below Navbar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeMobileMenu())}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Menu Panel Sliding Down Underneath the Navbar */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-h-[82vh] bg-white z-50 flex flex-col justify-between p-5 pb-6 overflow-y-auto no-scrollbar overscroll-contain shadow-2xl rounded-b-3xl border-b border-gray-100"
          >
            <div>
              {/* Quick Actions Grid */}
              <MobileActionsGrid />

              {/* Navigation Links Staggered from Left to Right */}
              <ul className="mt-4 space-y-1 list-none p-0">
                {(mobileNavLinks || []).map((item, index) => (
                  <MobileMenuItem
                    key={item.id}
                    item={item}
                    index={index}
                    itemVariants={itemVariants}
                    onClose={() => dispatch(closeMobileMenu())}
                  />
                ))}
              </ul>
            </div>

            {/* Footer Support Info */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.35 }}
              className="pt-4 mt-5 border-t border-[#E9D8C4] space-y-2 text-xs text-[#6F756F]"
            >
              <a href={`tel:${brandInfo.phone}`} className="flex items-center gap-2.5 text-[#18221F] font-medium hover:text-[#426E5F] transition-colors">
                <div className="w-7 h-7 rounded-full bg-[#6fa993]/15 text-[#426E5F] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{brandInfo.phone}</span>
              </a>
              <a href={`mailto:${brandInfo.email}`} className="flex items-center gap-2.5 text-[#18221F] hover:text-[#426E5F] transition-colors">
                <div className="w-7 h-7 rounded-full bg-[#6fa993]/15 text-[#426E5F] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>{brandInfo.email}</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
