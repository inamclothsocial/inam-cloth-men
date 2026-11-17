import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart } from 'lucide-react';
import { selectQuickViewProduct, clearQuickViewProduct, showToast } from '../../store/slices/uiSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '../../store/slices/wishlistSlice';

export default function QuickViewModal() {
  const dispatch = useDispatch();
  const product = useSelector(selectQuickViewProduct);
  const inWishlist = useSelector(selectIsInWishlist(product?.id));

  useEffect(() => {
    if (product) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    dispatch(addToCart({ product, size: 'Standard', quantity: 1 }));
    dispatch(showToast(`Added "${product.name}" to Shopping Bag.`));
    dispatch(clearQuickViewProduct());
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => dispatch(clearQuickViewProduct())} className="fixed inset-0 bg-black/40 backdrop-blur-xs" />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-10 grid grid-cols-1 sm:grid-cols-2">
          <div className="aspect-[3/4] bg-[#F5EBDD] overflow-hidden relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.tag && (
              <span className="absolute top-3 left-3 bg-[#6fa993] text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded">
                {product.tag}
              </span>
            )}
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#6fa993] font-bold uppercase tracking-wider">{product.category}</span>
                <button onClick={() => dispatch(clearQuickViewProduct())} className="p-1 text-[#6F756F] hover:text-[#18221F] cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="font-sans text-base sm:text-lg font-semibold text-[#18221F] mt-2 leading-snug">{product.name}</h3>
              <div className="flex items-baseline gap-2.5 mt-3">
                <span className="text-lg font-bold text-[#6fa993]">Rs. {Number(product.price).toFixed(2)}</span>
                {product.originalPrice && <span className="text-xs text-[#6F756F] line-through">Rs. {Number(product.originalPrice).toFixed(2)}</span>}
              </div>
              <p className="text-xs text-[#6F756F] mt-3 leading-relaxed">
                Handcrafted designer ensemble with premium threadwork and elegant silhouette. Ideal for weddings, festivals, and festive evenings.
              </p>
            </div>
            <div className="space-y-3 mt-6 pt-4 border-t border-[#E9D8C4]">
              <button onClick={handleAdd} className="w-full py-3 bg-[#6fa993] hover:bg-[#568977] text-white text-xs font-semibold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow cursor-pointer">
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Add To Shopping Bag</span>
              </button>
              <button onClick={() => dispatch(toggleWishlist(product))} className="w-full py-2.5 bg-transparent border border-[#6fa993] text-[#18221F] text-xs font-medium uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-[#6fa993]/10 transition-colors cursor-pointer">
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#E53E3E] text-[#E53E3E]' : ''}`} />
                <span>{inWishlist ? 'In Wishlist' : 'Add To Wishlist'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
