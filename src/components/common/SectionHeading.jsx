import React from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className = '',
}) {
  return (
    <div className={`space-y-1.5 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-[#CAB27E]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-sans tracking-tight text-[#18221F] font-semibold">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs sm:text-sm text-[#6F756F] max-w-xl mx-auto leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
