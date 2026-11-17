import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { selectTopNavLinks, selectCategoryNavLinks } from '../../store/slices/navigationSlice';
import NavDropdown from './NavDropdown';

export default function NavLinks({ className = '', activeMegaMenu, onOpenMegaMenu, onCloseMegaMenu }) {
  const topNavLinks = useSelector(selectTopNavLinks);
  const categoryNavLinks = useSelector(selectCategoryNavLinks);
  const location = useLocation();
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const openTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const clearTimers = () => {
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handleMouseEnter = (item) => {
    clearTimers();
    setOpenDropdownId(null);
    if (onCloseMegaMenu) onCloseMegaMenu(true);

    if (item.isMegaMenu) {
      openTimeoutRef.current = setTimeout(() => {
        if (onOpenMegaMenu) onOpenMegaMenu(item);
      }, 500);
    } else if (item.children?.length || item.groups?.length) {
      openTimeoutRef.current = setTimeout(() => {
        setOpenDropdownId(item.id);
      }, 500);
    }
  };

  const handleMouseLeave = (item) => {
    clearTimers();
    closeTimeoutRef.current = setTimeout(() => setOpenDropdownId(null), 180);
    if ((item?.isMegaMenu || activeMegaMenu) && onCloseMegaMenu) onCloseMegaMenu(false);
  };

  const handleCancelClose = () => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); };
  useEffect(() => () => clearTimers(), []);

  const isLinkActive = (path) => {
    if (!path) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || (path !== '/shop-by-category' && path !== '/collections' && location.pathname.startsWith(path));
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-1 xl:gap-1.5 h-full ${className}`}>
      {/* Row 1 (Top): General Utility Links */}
      <ul className="flex items-center justify-center gap-6 xl:gap-8 list-none m-0 p-0">
        {(topNavLinks || []).map((item) => (
          <li key={item.id} className="relative">
            <NavLink
              to={item.path}
              end={item.path === '/'}
              onMouseEnter={() => { clearTimers(); setOpenDropdownId(null); onCloseMegaMenu?.(true); }}
              className={({ isActive }) =>
                `group relative inline-flex flex-col items-center py-1 text-[13.5px] xl:text-[14px] font-medium tracking-normal transition-colors duration-200 capitalize focus:outline-none select-none ${
                  isActive ? 'text-[#568977]' : 'text-[#111111] hover:text-[#568977]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#568977] rounded-full transition-transform duration-300 ease-out origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Row 2 (Bottom): Category Dropdown Links */}
      <nav aria-label="Category Navigation" className="relative flex items-center justify-center h-8.5 px-1">
        <ul className="flex items-center justify-center gap-6 xl:gap-8 list-none m-0 p-0 relative z-20 h-full">
          {(categoryNavLinks || []).map((item) => {
            const isDropdownOpen = openDropdownId === item.id;
            const isMegaOpen = item.isMegaMenu && Boolean(activeMegaMenu);
            const isHighlighted = isDropdownOpen || isMegaOpen || isLinkActive(item.path);

            return (
              <li
                key={item.id}
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={() => handleMouseLeave(item)}
              >
                <div className="relative flex items-center h-full">
                  <div
                    onClick={() => {
                      if (item.isMegaMenu && onOpenMegaMenu) onOpenMegaMenu(item);
                      else if (item.children?.length || item.groups?.length) setOpenDropdownId((p) => p === item.id ? null : item.id);
                    }}
                    className={`group relative z-40 inline-flex flex-col items-center cursor-pointer px-1 py-1 text-[14px] xl:text-[15px] font-medium tracking-normal transition-colors duration-200 focus:outline-none whitespace-nowrap capitalize select-none hover:text-[#568977] ${
                      isHighlighted ? 'text-[#568977]' : 'text-[#111111]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#568977] rounded-full transition-transform duration-300 ease-out origin-left ${
                        isHighlighted ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </div>

                  {!item.isMegaMenu && (
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <NavDropdown item={item} isOpen={isDropdownOpen} onClose={() => setOpenDropdownId(null)} onCancelClose={handleCancelClose} />
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
