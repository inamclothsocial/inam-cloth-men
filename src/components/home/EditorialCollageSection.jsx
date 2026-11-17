import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import { slugify } from '../../data/collectionsData';

import img1Laptop from '../../assets/images/image1/image1_leptop.png';
import img1Mobile from '../../assets/images/image1/image1_mobile.png';
import img2Laptop from '../../assets/images/image2/image2_leptop.png';
import img2Mobile from '../../assets/images/image2/image2_mobile.png';
import img3Laptop from '../../assets/images/image3/image3_leptop.png';
import img3Mobile from '../../assets/images/image3/image3_mobile.png';
import img4Laptop from '../../assets/images/image4/image4_leptop.png';
import img4Mobile from '../../assets/images/image4/image4_mobile.png';
import img5Laptop from '../../assets/images/image5/image5_leptop.png';
import img5Mobile from '../../assets/images/image5/image5_mobile.png';

const items = [
  { id: 1, name: 'Amarige Collection', laptop: img1Laptop, mobile: img1Mobile },
  { id: 2, name: 'Dilaab Collection', laptop: img2Laptop, mobile: img2Mobile },
  { id: 3, name: 'Goncha Collection', laptop: img3Laptop, mobile: img3Mobile },
  { id: 4, name: 'Mahiye Organza Fancy Semi Stitch', laptop: img4Laptop, mobile: img4Mobile },
  { id: 5, name: "Noor's Sajavat Luxury Shiffon Collection", laptop: img5Laptop, mobile: img5Mobile },
];

export default function EditorialCollageSection() {
  const [c1, c2, c3, c4, c5] = items;

  return (
    <section className="py-5 sm:py-10 bg-white overflow-hidden" aria-label="Featured Editorial Collections">
      <Container size="wide">
        {/* Reduced space/gap between cards */}
        <div className="grid grid-cols-2 lg:grid-cols-10 gap-2 sm:gap-2.5 items-stretch">
          {/* Card 1: Enters from LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-2 lg:col-span-6"
          >
            <Link to={`/${slugify(c1.name)}`} className="relative aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-auto lg:h-[580px] xl:h-[640px] rounded sm:rounded-md overflow-hidden group cursor-pointer shadow-xs border-0 bg-[#F5EBDD] flex flex-col justify-end p-4 sm:p-7 select-none block">
              <picture className="absolute inset-0 w-full h-full block">
                <source media="(min-width: 1024px)" srcSet={c1.laptop} />
                <img src={c1.mobile} alt={c1.name} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700 ease-out will-change-transform" />
              </picture>
              <div className="relative z-10"><h3 className="text-base sm:text-lg lg:text-xl font-semibold tracking-wider text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">{c1.name}</h3></div>
            </Link>
          </motion.div>

          {/* Card 2: Enters from RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-2 lg:col-span-4"
          >
            <Link to={`/${slugify(c2.name)}`} className="relative aspect-[4/4.8] sm:aspect-[4/4.5] lg:aspect-auto lg:h-[580px] xl:h-[640px] rounded sm:rounded-md overflow-hidden group cursor-pointer shadow-xs border-0 bg-[#F5EBDD] flex flex-col justify-end p-4 sm:p-7 select-none block">
              <picture className="absolute inset-0 w-full h-full block">
                <source media="(min-width: 1024px)" srcSet={c2.laptop} />
                <img src={c2.mobile} alt={c2.name} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700 ease-out will-change-transform" />
              </picture>
              <div className="relative z-10"><h3 className="text-base sm:text-lg lg:text-xl font-semibold tracking-wider text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">{c2.name}</h3></div>
            </Link>
          </motion.div>

          {/* Card 3: Enters from LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-2 lg:col-span-3"
          >
            <Link to={`/${slugify(c3.name)}`} className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-auto lg:h-[600px] xl:h-[660px] rounded sm:rounded-md overflow-hidden group cursor-pointer shadow-xs border-0 bg-[#F5EBDD] flex flex-col justify-end p-4 sm:p-7 select-none block">
              <picture className="absolute inset-0 w-full h-full block">
                <source media="(min-width: 1024px)" srcSet={c3.laptop} />
                <img src={c3.mobile} alt={c3.name} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700 ease-out will-change-transform" />
              </picture>
              <div className="relative z-10"><h3 className="text-base sm:text-lg lg:text-xl font-semibold tracking-wider text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">{c3.name}</h3></div>
            </Link>
          </motion.div>

          {/* Card 4: Enters from BOTTOM */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-1 lg:col-span-4"
          >
            <Link to={`/${slugify(c4.name)}`} className="relative aspect-[3/4.4] sm:aspect-[3/4] lg:aspect-auto lg:h-[600px] xl:h-[660px] rounded sm:rounded-md overflow-hidden group cursor-pointer shadow-xs border-0 bg-[#F5EBDD] flex flex-col justify-end p-3 sm:p-7 select-none block">
              <picture className="absolute inset-0 w-full h-full block">
                <source media="(min-width: 1024px)" srcSet={c4.laptop} />
                <img src={c4.mobile} alt={c4.name} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700 ease-out will-change-transform" />
              </picture>
              <div className="relative z-10"><h3 className="text-xs sm:text-lg lg:text-xl font-semibold tracking-wider text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] line-clamp-1">{c4.name}</h3></div>
            </Link>
          </motion.div>

          {/* Card 5: Enters from RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-1 lg:col-span-3"
          >
            <Link to={`/${slugify(c5.name)}`} className="relative aspect-[3/4.4] sm:aspect-[3/4] lg:aspect-auto lg:h-[600px] xl:h-[660px] rounded sm:rounded-md overflow-hidden group cursor-pointer shadow-xs border-0 bg-[#F5EBDD] flex flex-col justify-end p-3 sm:p-7 select-none block">
              <picture className="absolute inset-0 w-full h-full block">
                <source media="(min-width: 1024px)" srcSet={c5.laptop} />
                <img src={c5.mobile} alt={c5.name} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700 ease-out will-change-transform" />
              </picture>
              <div className="relative z-10"><h3 className="text-xs sm:text-lg lg:text-xl font-semibold tracking-wider text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] line-clamp-1">{c5.name}</h3></div>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
