import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Eye, Heart, ArrowLeftRight } from 'lucide-react';
import { toggleWishlist, selectIsInWishlist } from '../../store/slices/wishlistSlice';
import { toggleCompare, selectIsInCompare, selectCompareCount } from '../../store/slices/compareSlice';
import { showToast } from '../../store/slices/uiSlice';
import { getProductUrl } from '../../data/collectionsData';

export default function NewArrivalCard({ product, isActiveTouched, onTouchCard }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inWishlist = useSelector(selectIsInWishlist(product.id));
  const inCompare = useSelector(selectIsInCompare(product.id));
  const compareCount = useSelector(selectCompareCount);
  const [isHoveredRight, setIsHoveredRight] = useState(false);

  const images = [
    product.image || 'https://inamcloth.com/cdn/shop/files/inlays-minlah-collection.png?v=1732879262&width=540',
    product.hoverImage || 'https://inamcloth.com/cdn/shop/files/349.jpg?v=1732737819&width=540',
  ];

  const handleOpenDetails = (e) => {
    if (e) e.stopPropagation();
    navigate(getProductUrl(product));
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    if (inCompare) {
      dispatch(toggleCompare(product));
    } else if (compareCount >= 4) {
      dispatch(showToast('Maximum 4 products can be compared.'));
    } else {
      dispatch(toggleCompare(product));
    }
  };

  return (
    <div
      onClick={handleOpenDetails}
      className="w-[160px] sm:w-[220px] md:w-[250px] shrink-0 snap-start bg-transparent border-0 cursor-pointer select-none group flex flex-col"
    >
      <div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setIsHoveredRight(e.clientX - rect.left > rect.width * 0.38);
        }}
        onMouseLeave={() => setIsHoveredRight(false)}
        className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#F5EBDD]"
      >
        <motion.div
          animate={{ x: isHoveredRight ? '-50%' : '0%' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-[200%] h-full flex-row will-change-transform pointer-events-none"
        >
          {images.map((imgSrc, idx) => (
            <div key={idx} className="w-1/2 h-full shrink-0 relative overflow-hidden">
              <img src={imgSrc} alt={product.name} loading="lazy" className="w-full h-full object-cover object-top" />
            </div>
          ))}
        </motion.div>

        {product.tag && (
          <span className="absolute top-2 left-2 bg-[#E53E3E] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-xs z-10 pointer-events-none">
            {product.tag}
          </span>
        )}

        <div
          className={`absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-20 transition-all duration-300 ${
            isActiveTouched ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
          }`}
        >
          <button
            onClick={handleOpenDetails}
            className="w-8 h-8 rounded-full bg-white text-[#18221F] hover:bg-[#6fa993] hover:text-white border border-[#CAB27E]/40 shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none cursor-pointer"
            aria-label="View Details"
          >
            <Eye className="w-4 h-4 stroke-[1.75]" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist(product)); }}
            className={`w-8 h-8 rounded-full border shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none cursor-pointer ${
              inWishlist ? 'bg-[#6fa993] text-white border-[#6fa993]' : 'bg-white border-[#CAB27E]/40 text-[#18221F] hover:bg-[#6fa993] hover:text-white'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 stroke-[1.75] ${inWishlist ? 'fill-white' : ''}`} />
          </button>
          <button
            onClick={handleCompareClick}
            className={`w-8 h-8 rounded-full border shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none cursor-pointer ${
              inCompare ? 'bg-[#6fa993] text-white border-[#6fa993]' : 'bg-white border-[#CAB27E]/40 text-[#18221F] hover:bg-[#6fa993] hover:text-white'
            }`}
            aria-label="Compare"
          >
            <ArrowLeftRight className="w-4 h-4 stroke-[1.75]" />
          </button>
        </div>
      </div>

      <div className="pt-2.5 flex flex-col flex-1 justify-between">
        <div>
          <p className="text-[9.5px] text-[#CAB27E] font-semibold uppercase tracking-wider">
            {product.category || 'SUIT'}
          </p>
          <h3 className="text-xs sm:text-[12.5px] font-medium text-[#18221F] mt-0.5 line-clamp-1 group-hover:text-[#6fa993] transition-colors leading-snug">
            {product.name}
          </h3>
        </div>

        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs sm:text-[13px] font-semibold text-[#18221F]">
              Rs. {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-[#6F756F] line-through">
                Rs. {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.map((c, i) => (
                <span key={i} style={{ backgroundColor: c }} className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-2xs" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
