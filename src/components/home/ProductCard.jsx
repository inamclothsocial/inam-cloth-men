import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Eye, Heart, ArrowLeftRight, ShoppingBag } from 'lucide-react';
import { toggleWishlist, selectIsInWishlist } from '../../store/slices/wishlistSlice';
import { toggleCompare, selectIsInCompare, selectCompareCount } from '../../store/slices/compareSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { showToast } from '../../store/slices/uiSlice';
import { getProductUrl } from '../../data/collectionsData';

export default function ProductCard({
  product,
  isActiveTouched,
  onTouchCard,
  className = '',
  collectionSlug = '',
  collectionTitle = '',
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inWishlist = useSelector(selectIsInWishlist(product.id));
  const inCompare = useSelector(selectIsInCompare(product.id));
  const compareCount = useSelector(selectCompareCount);
  const [isHoveredRight, setIsHoveredRight] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const images = [
    product.image || 'https://inamcloth.com/cdn/shop/files/inlays-minlah-collection.png?v=1732879262&width=540',
    product.hoverImage || 'https://inamcloth.com/cdn/shop/files/349.jpg?v=1732737819&width=540',
  ];

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 50;

  const handleOpenDetails = (e) => {
    if (e) e.stopPropagation();
    const activeSlug = collectionSlug || product.collectionSlug;
    const activeName = collectionTitle || product.collectionName;
    navigate(getProductUrl(product), {
      state: { collectionName: activeName, collectionSlug: activeSlug },
    });
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null || !e.touches || !e.touches[0]) return;
    const diffX = e.touches[0].clientX - touchStartX;
    if (diffX < -15) setIsHoveredRight(true);
    else if (diffX > 15) setIsHoveredRight(false);
  };

  return (
    <div
      onClick={handleOpenDetails}
      className={`shrink-0 snap-start bg-transparent border-0 select-none group flex flex-col cursor-pointer ${className || 'w-[160px] sm:w-[220px] md:w-[250px]'}`}
    >
      <div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setIsHoveredRight(e.clientX - rect.left > rect.width * 0.38);
        }}
        onMouseLeave={() => setIsHoveredRight(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setTouchStartX(null)}
        className="relative aspect-[2/3] w-full rounded-none overflow-hidden bg-[#F5EBDD]"
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

        <span className="absolute top-2.5 left-2.5 bg-[#E53E3E] text-white text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-xs z-10 pointer-events-none">
          {discount}% OFF
        </span>

        <div className={`absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-20 transition-all duration-300 ${isActiveTouched ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'}`}>
          <button onClick={handleOpenDetails} className="w-8 h-8 rounded-full bg-white text-[#18221F] hover:bg-[#6fa993] hover:text-white border border-[#CAB27E]/40 shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer" aria-label="View Details"><Eye className="w-4 h-4 stroke-[1.75]" /></button>
          <button onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist(product)); }} className={`w-8 h-8 rounded-full border shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer ${inWishlist ? 'bg-[#6fa993] text-white border-[#6fa993]' : 'bg-white border-[#CAB27E]/40 text-[#18221F] hover:bg-[#6fa993] hover:text-white'}`} aria-label="Wishlist"><Heart className={`w-4 h-4 stroke-[1.75] ${inWishlist ? 'fill-white' : ''}`} /></button>
          <button onClick={(e) => { e.stopPropagation(); if (inCompare || compareCount < 4) dispatch(toggleCompare(product)); else dispatch(showToast('Maximum 4 products can be compared.')); }} className={`w-8 h-8 rounded-full border shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer ${inCompare ? 'bg-[#6fa993] text-white border-[#6fa993]' : 'bg-white border-[#CAB27E]/40 text-[#18221F] hover:bg-[#6fa993] hover:text-white'}`} aria-label="Compare"><ArrowLeftRight className="w-4 h-4 stroke-[1.75]" /></button>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); dispatch(addToCart({ product, size: 'Standard', quantity: 1 })); dispatch(showToast('Added to Cart!')); }}
          className="absolute bottom-2.5 right-2.5 w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-white text-[#18221F] hover:bg-[#6fa993] hover:text-white border border-[#CAB27E]/45 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 cursor-pointer"
          aria-label="Add to Cart"
        >
          <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
        </button>
      </div>

      <div className="pt-2 sm:pt-2.5 px-0.5 sm:px-0 flex flex-col flex-1 justify-between">
        <div>
          <p className="text-[9.5px] text-[#CAB27E] font-semibold uppercase tracking-wider">{product.category || 'SUIT'}</p>
          <h3 className="text-xs sm:text-[12.5px] font-medium text-[#18221F] mt-0.5 line-clamp-1 group-hover:text-[#6fa993] transition-colors leading-snug">{product.name}</h3>
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs sm:text-[13px] font-semibold text-[#18221F]">Rs. {product.price.toFixed(2)}</span>
            {product.originalPrice && <span className="text-[10px] text-[#6F756F] line-through">Rs. {product.originalPrice.toFixed(2)}</span>}
          </div>
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 4).map((c, i) => (
                <span key={i} title={typeof c === 'string' ? c : (c?.label || c?.name || '')} style={{ backgroundColor: typeof c === 'string' ? c : (c?.hex || '#18181B') }} className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-2xs shrink-0" />
              ))}
              {product.colors.length > 4 && <span className="text-[9px] text-[#6F756F] font-semibold">+{product.colors.length - 4}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
