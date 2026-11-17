import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ShoppingBag, Share2, HelpCircle, Plus, Minus, Loader2, ShieldCheck } from 'lucide-react';
import { addToCart } from '../../store/slices/cartSlice';
import { showToast } from '../../store/slices/uiSlice';
import { initiateGoKwikCheckout } from '../../services/gokwikService';

export default function ProductInfo({ product }) {
  const dispatch = useDispatch();
  const availableSizes = product?.sizes || [];
  const availableColors = product?.colors || [];

  const [selectedColor, setSelectedColor] = useState(availableColors[0] || null);
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [loadingBuyNow, setLoadingBuyNow] = useState(false);

  const matchedVariant = useMemo(() => {
    if (!product?.variants?.length) return null;
    return product.variants.find((v) => {
      const vTitle = (v.title || '').toLowerCase();
      const hasColor = !selectedColor || vTitle.includes(selectedColor.name?.toLowerCase()) || vTitle.includes(selectedColor.label?.toLowerCase());
      const hasSize = !selectedSize || vTitle.includes(selectedSize.toLowerCase());
      return hasColor && hasSize;
    }) || product.variants[0];
  }, [product, selectedColor, selectedSize]);

  const handleAddToCart = () => {
    const sizeLabel = [selectedSize, selectedColor?.name].filter(Boolean).join(' - ') || 'Standard';
    dispatch(addToCart({ product, size: sizeLabel, quantity, variantId: matchedVariant?.id }));
    dispatch(showToast(`Added ${quantity} item(s) to shopping bag!`));
  };

  const handleBuyItNow = async () => {
    const sizeLabel = [selectedSize, selectedColor?.name].filter(Boolean).join(' - ') || 'Standard';
    const variantId = matchedVariant?.id || product.variantId || null;

    dispatch(addToCart({ product, size: sizeLabel, quantity, variantId }));

    const singleItem = {
      id: `${product.id}-${sizeLabel}`,
      productId: product.id,
      variantId,
      name: product.name || 'Designer Festive Suit',
      price: product.price,
      image: product.image || product.images?.[0],
      size: sizeLabel,
      quantity,
    };

    try {
      setLoadingBuyNow(true);
      await initiateGoKwikCheckout([singleItem], (msg) => dispatch(showToast(msg)));
    } catch (err) {
      dispatch(showToast(err.message || 'Checkout failed. Please try again.'));
    } finally {
      setLoadingBuyNow(false);
    }
  };

  const handleShare = (network) => {
    const rawUrl = window.location.href;
    if (network === 'fb') return window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(rawUrl)}`, '_blank');
    if (network === 'x') return window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(rawUrl)}`, '_blank');
    if (navigator.share) {
      navigator.share({ title: product?.name || 'INAM CLOTH', url: rawUrl }).catch(() => {});
      return;
    }
    try { if (navigator.clipboard?.writeText) navigator.clipboard.writeText(rawUrl); } catch (_) {}
    dispatch(showToast('Product link copied!'));
  };

  return (
    <div className="flex flex-col space-y-5 select-none text-[#18221F] max-w-lg">
      <div>
        <h1 className="hidden lg:block text-2xl sm:text-3xl font-medium tracking-tight text-[#18221F] leading-snug">{product.name}</h1>
        <p className="text-xl sm:text-2xl font-bold text-[#426E5F] mt-1 lg:mt-3">Rs. {Number(product.price || 0).toLocaleString()}</p>
      </div>

      {availableColors.length > 0 && (
        <div>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2.5">
            Color: <span className="font-semibold text-[#18221F]">{selectedColor ? (selectedColor.label || selectedColor.name) : 'Select Color'}</span>
          </span>
          <div className="flex flex-wrap items-start gap-4">
            {availableColors.map((c) => {
              const isSelected = selectedColor?.name === c.name;
              return (
                <button key={c.name} type="button" onClick={() => setSelectedColor(c)} className="flex flex-col items-center gap-1.5 cursor-pointer group outline-none">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full p-0.5 transition-all flex items-center justify-center ${isSelected ? 'ring-2 ring-[#426E5F] ring-offset-2 scale-105' : 'border border-gray-300 hover:scale-105'}`}>
                    <span style={{ backgroundColor: c.hex || '#18181B' }} className="w-full h-full rounded-full border border-black/15 shadow-2xs block" />
                  </div>
                  <span className={`text-[11px] text-center leading-tight transition-colors ${isSelected ? 'font-bold text-[#18221F]' : 'font-medium text-[#6F756F] group-hover:text-[#18221F]'}`}>
                    {c.label || c.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {availableSizes.length > 0 && (
        <div>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Size: <span className="font-normal text-gray-700">{selectedSize}</span></span>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((sz) => (
              <button key={sz} onClick={() => setSelectedSize(sz)} className={`px-4 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${selectedSize === sz ? 'border-[#6fa993] bg-[#6fa993]/15 text-[#426E5F]' : 'border-gray-200 bg-white text-gray-600'}`}>{sz}</button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2.5 pt-1">
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Quantity</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-[#6fa993]/40 rounded-lg bg-white px-2 py-1">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-1 hover:text-[#426E5F] cursor-pointer"><Minus className="w-3 h-3" /></button>
            <span className="w-8 text-center font-bold text-xs">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="p-1 hover:text-[#426E5F] cursor-pointer"><Plus className="w-3 h-3" /></button>
          </div>
          <button onClick={handleAddToCart} className="flex-1 py-3 px-6 rounded-lg bg-[#6fa993] hover:bg-[#568977] text-white text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-xs">
            <ShoppingBag className="w-3.5 h-3.5" /><span>ADD TO CART</span>
          </button>
        </div>

        <button onClick={handleBuyItNow} disabled={loadingBuyNow} className="w-full py-3 rounded-lg bg-white hover:bg-[#6fa993]/10 text-[#426E5F] border border-[#6fa993] text-xs font-bold tracking-widest uppercase transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-2">
          {loadingBuyNow ? <Loader2 className="w-4 h-4 animate-spin text-[#426E5F]" /> : <ShieldCheck className="w-4 h-4 text-[#426E5F]" />}
          <span>{loadingBuyNow ? 'PROCESSING...' : 'BUY NOW'}</span>
        </button>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#E9D8C4]/60 text-xs text-[#6F756F]">
        <div className="flex items-center gap-3">
          <span className="font-medium">Share:</span>
          <button onClick={() => handleShare('fb')} className="hover:text-black font-bold cursor-pointer">f</button>
          <button onClick={() => handleShare('x')} className="hover:text-black font-bold cursor-pointer">𝕏</button>
          <button onClick={() => handleShare('native')} className="hover:text-black cursor-pointer"><Share2 className="w-3.5 h-3.5" /></button>
        </div>
        <a href="https://wa.me/923000000000" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-black font-medium cursor-pointer">
          <HelpCircle className="w-3.5 h-3.5" /><span>Need help?</span>
        </a>
      </div>
    </div>
  );
}
