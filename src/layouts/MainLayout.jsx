import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import MobileBottomNav from '../components/layout/MobileBottomNav';
import FloatingCompareTab from '../components/common/FloatingCompareTab';
import ToastNotification from '../components/common/ToastNotification';
import Footer from '../components/layout/Footer';
import ScrollProgressLogo from '../components/common/ScrollProgressLogo';
import { useScrollHeader } from '../hooks/useScrollHeader';
import { fetchNavigationData } from '../store/slices/navigationSlice';

const MobileMenu = lazy(() => import('../components/layout/MobileMenu'));
const SearchModal = lazy(() => import('../components/layout/SearchModal'));
const CartDrawer = lazy(() => import('../components/layout/CartDrawer'));
const WishlistModal = lazy(() => import('../components/common/WishlistModal'));
const CompareModal = lazy(() => import('../components/common/CompareModal'));

export default function MainLayout() {
  const dispatch = useDispatch();
  const { showNavbar, showBottomNav, isScrolled } = useScrollHeader();

  useEffect(() => {
    dispatch(fetchNavigationData());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111]">
      {/* Primary Sticky Navbar synchronized with layout */}
      <Navbar showNavbarProp={showNavbar} isScrolledProp={isScrolled} />

      {/* Main Content Area */}
      <main className="flex-grow">
        <React.Suspense fallback={
          <div className="flex items-center justify-center min-h-[50vh] text-[#6fa993]">
            <div className="w-8 h-8 border-2 border-[#6fa993] border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <Outlet />
        </React.Suspense>
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Floating Right-Side Compare Tab (Vertically Centered) */}
      <FloatingCompareTab />

      {/* Floating Mobile Bottom Navigation Bar on Scroll */}
      <MobileBottomNav isVisible={showBottomNav} />

      {/* Floating Desktop Bottom-Right Scroll Progress Logo (Laptop Only) */}
      <ScrollProgressLogo />

      {/* Toast Notification */}
      <ToastNotification />

      {/* Interactive Global Modals & Drawers (Lazy Loaded) */}
      <Suspense fallback={null}>
        <CompareModal />
        <MobileMenu />
        <SearchModal />
        <CartDrawer />
        <WishlistModal />
      </Suspense>
    </div>
  );
}
