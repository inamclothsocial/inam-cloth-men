import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import Container from '../components/common/Container';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { selectWishlistItems, removeFromWishlist } from '../store/slices/wishlistSlice';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectWishlistItems);

  return (
    <div className="pt-11 sm:pt-14 lg:pt-18 pb-14 sm:pb-20 bg-white min-h-[65vh] select-none">
      <Container size="default" className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <Breadcrumbs items={[{ label: 'My Wishlist' }]} />

        <div className="mb-6">
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#18221F]">
            My Wishlist
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white/70 rounded-2xl border border-[#E9D8C4] p-8 max-w-md mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-[#6fa993]/15 text-[#6fa993] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 stroke-[1.2]" />
            </div>
            <h3 className="font-sans text-lg font-bold text-[#18221F]">Your Wishlist is Empty</h3>
            <p className="text-xs text-gray-500 mt-1.5 max-w-xs mx-auto">
              Explore our luxury festive and bridal collections to save your favorites.
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
          <div className="space-y-3 max-w-4xl mx-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3 sm:p-4 rounded-xl bg-white/80 border border-transparent hover:border-[#6fa993]/60 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* Compare-Style 2-Line Animated Cross Remove Button */}
                  <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="w-6 h-6 flex items-center justify-center transition-all duration-300 group/close focus:outline-none cursor-pointer shrink-0"
                    aria-label="Remove item"
                  >
                    <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                      <span className="absolute w-3.5 h-[1.75px] bg-[#18221F] rotate-45 group-hover/close:rotate-0 group-hover/close:bg-[#E53E3E] transition-all duration-300 rounded-full" />
                      <span className="absolute w-3.5 h-[1.75px] bg-[#18221F] -rotate-45 group-hover/close:rotate-0 group-hover/close:bg-[#E53E3E] transition-all duration-300 rounded-full" />
                    </div>
                  </button>

                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <img
                      src={item.image || 'https://inamcloth.com/cdn/shop/files/141.jpg?v=1732737874&width=540'}
                      alt={item.name}
                      className="w-14 h-18 sm:w-16 sm:h-20 object-cover object-top rounded-lg bg-[#F5EBDD] border-0"
                    />
                  </Link>

                  <div className="min-w-0 pr-2">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-xs sm:text-sm font-semibold text-[#18221F] hover:text-[#426E5F] transition-colors line-clamp-2 block leading-snug"
                    >
                      {item.name}
                    </Link>
                    <p className="text-[10px] sm:text-[11px] text-[#426E5F] font-semibold mt-1">
                      In Stock
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs sm:text-sm font-bold font-sans text-[#18221F]">
                    Rs. {Number(item.price || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
