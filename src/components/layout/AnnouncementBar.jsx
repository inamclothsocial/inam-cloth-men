import React from 'react';
import { Truck, Tag, CreditCard } from 'lucide-react';
import Container from '../common/Container';

export default function AnnouncementBar() {
  const items = [
    { icon: Truck, text: 'FREE SHIPPING on Prepaid Orders' },
    { icon: Tag, text: 'New Festive Arrivals Just Dropped' },
    { icon: CreditCard, text: 'PREPAID ORDERS ONLY – No COD' },
  ];

  return (
    <div className="bg-[#18221F] text-[#E8D4B7] border-b border-[#CAB27E]/20 text-[11px] sm:text-xs tracking-wider py-2 select-none relative z-40">
      <Container size="wide">
        {/* Desktop: 3 items spread across */}
        <div className="hidden md:flex items-center justify-between font-medium">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-[#CAB27E]" />
                <span className="text-[#FBF8F2] tracking-widest">{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* Mobile: Smooth Marquee */}
        <div className="flex md:hidden overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee items-center gap-8 text-[11px]">
            {items.concat(items).map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-1.5 shrink-0">
                  <Icon className="w-3 h-3 text-[#CAB27E]" />
                  <span className="text-[#FBF8F2]">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
