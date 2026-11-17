import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServiceHighlights from '../components/home/ServiceHighlights';
import NewArrivalsSection from '../components/home/NewArrivalsSection';
import CollectionGridSection from '../components/home/CollectionGridSection';
import ProductShowcaseSection from '../components/home/ProductShowcaseSection';
import EditorialCollageSection from '../components/home/EditorialCollageSection';
import WholesaleBanner from '../components/home/WholesaleBanner';
import BrandShowcaseSection from '../components/home/BrandShowcaseSection';
import QuickViewModal from '../components/home/QuickViewModal';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Large Fashion Hero Carousel */}
      <HeroSection />

      {/* 2. Premium 4-Item Service Highlights Strip */}
      <ServiceHighlights />

      {/* 3. New Arrivals Horizontal Scroll Section */}
      <NewArrivalsSection />

      {/* 4. Curated Gallery: Shop By Collection */}
      <CollectionGridSection />

      {/* 5. Trending Drops: Best Seller Products */}
      <ProductShowcaseSection />

      {/* 6. 5-Image Luxury Editorial Collection Collage */}
      <EditorialCollageSection />

      {/* 7. Bulk & Wholesale Promotional Callout */}
      <WholesaleBanner />

      {/* 8. Partner Brands Showcase (Infinite Logo Slider directly above Footer) */}
      <BrandShowcaseSection />

      {/* Quick View Modal */}
      <QuickViewModal />
    </div>
  );
}
