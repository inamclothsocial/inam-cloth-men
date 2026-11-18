import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';

const NewArrivals = lazy(() => import('../pages/NewArrivals'));
const Collections = lazy(() => import('../pages/Collections'));
const CollectionDetail = lazy(() => import('../pages/CollectionDetail'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const ShopNow = lazy(() => import('../pages/ShopNow'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const Contact = lazy(() => import('../pages/Contact'));
const WishlistPage = lazy(() => import('../pages/WishlistPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const ExchangeReturnPolicy = lazy(() => import('../pages/ExchangeReturnPolicy'));
const ShippingPolicy = lazy(() => import('../pages/ShippingPolicy'));
const TermsConditions = lazy(() => import('../pages/TermsConditions'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="new-arrivals" element={<NewArrivals />} />
        <Route path="shop-by-category" element={<Collections />} />
        <Route path="categories" element={<Collections />} />
        <Route path="collections" element={<Collections />} />
        <Route path="collections/:slug" element={<CollectionDetail />} />
        <Route path="collections/:collectionSlug/:productSlug" element={<ProductDetail />} />
        <Route path="collections/:categorySlug/:subCategorySlug/:productSlug" element={<ProductDetail />} />
        <Route path="collections/:categorySlug/:groupSlug/:subCategorySlug/:productSlug" element={<ProductDetail />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="shop" element={<ShopNow />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="cart" element={<CartPage />} />

        {/* Policy Routes */}
        <Route path="exchange-return" element={<ExchangeReturnPolicy />} />
        <Route path="no-exchange-and-return" element={<ExchangeReturnPolicy />} />
        <Route path="return-policy" element={<ExchangeReturnPolicy />} />
        <Route path="pages/exchange-return" element={<ExchangeReturnPolicy />} />

        <Route path="shipping-policy" element={<ShippingPolicy />} />
        <Route path="shipping" element={<ShippingPolicy />} />
        <Route path="pages/shipping-policy" element={<ShippingPolicy />} />

        <Route path="terms-conditions" element={<TermsConditions />} />
        <Route path="terms" element={<TermsConditions />} />
        <Route path="terms-and-conditions" element={<TermsConditions />} />
        <Route path="pages/terms-and-conditions" element={<TermsConditions />} />

        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="pages/privacy-policy" element={<PrivacyPolicy />} />

        {/* Clean Category and Subcategory Hierarchy without /collections */}
        <Route path=":categorySlug" element={<CollectionDetail />} />
        <Route path=":categorySlug/:subCategorySlug" element={<CollectionDetail />} />
        <Route path=":categorySlug/:groupSlug/:subCategorySlug" element={<CollectionDetail />} />

        {/* Catch-all route redirecting to Home */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
