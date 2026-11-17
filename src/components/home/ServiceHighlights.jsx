import React from 'react';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import { SERVICE_HIGHLIGHTS } from '../../data/serviceHighlights';
import ServiceItem from './ServiceItem';
import MobileServiceFab from './MobileServiceFab';

export default function ServiceHighlights() {
  return (
    <>
      {/* Desktop / Laptop: Full inline 4-column Service Highlights Strip with Staggered Motion */}
      <section
        aria-label="Service Guarantees"
        className="hidden lg:block bg-white border-b border-gray-100 py-3.5 select-none"
      >
        <Container size="wide">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-4 gap-6"
          >
            {SERVICE_HIGHLIGHTS.map((item) => (
              <ServiceItem key={item.id} item={item} />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Mobile / Tablet: Floating Bottom-Right Circular FAB and Expanding Radial Menu */}
      <MobileServiceFab />
    </>
  );
}
