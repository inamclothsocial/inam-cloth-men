import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function MobileMenuItem({ item, index, itemVariants, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubmenu = Boolean(item.children?.length || item.groups?.length);

  return (
    <motion.li custom={index} initial="hidden" animate="visible" variants={itemVariants}>
      {hasSubmenu ? (
        <div>
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-[13px] font-medium text-[#18221F] hover:text-[#426E5F] hover:bg-[#F5EBDD]/70 transition-all cursor-pointer select-none"
          >
            <span className="capitalize">{item.label}</span>
            <ChevronRight
              className={`w-4 h-4 text-[#6F756F]/60 transition-transform duration-200 ${
                isExpanded ? 'rotate-90 text-[#426E5F]' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pl-4 pr-1 py-1.5 space-y-2 bg-black/[0.02] rounded-xl my-1 border-l-2 border-[#426E5F]/30">
                  {item.isGrouped && item.groups ? (
                    item.groups.map((group) => (
                      <div key={group.groupTitle} className="pt-1.5 first:pt-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-black px-3 block mb-1">
                          {group.groupTitle}
                        </span>
                        <ul className="space-y-0.5 list-none p-0 m-0">
                          {group.items.map((sub) => (
                            <li key={sub.id}>
                              <NavLink
                                to={sub.path}
                                onClick={onClose}
                                className="block px-3 py-1.5 text-xs text-[#18221F] hover:text-[#426E5F] hover:bg-[#F5EBDD]/60 rounded-lg transition-colors"
                              >
                                {sub.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <ul className="space-y-0.5 list-none p-0 m-0">
                      {item.children?.map((sub) => (
                        <li key={sub.id}>
                          <NavLink
                            to={sub.path}
                            onClick={onClose}
                            className="block px-3 py-1.5 text-xs text-[#18221F] hover:text-[#426E5F] hover:bg-[#F5EBDD]/60 rounded-lg transition-colors"
                          >
                            {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <NavLink
          to={item.path}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-[13px] font-medium transition-all ${
              isActive
                ? 'bg-[#CAB27E]/20 text-[#426E5F] font-bold border-l-4 border-[#426E5F] shadow-2xs'
                : 'text-[#18221F] hover:text-[#426E5F] hover:bg-[#F5EBDD]/70'
            }`
          }
        >
          <span className="capitalize">{item.label}</span>
        </NavLink>
      )}
    </motion.li>
  );
}
