import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const truncateWords = (text, maxWords) => {
  if (text === null || text === undefined) return '';
  const str = typeof text === 'string' ? text : String(text);
  const trimmed = str.trim();
  if (!trimmed) return '';
  const words = trimmed.split(/\s+/);
  if (words.length <= maxWords) return trimmed;
  return words.slice(0, maxWords).join(' ') + '...';
};

export default function Breadcrumbs({ items = [], className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-[#6F756F] pt-1 sm:pt-1.5 mb-2.5 sm:mb-3 select-none flex-wrap ${className}`}>
      <Link to="/" className="hover:text-[#18221F] transition-colors font-normal shrink-0">
        Home
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        if (React.isValidElement(item?.label)) {
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="font-semibold text-[#18221F]">{item.label}</span>
            </React.Fragment>
          );
        }

        const labelStr = typeof item?.label === 'string' ? item.label : String(item?.label || '');
        const isDynamic = labelStr !== 'Collections' && labelStr !== 'Home' && labelStr !== 'Shop By Category';

        return (
          <React.Fragment key={labelStr || idx}>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            {isLast ? (
              <span className="font-bold text-[#18221F]">
                {isDynamic ? (
                  <>
                    <span className="inline sm:hidden">{truncateWords(labelStr, 2)}</span>
                    <span className="hidden sm:inline">{truncateWords(labelStr, 3)}</span>
                  </>
                ) : (
                  labelStr
                )}
              </span>
            ) : item.link ? (
              <Link to={item.link} className="hover:text-[#18221F] transition-colors font-normal text-[#6F756F]">
                {isDynamic ? (
                  <>
                    <span className="inline sm:hidden">{truncateWords(labelStr, 2)}</span>
                    <span className="hidden sm:inline">{truncateWords(labelStr, 3)}</span>
                  </>
                ) : (
                  labelStr
                )}
              </Link>
            ) : (
              <span className="text-[#6F756F] font-normal cursor-default select-none">
                {isDynamic ? (
                  <>
                    <span className="inline sm:hidden">{truncateWords(labelStr, 2)}</span>
                    <span className="hidden sm:inline">{truncateWords(labelStr, 3)}</span>
                  </>
                ) : (
                  labelStr
                )}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
