import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Clock, MapPin, ArrowUpRight } from 'lucide-react';

const CHANNELS = [
  {
    type: 'whatsapp',
    value: '+91 81304 67030',
    desc: 'Instant video preview & measurements',
    link: 'https://wa.me/918130467030',
    actionText: 'WhatsApp Chat',
  },
  {
    type: 'phone',
    value: '+91 85274 67030',
    desc: 'Direct order & delivery updates',
    link: 'tel:+918527467030',
    actionText: 'Call Helpline',
  },
  {
    type: 'clock',
    value: '11:00 AM – 8:00 PM',
    desc: 'Tuesday – Sunday (Monday Closed)',
    subdesc: 'Friday: 11:30AM–1PM, 2–8PM',
  },
  {
    type: 'map',
    value: 'Khureji Khas, Delhi',
    desc: 'A-68, New Noorani Market, Patparganj Rd',
    link: 'https://maps.google.com/?q=Inam+Cloth+Emporium+Khureji+Khas+Delhi+110051',
    actionText: 'View on Map',
  },
];

export default function ContactInfoCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 select-none mb-8 sm:mb-10">
      {CHANNELS.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="p-3 sm:p-4 rounded-xl bg-white border border-[#E9D8C4]/70 hover:border-[#6fa993] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
        >
          <div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#6fa993]/10 flex items-center justify-center transition-all duration-300 mb-2">
              {item.type === 'whatsapp' && <MessageCircle className="w-4 h-4 text-[#426E5F] stroke-[2.2]" />}
              {item.type === 'phone' && <Phone className="w-4 h-4 text-[#426E5F] stroke-[2.2]" />}
              {item.type === 'clock' && <Clock className="w-4 h-4 text-[#426E5F] stroke-[2.2]" />}
              {item.type === 'map' && <MapPin className="w-4 h-4 text-[#426E5F] stroke-[2.2]" />}
            </div>

            <h4 className="text-xs sm:text-[13.5px] md:text-sm font-sans font-bold text-[#18221F] tracking-tight truncate">
              {item.value}
            </h4>

            <p className="text-[10px] sm:text-[11.5px] text-[#6F756F] mt-0.5 leading-snug line-clamp-2">
              {item.desc}
            </p>

            {item.subdesc && (
              <p className="text-[9.5px] sm:text-[10px] text-[#426E5F] font-semibold mt-0.5 hidden sm:block">
                {item.subdesc}
              </p>
            )}
          </div>

          {item.link ? (
            <div className="pt-2 sm:pt-2.5 mt-1 border-t border-gray-100">
              <a
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="text-[10.5px] sm:text-xs font-semibold text-[#426E5F] group-hover:text-[#18221F] inline-flex items-center gap-1 transition-colors"
              >
                <span>{item.actionText}</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          ) : (
            <div className="pt-2 sm:pt-2.5 mt-1 border-t border-gray-100">
              <span className="text-[10.5px] sm:text-xs text-[#426E5F] font-semibold">Open Walk-ins</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
