import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';

export default function CartItemCard({ item, onCloseModal }) {
  const dispatch = useDispatch();
  const price = Number(item.price) || 0;
  const originalPrice = Number(item.originalPrice) || Math.round(price * 1.35);
  const qty = Number(item.quantity) || 1;

  return (
    <div className="py-3 sm:py-3.5 border-b border-gray-100 last:border-0 select-none">
      {/* Top: Compact Thumbnail & Details */}
      <div className="flex gap-3 sm:gap-3.5 items-start">
        <Link
          to={`/product/${item.id || item.productId}`}
          onClick={onCloseModal}
          className="shrink-0"
        >
          <img
            src={item.image || 'https://inamcloth.com/cdn/shop/files/141.jpg?v=1732737874&width=540'}
            alt={item.name}
            className="w-14 h-18 sm:w-16 sm:h-20 object-cover object-top rounded-lg bg-[#F5EBDD] border-0 hover:scale-102 transition-transform"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <Link
            to={`/product/${item.id || item.productId}`}
            onClick={onCloseModal}
            className="font-sans text-xs sm:text-sm font-bold text-[#18221F] hover:text-[#426E5F] transition-colors line-clamp-1 block"
          >
            {item.name}
          </Link>

          <p className="text-[10.5px] text-[#6F756F] mt-0.5 line-clamp-1">
            {item.fabric || item.category || 'Luxury Embroidered Festive Edit'}
          </p>

          <p className="text-[10px] text-gray-500 mt-0.5">
            Size: <span className="font-semibold text-[#18221F]">{item.size || 'M'}</span>
            <span className="mx-1 text-gray-300">/</span>
            Color: <span className="font-semibold text-[#18221F]">{item.color || 'Standard'}</span>
          </p>
        </div>
      </div>

      {/* Bottom: Price on Left, Quantity Selector & Delete Button on Right */}
      <div className="flex items-center justify-between mt-2 pt-1">
        {/* Left: Price & Strikethrough */}
        <div className="flex items-baseline gap-1.5 pl-0.5">
          <span className="font-sans text-xs sm:text-sm font-bold text-[#18221F]">
            Rs. {price.toFixed(2)}
          </span>
          {originalPrice > price && (
            <span className="text-[10.5px] text-gray-400 line-through">
              Rs. {originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Right: Quantity Selector + Delete Icon */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-300/80 rounded-md bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: qty - 1 }))}
              className="w-6 h-6 flex items-center justify-center text-[#18221F] hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none"
              aria-label="Decrease quantity"
            >
              <Minus className="w-2.5 h-2.5 stroke-[2]" />
            </button>
            <span className="w-7 text-center text-xs font-bold text-[#18221F]">
              {qty}
            </span>
            <button
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: qty + 1 }))}
              className="w-6 h-6 flex items-center justify-center text-[#18221F] hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none"
              aria-label="Increase quantity"
            >
              <Plus className="w-2.5 h-2.5 stroke-[2]" />
            </button>
          </div>

          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer focus:outline-none"
            aria-label="Remove item"
            title="Remove item"
          >
            <Trash2 className="w-3.5 h-3.5 stroke-[1.8]" />
          </button>
        </div>
      </div>
    </div>
  );
}
