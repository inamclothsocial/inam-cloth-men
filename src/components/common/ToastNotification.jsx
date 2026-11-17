import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { selectToastMessage, hideToast } from '../../store/slices/uiSlice';

export default function ToastNotification() {
  const dispatch = useDispatch();
  const message = useSelector(selectToastMessage);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      dispatch(hideToast());
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, dispatch]);

  return (
    <AnimatePresence>
      {message && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[92vw] sm:max-w-md pointer-events-none flex justify-center select-none">
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center gap-3.5 bg-white/95 backdrop-blur-md text-[#111111] px-4 py-2.5 rounded-full shadow-xl shadow-black/10 border border-[#6fa993]/40 w-full sm:w-auto justify-between"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-5.5 h-5.5 rounded-full bg-[#6fa993]/20 flex items-center justify-center text-[#426E5F] shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <p className="text-xs sm:text-[13px] font-semibold tracking-wide text-[#18221F] truncate">
                {message}
              </p>
            </div>
            <button
              onClick={() => dispatch(hideToast())}
              className="text-[#6F756F] hover:text-[#18221F] transition-colors p-1 shrink-0 rounded-full hover:bg-black/5 cursor-pointer ml-2"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
