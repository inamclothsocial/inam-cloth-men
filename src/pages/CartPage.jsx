import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { selectCartItems, selectCartTotal } from '../store/slices/cartSlice';
import CartItemCard from '../components/layout/CartItemCard';
import CartSummaryCard from '../components/layout/CartSummaryCard';

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <div className="pt-11 sm:pt-14 lg:pt-18 pb-14 sm:pb-20 bg-white min-h-[65vh] select-none">
      <Container size="default" className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <Breadcrumbs items={[{ label: 'Cart' }]} />

        <div className="mb-6">
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#18221F]">Cart</h1>
          <div className="flex items-center gap-2 text-xs text-[#6F756F] mt-1 font-medium">
            <span className="font-bold text-[#18221F]">1. Cart</span>
            <span className="w-4 h-[1px] bg-gray-300" />
            <span>2. Checkout</span>
            <span className="w-4 h-[1px] bg-gray-300" />
            <span>3. Payment</span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white/70 rounded-2xl border border-[#E9D8C4] p-8 max-w-md mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-[#6fa993]/15 text-[#6fa993] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
            </div>
            <h3 className="font-sans text-lg font-bold text-[#18221F]">Your Shopping Bag is Empty</h3>
            <p className="text-xs text-gray-500 mt-1.5">
              Explore our luxury festive collections to add your favorites.
            </p>
            <Link
              to="/shop-by-category"
              className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#6fa993] hover:bg-[#568977] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-7 bg-white/80 rounded-2xl border-0 p-4 sm:p-6 shadow-xs">
              {items.map((item, idx) => (
                <CartItemCard
                  key={item.id || `cart-page-${idx}`}
                  item={item}
                  onCloseModal={() => {}}
                />
              ))}
            </div>

            <div className="lg:col-span-5">
              <CartSummaryCard total={total} />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
