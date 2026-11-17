import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { removeFromCompare } from '../../store/slices/compareSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { showToast } from '../../store/slices/uiSlice';

export default function CompareItemCard({ product }) {
  const dispatch = useDispatch();
  const [isHoveredRight, setIsHoveredRight] = useState(false);

  const images = [
    product.image || 'https://inamcloth.com/cdn/shop/files/inlays-minlah-collection.png?v=1732879262&width=540',
    product.hoverImage || product.image || 'https://inamcloth.com/cdn/shop/files/349.jpg?v=1732737819&width=540',
  ];

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product, size: 'M', quantity: 1 }));
    dispatch(showToast(`Added "${product.name}" to cart.`));
  };

  return (
    <div className="w-[165px] sm:w-[210px] lg:w-[245px] xl:w-[260px] shrink-0 bg-transparent border-0 select-none group flex flex-col snap-start">
      {/* Sleek Reduced-Height Image Container on Laptop */}
      <div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setIsHoveredRight(e.clientX - rect.left > rect.width * 0.38);
        }}
        onMouseLeave={() => setIsHoveredRight(false)}
        className="relative aspect-[3/4] sm:aspect-[3/4.1] lg:aspect-[3/3.8] w-full rounded sm:rounded-md overflow-hidden bg-[#F5EBDD]"
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
          <span className="absolute top-2.5 left-2.5 bg-[#E53E3E] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-xs z-10 pointer-events-none">
            {product.tag}
          </span>
        )}

        {/* Circle-Free 2-Line Animated Remove (X) Button Top-Right */}
        <button
          onClick={() => dispatch(removeFromCompare(product.id))}
          className="absolute top-2.5 right-2.5 z-20 w-6 h-6 flex items-center justify-center transition-all duration-300 group/close focus:outline-none cursor-pointer"
          aria-label={`Remove ${product.name} from compare`}
        >
          <div className="relative w-3.5 h-3.5 flex items-center justify-center drop-shadow-xs">
            <span className="absolute w-3.5 h-[1.75px] bg-[#18221F] rotate-45 group-hover/close:rotate-0 group-hover/close:bg-[#E53E3E] transition-all duration-300 rounded-full" />
            <span className="absolute w-3.5 h-[1.75px] bg-[#18221F] -rotate-45 group-hover/close:rotate-0 group-hover/close:bg-[#E53E3E] transition-all duration-300 rounded-full" />
          </div>
        </button>
      </div>

      {/* Details with Category, Name, Price, Swatches & Black Circular Cart Icon */}
      <div className="pt-2.5 flex flex-col flex-1 justify-between">
        <div>
          <p className="text-[9.5px] text-[#CAB27E] font-semibold uppercase tracking-wider">
            {product.category || 'SUIT'}
          </p>
          <h4 className="text-xs sm:text-[13px] font-medium text-[#18221F] mt-0.5 line-clamp-1 group-hover:text-[#6fa993] transition-colors leading-snug">
            {product.name}
          </h4>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs sm:text-[13px] font-semibold text-[#18221F]">
              Rs. {product.price?.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-[#6F756F] line-through">
                Rs. {product.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Color Dots */}
            {product.colors && product.colors.length > 0 && (
              <div className="hidden sm:flex items-center gap-1 mr-1">
                {product.colors.map((c, i) => (
                  <span key={i} style={{ backgroundColor: c }} className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-2xs" />
                ))}
              </div>
            )}

            {/* Black Circular Add To Cart Icon */}
            <button
              onClick={handleAddToCart}
              className="w-8 h-8 rounded-full bg-[#18221F] hover:bg-[#6fa993] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm focus:outline-none"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4 text-white stroke-[2]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
