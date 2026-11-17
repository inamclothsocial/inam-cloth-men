import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';

const SIZE_CHART = [
  { size: '40 (L)', bust: '40"', waist: '36"', hip: '42"', length: '46"' },
  { size: '42 (XL)', bust: '42"', waist: '38"', hip: '44"', length: '47"' },
  { size: '44 (XXL)', bust: '44"', waist: '40"', hip: '46"', length: '47"' },
  { size: '46 (3XL)', bust: '46"', waist: '42"', hip: '48"', length: '48"' },
];

export default function SizeGuideModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 z-10 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#E9D8C4] pb-3">
              <div className="flex items-center gap-2 text-[#18221F]">
                <Ruler className="w-5 h-5 text-[#6fa993]" />
                <h3 className="font-sans text-lg font-bold">Standard Size Guide (Inches)</h3>
              </div>
              <button onClick={onClose} className="p-1 text-gray-500 hover:text-black cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-[#18221F]">
                <thead className="bg-[#6fa993]/15 text-[#426E5F] uppercase font-bold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 rounded-l-lg">Size</th>
                    <th className="py-2.5 px-3">Bust</th>
                    <th className="py-2.5 px-3">Waist</th>
                    <th className="py-2.5 px-3">Hip</th>
                    <th className="py-2.5 px-3 rounded-r-lg">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9D8C4]/60">
                  {SIZE_CHART.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/60 transition-colors font-medium">
                      <td className="py-2.5 px-3 font-bold text-[#426E5F]">{row.size}</td>
                      <td className="py-2.5 px-3">{row.bust}</td>
                      <td className="py-2.5 px-3">{row.waist}</td>
                      <td className="py-2.5 px-3">{row.hip}</td>
                      <td className="py-2.5 px-3">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-[#6F756F] leading-relaxed italic bg-white/70 p-3 rounded-xl border border-[#E9D8C4]">
              * Measurements are in inches. For semi-stitched outfits, fabric can be tailored up to 48" bust.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
