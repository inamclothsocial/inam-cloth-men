import React from 'react';

export default function Badge({ children, variant = 'gold', size = 'sm', className = '' }) {
  const variants = {
    gold: 'bg-[#B8893D]/10 text-[#B8893D] border-[#B8893D]/30',
    green: 'bg-[#073C32]/10 text-[#073C32] border-[#073C32]/30',
    sage: 'bg-[#6fa993]/15 text-[#0A3028] border-[#6fa993]/40',
    dark: 'bg-[#073C32] text-white border-transparent',
    outline: 'bg-transparent text-[#18221F] border-[#E8D4B7]',
  };

  const sizes = {
    xs: 'text-[9px] px-1.5 py-0.5 tracking-wider uppercase font-medium',
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wider uppercase font-medium',
    md: 'text-xs px-3 py-1 tracking-wider uppercase font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
