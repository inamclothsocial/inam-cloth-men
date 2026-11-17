import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Tag, Loader2, ShieldCheck, ShoppingBag } from 'lucide-react';
import { showToast } from '../../store/slices/uiSlice';
import { selectCartItems, closeCartDrawer } from '../../store/slices/cartSlice';
import { initiateGoKwikCheckout } from '../../services/gokwikService';

export default function CartSummaryCard({ total = 0, isDrawer = false, onProceedCheckout }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === 'INAM10') {
      const disc = total * 0.1;
      setDiscount(disc);
      dispatch(showToast('Coupon INAM10 applied! 10% discount added.'));
    } else {
      dispatch(showToast('Invalid coupon code. Try "INAM10" for 10% off.'));
    }
  };

  const handleCheckout = async () => {
    if (!cartItems.length) return dispatch(showToast('Shopping bag is empty.'));

    if (isDrawer) {
      dispatch(closeCartDrawer());
      navigate('/cart');
      return;
    }

    if (onProceedCheckout) return onProceedCheckout();

    try {
      setLoadingCheckout(true);
      await initiateGoKwikCheckout(cartItems, (status) => {
        dispatch(showToast(status));
      });
    } catch (err) {
      dispatch(showToast(err.message || 'Checkout failed. Please try again.'));
    } finally {
      setLoadingCheckout(false);
    }
  };

  const finalTotal = Math.max(0, total - discount);

  return (
    <div className="space-y-4 sm:space-y-5 select-none">
      <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border-0 shadow-xs space-y-3">
        <h4 className="font-sans text-base sm:text-lg font-bold text-[#18221F]">Order Summary</h4>
        <div className="space-y-2 text-xs pt-1">
          <div className="flex items-center justify-between text-[#6F756F]">
            <span>Sub Total</span>
            <span className="font-semibold text-[#18221F]">Rs. {Number(total).toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex items-center justify-between text-[#6fa993]">
              <span>Discount (10%)</span>
              <span className="font-semibold">- Rs. {discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-[#6F756F]">
            <span>Estimated Tax</span>
            <span className="font-semibold text-[#18221F]">Rs. 0.00</span>
          </div>
          <div className="flex items-center justify-between text-[#6F756F]">
            <span>Shipping</span>
            <span className="font-bold text-[#6fa993]">Free</span>
          </div>
          <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-sm text-[#18221F]">Total</span>
            <span className="font-sans text-base sm:text-lg font-bold text-[#18221F]">Rs. {finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          id="checkoutButton"
          onClick={handleCheckout}
          disabled={loadingCheckout || !cartItems.length}
          className="w-full mt-3 py-3.5 rounded-xl bg-[#6fa993] hover:bg-[#568977] disabled:opacity-60 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          {loadingCheckout ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Securing Checkout...</span>
            </>
          ) : isDrawer ? (
            <>
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>CHECKOUT / BUY NOW</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-gray-500 pt-0.5">
          100% Safe & Secure Checkout • Instant UPI, Cards & COD
        </p>
      </div>

      {!isDrawer && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white/80 border-0 shadow-xs mb-6 sm:mb-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#18221F] mb-2">
            <Tag className="w-3.5 h-3.5 text-[#6fa993]" />
            <span>Have a Coupon?</span>
          </div>
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon Code (e.g. INAM10)"
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#6fa993]"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg bg-[#6fa993] hover:bg-[#568977] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Apply
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
