import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import Breadcrumbs from '../common/Breadcrumbs';
import { selectCollectionSections, selectCollectionBanners } from '../../store/slices/navigationSlice';
import { resolveCollectionBanner } from '../../utils/bannerHelpers';

export default function MegaMenuCollection({ isOpen, onClose, onMouseEnter, onMouseLeave }) {
  const collectionSections = useSelector(selectCollectionSections);
  const collectionBanners = useSelector(selectCollectionBanners);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 right-0 w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] md:h-[calc(100vh-4.5rem)] bg-white shadow-2xl z-10 overflow-y-auto overscroll-contain no-scrollbar select-none pointer-events-auto"
    >
      <Container size="wide" className="pt-11 sm:pt-14 lg:pt-18 pb-12 sm:pb-16">
        <Breadcrumbs items={[{ label: 'Shop By Category' }]} />

        <div className="mt-3 mb-6 sm:mb-8 text-center max-w-2xl mx-auto">
          <h2 className="font-sans text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#111111]">
            Shop By Category
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#6F756F] mt-1 leading-relaxed">
            Explore our curated luxury categories across fabrics, festive wear, and everyday grace.
          </p>
        </div>

        <div className="space-y-10 sm:space-y-14">
          {(collectionSections || []).map((section) => (
            <div key={section.title} className="space-y-4">
              <div className="flex items-center gap-3 pb-2.5 border-b border-black/10">
                <h3 className="font-sans text-base sm:text-lg font-bold uppercase tracking-wider text-[#111111]">
                  {section.title}
                </h3>
                <span className="font-sans text-xs text-[#6F756F] font-medium">
                  ({section.cards.length} Collections)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {section.cards.map((card) => {
                  const banner = resolveCollectionBanner(collectionBanners, {
                    title: card.name,
                    slug: card.collectionHandle || card.id,
                    collectionGid: card.collectionGid,
                    collectionHandle: card.collectionHandle,
                  });
                  const cardImg = banner?.desktopBanner || card.image;

                  return (
                    <NavLink
                      key={card.id}
                      to={card.path}
                      onClick={onClose}
                      className="group block text-left transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="aspect-[16/7.5] rounded-xl overflow-hidden bg-[#F5EBDD] border border-gray-100 shadow-xs group-hover:shadow-md transition-all">
                        <img
                          src={cardImg}
                          alt={card.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-2.5 px-0.5">
                        <span className="font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider text-[#111111] group-hover:text-[#6fa993] transition-colors leading-tight line-clamp-1">
                          {card.name}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6F756F] group-hover:text-[#6fa993] group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
}
