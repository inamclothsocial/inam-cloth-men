import React from 'react';
import { useDispatch } from 'react-redux';
import { Plus, Minus } from 'lucide-react';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';

export default function CartItemRow({ item }) {
  const dispatch = useDispatch();
  const price = Number(item.price) || 0;
  const qty = Number(item.quantity) || 1;

  return (
    <div className="flex gap-3.5 p-3 rounded-xl bg-white/85 backdrop-blur-md border border-[#E9D8C4]/90 shadow-2xs hover:shadow-xs transition-all select-none">
      {/* Crisp Fixed Size Thumbnail */}
      <img
        src={item.image || 'https://inamcloth.com/cdn/shop/files/141.jpg?v=1732737874&width=540'}
        alt={item.name}
        className="w-16 h-20 object-cover object-top rounded-lg bg-[#F5EBDD] shrink-0 border border-[#E9D8C4]"
      />

      <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="text-xs sm:text-[13px] font-semibold text-[#18221F] line-clamp-1">
              {item.name}
            </h4>
            {item.size && (
              <p className="text-[10px] text-gray-500 font-medium">Size: <span className="text-[#18221F] font-semibold">{item.size}</span></p>
            )}
            <p className="font-sans text-xs sm:text-sm font-bold text-[#426E5F] mt-0.5">
              Rs. {price.toFixed(2)}
            </p>
          </div>

          {/* Compare-Style 2-Line Animated Cross Remove Button */}
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="w-6 h-6 flex items-center justify-center transition-all duration-300 group/close focus:outline-none cursor-pointer shrink-0"
            aria-label="Remove item"
          >
            <div className="relative w-3.5 h-3.5 flex items-center justify-center">
              <span className="absolute w-3.5 h-[1.75px] bg-[#18221F] rotate-45 group-hover/close:rotate-0 group-hover/close:bg-[#E53E3E] transition-all duration-300 rounded-full" />
              <span className="absolute w-3.5 h-[1.75px] bg-[#18221F] -rotate-45 group-hover/close:rotate-0 group-hover/close:bg-[#E53E3E] transition-all duration-300 rounded-full" />
            </div>
          </button>
        </div>

        {/* Bottom: Luxury Pill Quantity Selector */}
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
          <div className="flex items-center bg-[#F5EBDD]/60 border border-[#6fa993]/40 rounded-full p-0.5 shadow-2xs">
            <button
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: qty - 1 }))}
              className="w-5.5 h-5.5 rounded-full flex items-center justify-center text-[#18221F] hover:bg-[#6fa993] hover:text-white transition-all cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3 stroke-[2.2]" />
            </button>
            <span className="px-2 text-[11px] sm:text-xs font-bold text-[#18221F] min-w-[22px] text-center">
              {qty}
            </span>
            <button
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: qty + 1 }))}
              className="w-5.5 h-5.5 rounded-full flex items-center justify-center text-[#18221F] hover:bg-[#6fa993] hover:text-white transition-all cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 stroke-[2.2]" />
            </button>
          </div>

          <span className="text-[11px] font-semibold text-[#18221F]">
            Total: <span className="text-[#426E5F] font-bold font-sans">Rs. {(price * qty).toFixed(2)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
