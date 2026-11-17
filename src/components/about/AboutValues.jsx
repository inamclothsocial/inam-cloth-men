import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Crown, ShieldCheck, HeartHandshake, Gem } from 'lucide-react';

function Counter({ end, suffix = '', duration = 1.8 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    let frameId;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));
      if (progress < 1) frameId = requestAnimationFrame(step);
      else setCount(end);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { end: 15000, suffix: '+', label: 'Delighted Patrons', desc: 'Across India & worldwide' },
  { end: 100, suffix: '%', label: 'Pure Fabrics', desc: 'Tested organza, silk & chiffon' },
  { end: 50, suffix: '+', label: 'Master Artisans', desc: 'Preserving heritage zari craft' },
  { end: 24, suffix: '/7', label: 'Dedicated Support', desc: 'Pre-order video & size advice' },
];

const VALUES = [
  {
    icon: Crown,
    title: 'Artisanal Craftsmanship',
    desc: 'Each piece showcases authentic Indian needlework, intricate zari motifs, and delicate sequin detailing crafted by seasoned generational artisans.',
  },
  {
    icon: Gem,
    title: 'Pure Fabric Integrity',
    desc: 'We never compromise on textiles. Every suit is curated from breathable pure cotton, high-sheen raw silk, lightweight organza, or festive chiffon.',
  },
  {
    icon: ShieldCheck,
    title: 'Fair & Direct Pricing',
    desc: 'By working directly with master workshops, we eliminate excessive showroom markups, delivering couture elegance at honest, accessible price points.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer-Centric Care',
    desc: 'From custom styling advice to complimentary pan-India express shipping and pre-dispatch video verification, your satisfaction is our priority.',
  },
];

export default function AboutValues() {
  return (
    <div className="mt-14 sm:mt-20 select-none">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-14 sm:mb-20"
      >
        {STATS.map((s, idx) => (
          <div key={idx} className="p-5 sm:p-6 rounded-lg bg-white border border-[#E9D8C4]/70 shadow-2xs text-center">
            <p className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-[#426E5F]">
              <Counter end={s.end} suffix={s.suffix} />
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#18221F] mt-1">{s.label}</p>
            <p className="text-[11px] text-[#6F756F] mt-0.5">{s.desc}</p>
          </div>
        ))}
      </motion.div>

      <div className="text-center max-w-xl mx-auto mb-10">
        <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#CAB27E]">WHAT SETS US APART</p>
        <h3 className="text-xl sm:text-2xl font-sans font-semibold text-[#18221F] mt-1">Built on Principles of Trust &amp; Quality</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {VALUES.map((v, i) => {
          const Icon = v.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-5 sm:p-6 rounded-lg bg-white border border-[#E9D8C4]/70 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-md bg-[#6fa993]/15 text-[#426E5F] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h4 className="text-sm font-semibold text-[#18221F] mb-1.5">{v.title}</h4>
                <p className="text-xs text-[#6F756F] leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
