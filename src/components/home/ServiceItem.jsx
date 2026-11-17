import React from 'react';

function TruckBoxIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 9 H19 V21 H4 Z" />
      <path d="M19 13 H24 L28 17 V21 H19" />
      <path d="M8.5 13 H14.5 V17 H8.5 Z" />
      <path d="M11.5 13 V17" />
      <circle cx="8.5" cy="23.5" r="2.2" />
      <circle cx="23.5" cy="23.5" r="2.2" />
    </svg>
  );
}

function LadySupportIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 14 C10 8.5 22 8.5 22 14" />
      <path d="M4 18 C8 15 24 15 28 18 C24 20 8 20 4 18 Z" />
      <circle cx="7" cy="14" r="1.5" />
      <path d="M8.5 13.5 L7.5 12" />
      <path d="M12 19 V23 C12 25 14 26 16 26 C18 26 20 25 20 23 V19" />
      <path d="M10 21 C9 23 9 26 10.5 28" />
      <path d="M22 21 C23 23 23 26 21.5 28" />
    </svg>
  );
}

function PackageReturnIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 8 H27 V22 H5 Z" />
      <path d="M16 8 V22" />
      <path d="M11 8 V13 H21 V8" />
      <path d="M21 26 H10 C7.5 26 7.5 22 10 22" />
      <path d="M13 19 L9.5 22.5 L13 26" />
    </svg>
  );
}

function GiftVoucherIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Top Ribbon Knot */}
      <path d="M10 9 C8.5 6 6.5 6.5 8.5 8.5 C9.8 9.8 11 9.8 11 9.8" />
      <path d="M12 9 C13.5 6 15.5 6.5 13.5 8.5 C12.2 9.8 11 9.8 11 9.8" />
      <path d="M10 10 L9.2 12" />
      <path d="M12 10 L12.8 12" />
      
      {/* Voucher Ticket with Scalloped Edge */}
      <path d="M5 10.5 H27 C26.2 12.2 27.8 13.2 27 15 C26.2 16.8 27.8 17.8 27 19.5 C26.2 21.2 27.8 22.2 27 24 H5 C5.8 22.2 4.2 21.2 5 19.5 C5.8 17.8 4.2 16.8 5 15 C5.8 13.2 4.2 12.2 5 10.5 Z" />
      
      {/* 3 Horizontal Lines */}
      <path d="M8 15 H14" />
      <path d="M8 17.5 H14" />
      <path d="M8 20 H14" />
      
      {/* Percentage Circle Badge */}
      <circle cx="20.5" cy="17.2" r="3.8" />
      <path d="M19 19 L22 15.5" />
      <circle cx="19.5" cy="16" r="0.55" fill="currentColor" />
      <circle cx="21.5" cy="18.5" r="0.55" fill="currentColor" />
    </svg>
  );
}

export const SERVICE_ICONS = {
  TruckBox: TruckBoxIcon,
  LadySupport: LadySupportIcon,
  PackageReturn: PackageReturnIcon,
  GiftVoucher: GiftVoucherIcon,
};

export default function ServiceItem({ item }) {
  const IconComponent = SERVICE_ICONS[item.icon] || TruckBoxIcon;

  return (
    <div className="flex items-center gap-3.5 py-3 px-3">
      {/* Circle with solid border */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#426E5F]/35 bg-[#6fa993]/15 flex items-center justify-center text-[#426E5F] shrink-0 shadow-xs">
        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>

      {/* Text Hierarchy */}
      <div className="min-w-0">
        <h4 className="text-[13px] sm:text-sm font-semibold text-[#18221F] tracking-tight leading-tight">
          {item.title}
        </h4>
        <p className="text-[11px] sm:text-xs text-[#6F756F] font-normal leading-snug mt-0.5">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}
