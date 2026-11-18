import React, { lazy, Suspense } from 'react';
import HeroSection from '../components/home/HeroSection';
import ServiceHighlights from '../components/home/ServiceHighlights';

const NewArrivalsSection = lazy(() => import('../components/home/NewArrivalsSection'));
const CollectionGridSection = lazy(() => import('../components/home/CollectionGridSection'));
const LatestCollectionSection = lazy(() => import('../components/home/LatestCollectionSection'));
const ProductShowcaseSection = lazy(() => import('../components/home/ProductShowcaseSection'));
const EditorialCollageSection = lazy(() => import('../components/home/EditorialCollageSection'));
const WholesaleBanner = lazy(() => import('../components/home/WholesaleBanner'));
const BrandShowcaseSection = lazy(() => import('../components/home/BrandShowcaseSection'));
const QuickViewModal = lazy(() => import('../components/home/QuickViewModal'));

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Large Fashion Hero Carousel (Eager - Above fold) */}
      <HeroSection />

      {/* 2. Premium 4-Item Service Highlights Strip (Eager - Above fold) */}
      <ServiceHighlights />

      {/* Below-the-fold sections lazy loaded */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        {/* 3. New Arrivals Horizontal Scroll Section */}
        <NewArrivalsSection />

        {/* 4. Curated Gallery: Shop By Collection */}
        <CollectionGridSection />

        {/* 5. Latest Collection Horizontal Scroll Section (Above Best Seller) */}
        <LatestCollectionSection />

        {/* 6. Trending Drops: Best Seller Products */}
        <ProductShowcaseSection />

        {/* 7. 5-Image Luxury Editorial Collection Collage */}
        <EditorialCollageSection />

        {/* 8. Bulk & Wholesale Promotional Callout */}
        <WholesaleBanner />

        {/* 9. Partner Brands Showcase (Infinite Logo Slider directly above Footer) */}
        <BrandShowcaseSection />

        {/* Quick View Modal */}
        <QuickViewModal />
      </Suspense>
    </div>
  );
}
