import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, Trash2, ArrowRight, Tag, X, ShieldCheck } from 'lucide-react';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    couponCode,
    applyCoupon,
    removeCoupon,
    couponError,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTax,
    getTotal,
    navigateTo,
  } = useContext(CartContext);

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const applied = applyCoupon(couponInput);
    if (applied) {
      setCouponInput('');
    }
  };

  const handleCheckoutProceed = () => {
    // Check if user is logged in
    const user = localStorage.getItem('apna_khao_user');
    if (user) {
      navigateTo('checkout');
    } else {
      // Save redirect intent in session storage
      sessionStorage.setItem('auth_redirect', 'checkout');
      navigateTo('login');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="bg-gray-100 text-gray-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-darkbrown">Your Cart is Empty</h2>
        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
          Looks like you haven't added any authentic Odia delicacies to your cart yet. Let's explore our traditional sweets and pithas!
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-terracotta hover:bg-terracotta-dark text-white font-bold text-xs tracking-wider uppercase px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:scale-[1.02]"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-darkbrown mb-8 relative pb-2 inline-block">
        Your Shopping Cart
        <span className="absolute bottom-0 left-0 w-12 h-1 bg-terracotta rounded-full"></span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart items list - Left Side */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.uniqueKey}
              className="bg-white border border-gold/10 p-4 rounded-2xl shadow-sm hover:shadow-premium transition-all duration-200 flex flex-col sm:flex-row items-center gap-4"
            >
              {/* Product Thumbnail */}
              <div 
                onClick={() => navigateTo('details', { id: item.id })}
                className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gold/5 cursor-pointer bg-cream-light"
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* Title & Package details */}
              <div className="flex-1 text-center sm:text-left space-y-1">
                <h3 
                  onClick={() => navigateTo('details', { id: item.id })}
                  className="font-serif text-base font-bold text-darkbrown hover:text-terracotta transition-colors duration-200 cursor-pointer"
                >
                  {item.name}
                </h3>
                <span className="text-[10px] bg-cream border border-gold/15 text-darkbrown font-bold px-2 py-0.5 rounded-full uppercase">
                  Size: {item.selectedWeight}
                </span>
                <span className="text-gray-400 text-xs block font-medium">Category: {item.category}</span>
              </div>

              {/* Quantity buttons */}
              <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/50">
                <button
                  onClick={() => updateQuantity(item.uniqueKey, item.quantity - 1)}
                  className="px-2.5 py-1 text-gray-500 hover:text-darkbrown font-bold text-sm"
                >
                  -
                </button>
                <span className="px-3 text-xs font-semibold text-darkbrown text-center min-w-[20px]">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.uniqueKey, item.quantity + 1)}
                  className="px-2.5 py-1 text-gray-500 hover:text-darkbrown font-bold text-sm"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-center sm:text-right">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Subtotal</span>
                <span className="text-sm font-bold text-darkbrown">₹{item.price * item.quantity}</span>
              </div>

              {/* Delete button */}
              <button
                onClick={() => removeFromCart(item.uniqueKey)}
                className="text-gray-400 hover:text-rose-500 p-2 transition-colors shrink-0"
                title="Remove Item"
              >
                <Trash2 className="w-4.5 h-4.5" />
              </button>
            </div>
          ))}

          {/* Delivery Note */}
          <div className="bg-cream border border-gold/15 p-4 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-darkbrown uppercase tracking-wider">Saffron-Express Fresh Sourcing</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                To guarantee maximum freshness, sweets are packed in air-tight container wraps and flown from Bhubaneswar Hub directly. Delivery is made via express air-shipping within 2 to 3 days to Metro cities.
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary Checkout Card - Right Side */}
        <div className="space-y-6">
          
          {/* Summary Box */}
          <div className="bg-white border border-gold/10 p-6 rounded-2xl shadow-premium space-y-6">
            <h3 className="font-serif text-lg font-bold text-darkbrown pb-3 border-b border-gray-100">Order Summary</h3>

            {/* Calculations list */}
            <div className="space-y-3.5 text-xs text-gray-500 font-semibold font-sans">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-darkbrown">₹{getSubtotal()}</span>
              </div>
              
              {/* Coupon discounts */}
              {couponCode && (
                <div className="flex justify-between text-emerald-600">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    Coupon ({couponCode})
                  </span>
                  <span>-₹{getDiscountAmount()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-darkbrown">
                  {getShippingFee() === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `₹${getShippingFee()}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="text-darkbrown">₹{getTax()}</span>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between text-sm text-darkbrown font-extrabold">
                <span>Total Amount</span>
                <span className="text-lg text-terracotta font-extrabold">₹{getTotal()}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleCheckoutProceed}
              className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-bold text-xs tracking-wider uppercase py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Coupon Input Box */}
          <div className="bg-white border border-gold/10 p-6 rounded-2xl shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-darkbrown uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-terracotta" />
              Apply Coupon Code
            </h4>
            
            {couponCode ? (
              <div className="bg-emerald-50 border border-emerald-150 p-3 rounded-xl flex items-center justify-between text-emerald-800 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  <span>Code <strong>{couponCode}</strong> Applied!</span>
                </div>
                <button 
                  onClick={removeCoupon}
                  className="text-emerald-700 hover:text-emerald-950 p-1"
                  title="Remove Coupon"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code (e.g. ODISHA10)"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value);
                  }}
                  className="flex-1 bg-cream-light border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-terracotta text-darkbrown font-bold placeholder:text-gray-400 placeholder:text-xs"
                />
                <button
                  type="submit"
                  disabled={!couponInput}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                    couponInput
                      ? 'bg-darkbrown hover:bg-darkbrown-dark text-cream'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Apply
                </button>
              </form>
            )}

            {/* Coupon Error */}
            {couponError && (
              <p className="text-rose-600 text-[11px] font-bold mt-1.5">{couponError}</p>
            )}

            {/* Helpful tip */}
            <div className="text-[10px] text-gray-400 font-semibold leading-relaxed">
              💡 Tip: Try code <strong className="text-saffron-dark">ODISHA10</strong> for 10% off store-wide, or <strong className="text-saffron-dark">WELCOME50</strong> for a flat ₹50 off.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;
