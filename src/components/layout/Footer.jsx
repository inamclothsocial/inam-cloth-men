import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Container from '../common/Container';
import { selectNavLinks, selectBrandInfo } from '../../store/slices/navigationSlice';
import { showToast } from '../../store/slices/uiSlice';

const POLICIES = [
  { label: 'No Exchange & Return', path: '/exchange-return' },
  { label: 'Shipping policy', path: '/shipping-policy' },
  { label: 'Terms & condition', path: '/terms-conditions' },
  { label: 'Privacy policy', path: '/privacy-policy' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navLinks = useSelector(selectNavLinks);
  const brandInfo = useSelector(selectBrandInfo);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return dispatch(showToast('Please enter a valid email address.'));
    dispatch(showToast('Thank you for subscribing to INAM CLOTH VIP Club!'));
    setEmail('');
  };

  return (
    <footer className="bg-[#18221F] text-[#FBF8F2] pt-14 pb-8 border-t border-[#CAB27E]/30 select-none rounded-t-[28px] sm:rounded-t-[40px] shadow-luxury overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-4">
            <img src={brandInfo.logoUrl} alt="INAM CLOTH" className="h-16 w-auto object-contain brightness-110" />
            <p className="text-xs text-[#E8D4B7] leading-relaxed">
              Timeless luxury women’s ethnic fashion, designed for modern grace, comfort, and celebrating every occasion with poise.
            </p>
            <div className="space-y-2 text-xs text-[#E8D4B7]/80 pt-1">
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#CAB27E]" /><span>{brandInfo.phone}</span></p>
              <p className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 text-[#CAB27E] shrink-0 mt-0.5" /><span>{brandInfo.address}</span></p>
            </div>
          </motion.div>

          {/* Column 2: Main Menu */}
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#CAB27E] mb-4">Main Menu</h4>
            <ul className="space-y-2.5 text-xs text-[#E8D4B7]/90 list-none p-0">
              {(navLinks || []).map((link) => (
                <li key={link.id}>
                  <Link to={link.path} className="hover:text-white transition-colors flex items-center gap-1 group">
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#CAB27E]" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Our Policy */}
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#CAB27E] mb-4">Our Policy</h4>
            <ul className="space-y-2.5 text-xs text-[#E8D4B7]/90 list-none p-0">
              {POLICIES.map((p, idx) => (
                <li key={idx}>
                  <Link to={p.path} className="hover:text-white transition-colors">{p.label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Heritage Correspondence (Newsletter inside footer matching Image 2) */}
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#CAB27E]">HERITAGE CORRESPONDENCE</h4>
            <p className="text-xs text-[#E8D4B7]/80 leading-relaxed">
              Register your email below to receive instant launches of winter unstitched catalog listings, exclusive holiday voucher packages, and bespoke tailored coordinate guides.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="relative flex items-center rounded-xl bg-white/[0.07] border border-white/15 p-1 focus-within:border-[#6fa993] transition-colors">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                className="w-full bg-transparent pl-3 pr-2 py-2 text-xs text-[#FBF8F2] placeholder-[#E8D4B7]/50 outline-none focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#6fa993] hover:bg-[#568977] text-white text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 shadow-xs"
              >
                JOIN
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Copyright Strip */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }} className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#E8D4B7]/60 gap-3">
          <p>Copyright © 2025 <span className="text-[#CAB27E] font-medium">Inam Cloth</span>. All rights reserved.</p>
          <p>Developed by <span className="text-[#6fa993] font-medium">Socially Connect</span></p>
        </motion.div>
      </Container>
    </footer>
  );
}
