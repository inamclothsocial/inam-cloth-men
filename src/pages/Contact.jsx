import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Navigation, Send, Building2 } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ContactInfoCards from '../components/contact/ContactInfoCards';
import ContactMap from '../components/contact/ContactMap';
import ContactFAQ from '../components/contact/ContactFAQ';
import CustomSelect from '../components/common/CustomSelect';
import { showToast } from '../store/slices/uiSlice';

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Order Status & Tracking',
  'Custom Stitching / Sizing',
  'Bulk & Boutique Orders',
];

export default function Contact() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(showToast('Thank you! Your message has been sent to our concierge team.'));
    setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <div className="pt-11 sm:pt-14 lg:pt-18 pb-14 sm:pb-20 bg-white min-h-screen select-none">
      <Container size="default" className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <Breadcrumbs items={[{ label: 'Contact' }]} />

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 pt-2"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold text-[#18221F] tracking-tight">Contact Us</h1>
          <p className="text-xs sm:text-sm text-[#6F756F] leading-relaxed mt-2">
            Whether you need assistance with custom measurements, bulk orders, or tracking an existing delivery, our concierge team is ready to assist you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-5">
            <a href="tel:+918527467030" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18221F] hover:bg-black text-white text-xs font-semibold tracking-wider transition-all shadow-xs hover:scale-104">
              <Phone className="w-3.5 h-3.5" /><span>CALL NOW</span>
            </a>
            <a href="https://wa.me/918130467030" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-semibold tracking-wider transition-all shadow-xs hover:scale-104">
              <MessageCircle className="w-4 h-4 fill-current" /><span>WHATSAPP</span>
            </a>
            <a href="https://maps.google.com/?q=Inam+Cloth+Emporium+Khureji+Khas+Delhi+110051" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-gray-50 text-[#18221F] border border-[#6fa993]/50 text-xs font-semibold tracking-wider transition-all shadow-xs hover:scale-104">
              <Navigation className="w-3.5 h-3.5 text-[#6fa993]" /><span>GET DIRECTIONS</span>
            </a>
          </div>
        </motion.div>

        {/* 4 Contact Information Channels (2 Cards Per Row on Mobile) */}
        <ContactInfoCards />

        {/* Send a Message Form Card with Custom Luxury Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto bg-white p-6 sm:p-9 rounded-xl border border-[#E9D8C4]/80 shadow-xs mb-10 sm:mb-14"
        >
          <div className="mb-5 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-sans font-bold text-[#18221F]">Send a Message</h3>
            <p className="text-xs text-[#6F756F] mt-1">Fill out the form below and our stylists will get back to you within 24 business hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Full Name *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" className="w-full px-3.5 py-2.5 bg-white border border-[#6fa993] rounded-lg text-xs text-[#18221F] focus:outline-none focus:ring-1 focus:ring-[#6fa993] transition-colors" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Email Address *</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="w-full px-3.5 py-2.5 bg-white border border-[#6fa993] rounded-lg text-xs text-[#18221F] focus:outline-none focus:ring-1 focus:ring-[#6fa993] transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Phone Number</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 00000 00000" className="w-full px-3.5 py-2.5 bg-white border border-[#6fa993] rounded-lg text-xs text-[#18221F] focus:outline-none focus:ring-1 focus:ring-[#6fa993] transition-colors" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Subject *</label>
                <CustomSelect value={form.subject} onChange={(val) => setForm({ ...form, subject: val })} options={SUBJECT_OPTIONS} />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Your Message *</label>
              <textarea rows="4" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can our concierge team assist you today?" className="w-full px-3.5 py-2.5 bg-white border border-[#6fa993] rounded-lg text-xs text-[#18221F] focus:outline-none focus:ring-1 focus:ring-[#6fa993] transition-colors resize-none" />
            </div>

            <button type="submit" className="w-full py-3 bg-[#6fa993] hover:bg-[#568977] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all shadow-xs hover:scale-101 active:scale-98 flex items-center justify-center gap-2 cursor-pointer">
              <Send className="w-3.5 h-3.5" /><span>SEND MESSAGE</span>
            </button>
          </form>
        </motion.div>

        {/* Business Directory / Registered Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="p-5 sm:p-6 rounded-xl bg-white border border-[#E9D8C4]/80 shadow-xs mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-2 text-[#426E5F] mb-3">
            <Building2 className="w-4 h-4 text-[#6fa993]" />
            <span className="text-xs font-bold tracking-wider uppercase">Official Business Information</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div><p className="text-[10px] text-gray-500 uppercase">Shop Name</p><p className="font-semibold text-[#18221F]">Inam Cloth Emporium</p></div>
            <div><p className="text-[10px] text-gray-500 uppercase">Trade Name</p><p className="font-semibold text-[#18221F]">Inam Cloth Emporium</p></div>
            <div><p className="text-[10px] text-gray-500 uppercase">Constitution</p><p className="font-semibold text-[#18221F]">Proprietorship</p></div>
            <div><p className="text-[10px] text-gray-500 uppercase">Helpline Support</p><p className="font-semibold text-[#426E5F]">+91 85274 67030</p></div>
          </div>
        </motion.div>

        {/* Live Interactive Map with Store Overlay Card */}
        <ContactMap />

        {/* Contact FAQs */}
        <ContactFAQ />
      </Container>
    </div>
  );
}
