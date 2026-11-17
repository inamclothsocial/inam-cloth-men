import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      delay: 0.06 + i * 0.04,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function NavDropdown({ item, isOpen, onClose, onCancelClose }) {
  if (!isOpen) return null;

  const isGrouped = Boolean(item.isGrouped && item.groups?.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -12, x: '-50%' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onCancelClose}
      className="absolute top-full mt-2 left-1/2 z-30 pointer-events-auto"
    >
      {/* Narrow bridge directly under hovered link - prevents dead zones without overlapping neighbor items */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-3.5 pointer-events-auto" />

      {/* Top Left Fillet: curves outward into navbar bottom with enhanced 28px curve */}
      <svg
        className="absolute -left-[28px] top-0 w-[28px] h-[28px] text-[#FBF8F2] pointer-events-none overflow-visible"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path d="M 28,28 A 28,28 0 0 0 0,0 L 28,0 Z" fill="currentColor" />
      </svg>

      {/* Top Right Fillet: curves outward into navbar bottom with enhanced 28px curve */}
      <svg
        className="absolute -right-[28px] top-0 w-[28px] h-[28px] text-[#FBF8F2] pointer-events-none overflow-visible"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path d="M 0,28 A 28,28 0 0 1 28,0 L 0,0 Z" fill="currentColor" />
      </svg>

      {/* Main Dropdown Pod Body - Same #FBF8F2 as Navbar */}
      <div
        className={`relative bg-[#FBF8F2] rounded-b-md overflow-visible shadow-none ${
          isGrouped ? 'w-[440px] p-4' : 'min-w-[220px] py-2'
        }`}
      >
        {isGrouped ? (
          /* Multi-column Grouped Dropdown */
          <div className="grid grid-cols-2 gap-4 divide-x divide-gray-100">
            {item.groups.map((group) => (
              <div key={group.groupTitle} className="first:pr-2 last:pl-4">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#568977] px-4 pb-1.5 mb-1.5 border-b border-gray-100">
                  {group.groupTitle}
                </h5>
                <ul className="space-y-0.5 list-none p-0 m-0">
                  {group.items.map((subItem, idx) => (
                    <motion.li
                      key={subItem.id}
                      custom={idx}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                    >
                      <NavLink
                        to={subItem.path}
                        onClick={onClose}
                        className="block px-4 py-1.5 text-xs xl:text-[13px] font-medium text-[#111111] hover:text-[#568977] hover:bg-[#EAEAEA] rounded-md transition-colors text-left whitespace-nowrap"
                      >
                        {subItem.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          /* Standard Single-column Dropdown with Left-to-Right Text Motion */
          <ul className="space-y-0.5 list-none p-0 m-0">
            {item.children?.map((subItem, idx) => (
              <motion.li
                key={subItem.id}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
              >
                <NavLink
                  to={subItem.path}
                  onClick={onClose}
                  className="block px-5 py-2 text-xs xl:text-[13px] font-medium text-[#111111] hover:text-[#568977] hover:bg-[#EAEAEA] rounded-md transition-colors text-left whitespace-nowrap"
                >
                  {subItem.label}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
