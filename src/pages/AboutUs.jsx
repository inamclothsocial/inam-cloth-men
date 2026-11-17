import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';
import AboutValues from '../components/about/AboutValues';
import about1 from '../assets/about/about-1.jpg';
import about2 from '../assets/about/about-2.jpg';

export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen pt-11 sm:pt-14 lg:pt-18 pb-14 sm:pb-20 select-none">
      <Container size="default" className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        {/* Hero Header (Without OUR HERITAGE & MISSION text) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 pt-2"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold text-[#18221F] tracking-tight leading-snug">
            Where Ethnic Heritage Meets Modern Grace
          </h1>
          <p className="text-xs sm:text-sm text-[#6F756F] leading-relaxed mt-2.5">
            Curating authentic handcrafted Indian fabrics, timeless bridal collections, and luxury festive ensembles designed for modern celebrations.
          </p>
        </motion.div>

        {/* Section 1: Our Story (Left Image about-1, Right Story Text) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[3/3.8] sm:aspect-[4/4.2] rounded-lg overflow-hidden bg-[#F5EBDD] border border-[#E9D8C4]/80 shadow-sm group">
              <img src={about1} alt="Inam Cloth Workshop & Masterpieces" className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[#18221F] text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md shadow-xs">
                Handcrafted Artistry
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-center space-y-4"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#CAB27E]">THE INAM PROMISE</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-[#18221F] tracking-tight leading-snug">
              Authentic Needlework Crafted for Life&apos;s Milestones
            </h2>
            <p className="text-xs sm:text-sm text-[#18221F]/80 leading-relaxed">
              At INAM CLOTH, clothing is more than just fabric—it is an authentic reflection of identity, grace, and celebratory joy. Founded with deep respect for traditional textile artistry, we connect generations of handloom weavers with modern women who cherish elegance.
            </p>
            <p className="text-xs sm:text-sm text-[#6F756F] leading-relaxed">
              From rich georgette to gossamer organza and hand-dyed dupattas, every collection is selected with uncompromising standards of fabric purity and stitching durability.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#18221F]">
                <CheckCircle2 className="w-4 h-4 text-[#6fa993] shrink-0" />
                <span>100% Authentic Fabric Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#18221F]">
                <CheckCircle2 className="w-4 h-4 text-[#6fa993] shrink-0" />
                <span>Direct Artisan Partnerships</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 2: Values & Animated Counting Stats Strip */}
        <AboutValues />

        {/* Section 3: Who We Are & Mission (Left Text, Right Image about-2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mt-16 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-center space-y-4 order-2 lg:order-1"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#CAB27E]">OUR MISSION</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-[#18221F] tracking-tight leading-snug">
              Empowering Women With Timeless, Affordable Luxury
            </h2>
            <p className="text-xs sm:text-sm text-[#18221F]/80 leading-relaxed">
              We believe every woman deserves to look and feel regal without exorbitant designer markups. Whether you are dressing for a festive wedding, intimate family gathering, or festive celebrations, our curations offer effortlessly poised silhouettes.
            </p>
            <p className="text-xs sm:text-sm text-[#6F756F] leading-relaxed">
              We make luxury online ethnic shopping dependable and joyful with transparent order tracking, pre-dispatch video verification, and dedicated WhatsApp support.
            </p>
            <div className="pt-2">
              <Link
                to="/shop-by-category"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6fa993] hover:bg-[#568977] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:scale-104 cursor-pointer"
              >
                <span>EXPLORE COLLECTIONS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative order-1 lg:order-2"
          >
            <div className="relative aspect-[3/3.8] sm:aspect-[4/4.2] rounded-lg overflow-hidden bg-[#F5EBDD] border border-[#E9D8C4]/80 shadow-sm group">
              <img src={about2} alt="Inam Cloth Hand-inspected Collections" className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[#18221F] text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md shadow-xs">
                Exquisite Craftsmanship
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
