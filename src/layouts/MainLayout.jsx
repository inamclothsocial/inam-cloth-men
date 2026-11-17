import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import MobileBottomNav from '../components/layout/MobileBottomNav';
import MobileMenu from '../components/layout/MobileMenu';
import SearchModal from '../components/layout/SearchModal';
import CartDrawer from '../components/layout/CartDrawer';
import FloatingCompareTab from '../components/common/FloatingCompareTab';
import CompareModal from '../components/common/CompareModal';
import ToastNotification from '../components/common/ToastNotification';
import WishlistModal from '../components/common/WishlistModal';
import Footer from '../components/layout/Footer';
import ScrollProgressLogo from '../components/common/ScrollProgressLogo';
import { useScrollHeader } from '../hooks/useScrollHeader';
import { fetchNavigationData } from '../store/slices/navigationSlice';

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
        <Outlet />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Floating Right-Side Compare Tab (Vertically Centered) */}
      <FloatingCompareTab />

      {/* Global Compare Modal Popup */}
      <CompareModal />

      {/* Floating Mobile Bottom Navigation Bar on Scroll */}
      <MobileBottomNav isVisible={showBottomNav} />

      {/* Floating Desktop Bottom-Right Scroll Progress Logo (Laptop Only) */}
      <ScrollProgressLogo />

      {/* Interactive Global Modals & Drawers */}
      <MobileMenu />
      <SearchModal />
      <CartDrawer />
      <WishlistModal />
      <ToastNotification />
    </div>
  );
}
