import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ChevronLeft, ChevronRight, ArrowLeftRight, Share2 } from 'lucide-react';
import { toggleWishlist, selectIsInWishlist } from '../../store/slices/wishlistSlice';
import { toggleCompare, selectIsInCompare, selectCompareCount } from '../../store/slices/compareSlice';
import { showToast } from '../../store/slices/uiSlice';

export default function ProductGallery({ product, discount, onOpenLightbox }) {
  const dispatch = useDispatch();
  const inWishlist = useSelector(selectIsInWishlist(product.id));
  const inCompare = useSelector(selectIsInCompare(product.id));
  const compareCount = useSelector(selectCompareCount);

  const images = product?.images?.length
    ? product.images
    : [product?.image].filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(0);
  const handlePrev = () => setActiveIndex((p) => (p === 0 ? images.length - 1 : p - 1));
  const handleNext = () => setActiveIndex((p) => (p === images.length - 1 ? 0 : p + 1));

  const copyFallback = (url) => {
    try {
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url);
      else {
        const t = document.createElement('textarea');
        t.value = url; t.style.position = 'fixed'; t.style.opacity = '0';
        document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t);
      }
    } catch (_) {}
    dispatch(showToast('Product link copied!'));
  };

  const handleShare = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const url = window.location.href;
    const shareData = { title: product?.name || 'INAM CLOTH', url };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => {
        if (err.name !== 'AbortError') copyFallback(url);
      });
      return;
    }
    copyFallback(url);
  };

  const handleCompare = () => {
    if (inCompare || compareCount < 4) {
      dispatch(toggleCompare(product));
      dispatch(showToast(inCompare ? 'Removed from Compare.' : 'Added to Compare.'));
    } else dispatch(showToast('Maximum 4 items can be compared.'));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 items-start select-none">
      {/* Laptop Only: Vertical Left Thumbnails (Hidden on mobile) */}
      <div className="hidden sm:flex flex-col gap-2 w-14 sm:w-18 shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-full aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#F5EBDD] ${
              activeIndex === idx ? 'border-[#6fa993] shadow-xs scale-102 ring-1 ring-[#6fa993]/40' : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover object-top" />
          </button>
        ))}
      </div>

      {/* Main Image + Action Buttons + Mobile Bottom Thumbnails Container */}
      <div className="flex-1 w-full flex flex-col gap-3">
        <div className="flex flex-row gap-2.5 sm:gap-3.5 items-start w-full">
          <div
            onClick={() => onOpenLightbox && onOpenLightbox(activeIndex)}
            className="relative flex-1 aspect-[3/4.1] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-[#F5EBDD] border border-[#6fa993]/25 shadow-xs cursor-zoom-in group"
          >
            <img src={images[activeIndex]} alt={product.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102" />
            <span className="absolute top-3 left-3 bg-[#E53E3E] text-white text-[9.5px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-10 pointer-events-none">
              {discount}% OFF
            </span>
          </div>

          <div className="flex flex-col justify-between self-stretch shrink-0 py-1">
            <div className="flex flex-col gap-2">
              <button onClick={handleShare} className="icon-fill w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F0EEEA] text-[#18221F] shadow-2xs flex items-center justify-center cursor-pointer" aria-label="Share">
                <Share2 className="w-4 h-4 stroke-[1.8]" />
              </button>
              <button onClick={() => dispatch(toggleWishlist(product))} className={`icon-fill w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-2xs flex items-center justify-center cursor-pointer ${inWishlist ? 'bg-red-50 text-[#E53E3E]' : 'bg-[#F0EEEA] text-[#18221F]'}`} aria-label="Wishlist">
                <Heart className={`w-4 h-4 stroke-[1.8] ${inWishlist ? 'fill-[#E53E3E]' : ''}`} />
              </button>
              <button onClick={handleCompare} className={`icon-fill w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-2xs flex items-center justify-center cursor-pointer ${inCompare ? 'bg-[#6fa993] text-white' : 'bg-[#F0EEEA] text-[#18221F]'}`} aria-label="Compare">
                <ArrowLeftRight className="w-3.5 h-3.5 stroke-[1.8]" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <button onClick={handlePrev} className="icon-enter w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F0EEEA] text-[#18221F] shadow-2xs flex items-center justify-center cursor-pointer" aria-label="Previous image">
                <ChevronLeft className="w-4 h-4 stroke-[2]" />
              </button>
              <button onClick={handleNext} className="icon-enter w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F0EEEA] text-[#18221F] shadow-2xs flex items-center justify-center cursor-pointer" aria-label="Next image">
                <ChevronRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Only: Horizontal Thumbnails beneath the big image (Image 3) */}
        <div className="flex sm:hidden flex-row gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-14 aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#F5EBDD] shrink-0 ${
                activeIndex === idx ? 'border-[#6fa993] shadow-xs ring-1 ring-[#6fa993]/40' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
