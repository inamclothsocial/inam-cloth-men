import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import Container from '../common/Container';
import { showToast } from '../../store/slices/uiSlice';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      dispatch(showToast('Please enter a valid email address.'));
      return;
    }
    dispatch(showToast('Thank you for subscribing to INAM CLOTH VIP Club!'));
    setEmail('');
  };

  return (
    <section className="bg-transparent py-7 sm:py-9 select-none">
      <Container size="default">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-5"
        >
          <div className="text-center md:text-left">
            <h3 className="text-lg sm:text-xl md:text-[22px] font-sans font-bold tracking-tight text-[#18221F]">
              Fashion Forward: Stay In The Know With Our Newsletter
            </h3>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-2.5"
          >
            <div className="relative w-full sm:w-72">
              <Mail className="w-4 h-4 text-[#6fa993] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-2.5 bg-white text-xs font-medium text-[#18221F] rounded-md border border-[#6fa993] focus:border-[#426E5F] focus:ring-1 focus:ring-[#426E5F] outline-none focus:outline-none placeholder-[#6F756F] shadow-2xs transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#6fa993] hover:bg-[#568977] text-white text-xs font-bold uppercase tracking-widest rounded-md transition-all shadow-xs shrink-0 cursor-pointer hover:scale-105 active:scale-95"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
